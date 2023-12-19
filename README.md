# ainize-openai-assistants-service
A Wrapper Ainize Container for OpenAI Assistant API

## Prerequisite

Please use **YARN** instead of npm.

```bsh
$ yarn install
```

## ENVs
```
OPENAI_API_KEY=..
```

## How to run the server
### Run dev mode
```bsh
$ yarn dev
```

### Run on terminal
```bsh
$ yarn start
```

### Simply check the server status out on
```
http://localhost:3000/health
```

## Docker
### Build docker example
```bsh
$ docker build -t ainize-openai-assistants-service .
```

### Run docker example
```bsh
$ docker run -it -p 8080:3000 ainize-openai-assistants-service
```
