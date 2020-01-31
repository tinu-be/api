# tinu.be - api
[![Codeship Status for itbruno/tinube-api](https://app.codeship.com/projects/d3b5e810-2470-0138-77f1-624fde232fc7/status?branch=master)](https://app.codeship.com/projects/383222)

This is a personal project based in nodeJS to url shortener named [tinu.be](https://tinu.be)

## Requirements
- Node ~10.16.
- Yarn or npm ~6.11

## Setup
By the first rename the file `.env-sample` to `.env` and fill with all necessary info:

```sh
# Environment variables
API_PORT=5000
CORS_ORIGIN=*
DATABASE_HOST=mongodb+srv://<user>:<pass>@<host>.mongodb.net/<database>?retryWrites=true&w=majority
BASE_URL=http://localhost:5000
CUSTOM_ROOT_PATH=../../client/build
```

## Build
We are using Yarn to install dependencies and build, so open the terminal and run:
```
$ yarn install
```
then to run dev env 
```
$ yarn dev
```