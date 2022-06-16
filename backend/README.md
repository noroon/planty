# Planty Backend

## Steps

- Copy `.env.example` as `.env` then replace the settings in the `.env` file.
- Use the following commands:
  - `yarn` - install the dependencies
  - `yarn start` - start your app in dev mode
  - `yarn test` - start your test
  - `yarn lint` - start the linter
  - `yarn build` - build the app
  - `yarn build-doc` - build *openapi.yaml* file

## Generate OpenAPI documentation

Use `yarn build-doc` command in backend directory to build the ***openapi.yaml*** file.

## Load data into the database

Use `yarn load-data` command in backend directory to load data into tha database.