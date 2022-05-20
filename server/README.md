This folder represents fake [json-server](https://github.com/typicode/json-server), **for development purposes only**.

It **MAY NOT** match the real backend and **IS NOT** used in production env.

## Using database

Data generator is in `src/db` folder. Powered by [casual](https://github.com/boo1ean/casual).

Folder's default export must be an object matching to json-server rules of defining endpoints.
See [docs](https://github.com/typicode/json-server#getting-started)

### Special rules for defining routes

* `/api` prefix from request url will be removed
* slashes in db routes are not supported, so define you nested paths as `some_nested_path`; server will try to look for `some/nested/path` fragment in request url, and replace it with db variant.

This should be probably enough for testing purposes. 

Keep in mind, that when using db generator instead of static json db,  all changes submitted to server are only stored in server's memory, and thus won't persist across re-runs.
