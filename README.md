# Samehadaku-Graphql

This repo is a graphql server which is get the data from [samehadaku-rest-api](https://github.com/rizalord/samehadaku-rest-api) repo and made up using Deno.

## Minimum Requirement
* Deno version 1.0.0

## Usage

Start server with command:
```bash
deno run --allow-net app.ts
```
Then open [localhost://8000](localhost://8000)

## Endpoint

| Url        | Pagination Support | 
| ------------- |:-------------:| 
| /      |  Support |
| /blog | Support |
| /blog/read | No |
| /anime | No |
| /anime/eps | No |
| /search | Support |
| /season | No |
| /date-release | No |
| /list-anime | Support |
| /blog-category | Support |
| /tag | No |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
