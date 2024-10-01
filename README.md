## Description

Test task. Contains the following containers:
 - postgres: containerized PostgreSQL db
 - nestjs-app: Backend

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e
```
## Before deployment

Make sure you have your `.env` file composed correctly. Example for local setup:

```
POSTGRES_HOST="localhost"
POSTGRES_PORT="5432"
POSTGRES_USERNAME="postgres"
POSTGRES_PASSWORD="postgrespassword"
POSTGRES_DATABASE="grants-apply"
POSTGRES_DATABASE_TEST="grants-apply-test"
PORT="4002"
```

## Deployment/containerization

```bash
docker-compose up --build
```