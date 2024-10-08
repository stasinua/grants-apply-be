## Description

Test task. Contains the following containers:
 - postgres: containerized PostgreSQL db
 - nestjs-app: Backend

## Installation

```bash
$ yarn install
```

## Before starting the app

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

## Running containerized PostgreSQL db

```bash
$ yarn container:postgres
```

## Running the app [local/container PostgreSQL db should be running]

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Deployment/containerization (Nestjs + Postgres)

```bash
yarn container:app
```

## Test [containerized]

```bash
yarn container:test
```

## Test [local]

```bash
# unit tests
$ yarn test
```

NOTE: [local/container PostgreSQL db should be running]

```bash
# e2e tests
$ yarn test:e2e
```