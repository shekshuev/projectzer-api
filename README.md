## Description

API for the system for conducting sociological surveys.

## Installation

```bash
$ npm install
```

## Environment variables

```
DATABASE_TYPE - 'postgres' or 'sqlite', default database is sqlite
DATABASE_NAME - name of database for postgres or filename for sqlite, default sqlite database file is 'database.db' in app folder
DATABASE_HOST - postgres host, doesn't required for sqlite
DATABASE_PORT - postgres port, doesn't required for sqlite
DATABASE_USERNAME - postgres username, doesn't required for sqlite
DATABASE_PASSWORD - postgres password, doesn't required for sqlite
JWT_SECRET - secret key for encrypting JWT tokens, default value is 'JWT_SECRET'
ADMIN_DEFAUlt_USERNAME - username for default admin account, default value is 'admin'
ADMIN_DEFAULT_PASSWORD - password for default admin account, default value is 'admin'
ADMIN_DEFAULT_FIRSTNAME - first name for default admin account, default value is empty
ADMIN_DEFAULT_LASTNAME - last name for default admin account, default value is empty
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
