[![actions](https://github.com/wil92/learn-to-code/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/wil92/learn-to-code)
[![codecov](https://codecov.io/gh/wil92/learn-to-code/branch/master/graph/badge.svg?token=WMJCJVXZIB)](https://codecov.io/gh/wil92/learn-to-code)

# LearnToCode

Simple online judge make with nodejs.

## Install dependencies

```bash
npm install
```

## Start project (local)

### Preconditions

**Start redis and database**

The API and the eval microservice project, need redis to communicate between them. The easier way to do this is by 
starting a docker with redis or use the redis configuration in the *docker-compose.yml* file. Create a 
*docker-compose.local.yml* and copy the next code:

```yml
version: '3'

services:
  redis:
    image: redis:6-alpine
    restart: always
    ports:
      - '0.0.0.0:6379:6379'

  database:
    image: mongo:4.0.13
    restart: always
    ports:
      - '0.0.0.0:27017:27017'
```

after this execute next commands:

```bash
docker-compose -f docker-compose.local.yml up -d
```

**Environment variables**

Create the *.env* file in the root of the project:

```
DB_HOST=localhost
DB_PORT=27017
DB_NAME=learn_to_code_dev
REDIS_HOST=localhost
REDIS_PORT=6379
RESOURCES_PATH=./resources
```

### Start application

**Start API**
```bash
npm run start:api
```

**Start eval microservice**
```bash
npm run start:eval
```

**Start frontend**
```bash
npm start
```

## Run tests

```bash
npm test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

See file [CONTRIBUTION.md](./CONTRIBUTION.md)

## License
[MIT](https://choosealicense.com/licenses/mit/)
