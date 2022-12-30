## Description

API for the system for conducting sociological surveys.

## Installation

```bash
$ npm install
```

## Environment variables

```
DATABASE_NAME - name of postgres database
DATABASE_HOST - postgres host
DATABASE_PORT - postgres port
DATABASE_USERNAME - postgres username
DATABASE_PASSWORD - postgres password
JWT_SECRET - secret key for encrypting JWT tokens
JWT_EXPIRATION - jwt lifetime (example: 1h, 24h, 30m, etc)
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
