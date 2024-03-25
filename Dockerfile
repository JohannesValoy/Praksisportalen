FROM oven/bun:debian AS base
#For healthcheck
RUN apt-get update && apt-get install -y wget && apt-get clean
COPY --from=node:18 /usr/local/bin/node /usr/local/bin/node
WORKDIR /app

FROM base AS dev
RUN apt-get install -y tar && apt-get clean
COPY package.json .
# Local Development server, does not matter if it is not secure
# trunk-ignore(checkov/CKV_SECRET_4)
RUN echo "DATABASE_URL=\"mysql://root:changeme@db:3306/praksislista\" \n FEIDE_CLIENT_ID=\"b88b132a-2f04-49ef-aa4c-ab906312284c\"\n  FEIDE_CLIENT_SECRET=\"53a00bbb-9ef7-409a-baf5-d68942c4b691\"\n NEXTAUTH_SECRET=\"helloworld\"" > .env
RUN bun install
COPY --chown=app:app . .
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=10 CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
CMD ["/bin/bash","-c", "bun --bun knex migrate:latest && bun --bun knex seed:run && bun next dev"]

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

# copy node_modules from temp directoryb
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
