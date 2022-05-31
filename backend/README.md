# Foxticket Backend

## Steps

- Copy `.env.example` as `.env` then replace the settings in the `.env` file.
- Use the following commands:
  - `npm install` - install the dependencies
  - `npm start` - start your app in dev mode
  - `npm test` - start your test
  - `npm lint` - start the linter
  - `npm build` - build the app
  - `npm run build-doc` - build *openapi.yaml* file

## Generate OpenAPI documentation

Use `npm run build-doc` command in backend directory to build the ***openapi.yaml*** file.

To extend the OpenAPI documentation in the openAPIDocumentation folder, you can find a good example [here](https://davidgarcia.dev/posts/how-to-split-open-api-spec-into-multiple-files/)