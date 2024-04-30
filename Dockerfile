FROM imbios/bun-node:21-debian AS base
#For healthcheck
ENV NEXT_TELEMETRY_DISABLED 1
RUN apt-get update && apt-get --no-install-recommends install -y wget && apt-get --no-install-recommends install -y tar && apt-get clean
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=10 CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
WORKDIR /app
RUN adduser --home /app --no-create-home -u 1002 app
RUN chown -R app /app

COPY --chown=root:root --chmod=755 ./src /app/src
COPY --chown=root:root --chmod=755 ./public /app/public
COPY --chown=root:root --chmod=755 ./package.json /app/package.json
COPY --chown=root:root --chmod=755 ./next-env.d.ts /app
COPY --chown=root:root --chmod=755 ./tsconfig.json /app
COPY --chown=root:root --chmod=755 ./tailwind.config.ts /app/


FROM base AS dev

RUN bun install

USER app
EXPOSE 3000
CMD /bin/bash -c "bun --bun knex migrate:latest --knexfile src/knex/knexfile.ts && bun --bun knex seed:run --knexfile src/knex/knexfile.ts && bun next dev"

# Taken from https://bun.sh/guides/ecosystem/docker

# install dependencies into temp directory
# this will cache them and speed up future builds

# copy node_modules from temp directoryb
# then copy all (non-ignored) project files into the image
FROM base AS release
COPY --chown=root:root --chmod=755 ./bun.lockb /app/
RUN bun install --frozen-lockfile 

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun --target=node run build 

# run the app     
USER app
EXPOSE 3000
CMD /bin/bash -c "bun --bun knex migrate:latest --knexfile src/knex/knexfile.ts && bun --bun knex seed:run --knexfile src/knex/knexfile.ts && bun run start"

