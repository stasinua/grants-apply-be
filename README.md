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

## Running containerized PostgreSQL db [Docker Compose V2(Latest)]

```bash
$ yarn container:postgres
```

## Running containerized PostgreSQL db [Docker Compose V1]

```bash
$ yarn container:postgres:composev1
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
## Deployment/containerization (Nestjs + Postgres) [Docker Compose V2(Latest)]

```bash
yarn container:app
```

## Deployment/containerization (Nestjs + Postgres) [Docker Compose V1]

```bash
yarn container:app:composev1
```

## Test [containerized] [Docker Compose V2(Latest)]

```bash
yarn container:test
```

## Test [containerized] [Docker Compose V1]

```bash
yarn container:test:composev1
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