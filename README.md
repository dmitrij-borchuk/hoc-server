# hoc-server

### Run server
```
yarn install
yarn run dev
```

### Build
```
yarn install
yarn run build
```

### Development env vars
Create file `.env` with such content:
```
EXAMPLE_VAR=value
JWT_SECRET=jwtSecretString
```

### Generating Your Secret Key
There are several options for generating secret keys. The easiest way is to run node's crypto hash in your terminal:
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

### GraphQL doc
`/graphiql?token={yourJwtToken}`
