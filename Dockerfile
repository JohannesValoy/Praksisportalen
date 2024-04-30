FROM imbios/bun-node:21-debian AS base
#For healthcheck
ENV NEXT_TELEMETRY_DISABLED 1
RUN apt-get update && apt-get install -y wget && apt-get clean
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=10 CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
WORKDIR /app

FROM base AS dev
RUN apt-get install -y tar && apt-get clean
COPY package.json .
RUN bun install
COPY --chown=app:app . .
CMD /bin/bash -c "bun --bun knex migrate:latest --knexfile src/knex/knexfile.ts && bun --bun knex seed:run --knexfile src/knex/knexfile.ts && bun next dev"

# Taken from https://bun.sh/guides/ecosystem/docker

# install dependencies into temp directory
# this will cache them and speed up future builds

# copy node_modules from temp directoryb
# then copy all (non-ignored) project files into the image
FROM base AS release
COPY . .
RUN bun install --frozen-lockfile 

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun --target=node run build 

# run the app     
EXPOSE 3000
CMD /bin/bash -c "bun --bun knex migrate:latest --knexfile src/knex/knexfile.ts && bun --bun knex seed:run --knexfile src/knex/knexfile.ts && bun run start"

