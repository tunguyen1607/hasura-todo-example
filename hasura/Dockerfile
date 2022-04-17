FROM hasura/graphql-engine:v1.3.3.cli-migrations-v2

COPY ./app/config.yaml /config.yaml
COPY ./app/metadata /hasura-metadata
COPY ./app/migrations /hasura-migrations
COPY ./app/seeds /seeds
