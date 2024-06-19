Authentication REST API with NodeJS, Typescript, Typegoose & Zod

## Video tutorial

https://www.youtube.com/watch?v=qylGaki0JhY

## Install dev dependencies

npm i typescript ts-node-dev @types/express @types/config pino-pretty @types/nodemailer @types/lodash @types/jsonwebtoken -D

## Init TypeScript

npx tsc --init

## Install dependencies

npm i express mongoose @typegoose/typegoose config argon2 pino dayjs nanoid nodemailer lodash jsonwebtoken dotenv zod

## Create .env file

```
DBURI="your_database_uri"

ACCESS_TOKEN_PRIVATE_KEY="your_access_token_private_key"
ACCESS_TOKEN_PUBLIC_KEY="your_access_token_public_key"

REFRESH_TOKEN_PRIVATE_KEY="your_refresh_token_private_key"
REFRESH_TOKEN_PUBLIC_KEY="your_refresh_token_public_key"
```

### RSA Key

https://travistidwell.com/jsencrypt/demo/#google_vignette
