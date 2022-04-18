# Interview Exercise - Backend

The objective of this exercise is to implement the tasks described in the following section.

Please fork this project and submit your solution by sharing your forked repo (please keep the repo private.)

Include a `solution.md` file to document any assumptions and instructions for the reviewer. 

## Overview

- backend of a TODO list application
- has a `user` and `todo` table
  - a `todo` item belongs to a `user`
  - a `user` has zero to many `todo` items
- in addition, there is an `audit` table for tracking useful audit events in the backend
- [Hasura](https://hasura.io/) manages the tables and exposes CRUD operations via a GraphQL API 
- the application can be started by running `docker-compose up --build --force-recreate`

## Task

Hasura triggers events `todo_item_added` and `todo_item_updated` to a webhook whenever a `todo` record has been inserted 
and updated, respectively.

  - Implement a webhook that writes to the `audit` table describing who/what/when changed.
  - Webhook url in Hasura has been set to http://webhook:8989/handle-event
  - Complete the `webhooks/Dockerfile` and add run configurations to `docker-compose.yml` such that the webhooks server
    will be ready to handle events from Hasura upon starting the application via `docker-compose up`.

### Requirements

- webhooks server skeleton has been provided, please complete solution using the TypeScript language 
- provide unit and integration tests
- provide a working solution upon `docker-compose up`

### My Work
- Go to webhooks directory and change parameter for DB at .env, .env.dev, .env.product
- Go to hasura directory and change parameter for DB at docker-compose.yaml
- Run "npm run test" to check the code
- CD out to the main project
- sudo docker-compose build then sudo docker-compose up -d
### Note
- I change a bit about the permission of role user and add authen when call graphql
- I take the user id as token to do CRUD for the `todo` table
- Implement a webhook that writes to the `audit` table describing who/what/when changed at event controller.
