FROM oven/bun:1 as base
COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node

FROM base as dev
WORKDIR /app
CMD ["/bin/bash","-c", "bun install && bun prisma generate && bun dev"]

FROM dev as prismaBrowser
COPY prisma .
COPY package.json .
COPY bun.lockb .
RUN echo "DATABASE_URL=\"mysql://root:changeme@db:3306/praksislista\"" > .env
RUN bun install
CMD ["/bin/bash","-c", "bun prisma migrate dev && bun prisma studio --port 5555 --browser none"]

# Taken from https://bun.sh/guides/ecosystem/docker

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]
