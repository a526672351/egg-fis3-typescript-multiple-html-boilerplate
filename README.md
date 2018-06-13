# egg-fis3-typescript-multiple-html-boilerplate

Based on Egg.js + Fis3+ TypeScript + Nunjucks multi page server rendering isomorphic engineering skeleton project

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

Assets should be compiled before shipping.
```bash
$ npm run web:prod
```
Start Egg with prod environment.
```bash
$ npm run tsc
$ npm start
```

### Features

- Build code inspection workflows with husky and lint-staged
- Develop / Deploy with Docker

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
- docker
- docker-compose

### Docker Compose

- docker-compose.yml
- Use `docker-compose up -d` to start
- Use `docker-compose down` to stop
- Use `docker-compose down -v` to remove volume/cache

## License

[MIT](LICENSE)
