# GItlab CI Demo

Note: This project is originally hosted on a private Gitlab, it's on github for the sake of sharing it.

## Description

The goal is to make create a CI pipeline for a NestJS api. It checks the code quality, if it builds and runs tests with jest. It also makes use of trivy, a container scanning tool to look for vulnerabilities.

It also uses [husky](https://www.npmjs.com/package/husky) to run the tests and linting before each commit.

We decided to setup our gitlab-runner in a kubernetes hosted on a Virtual machine.

Note : We commented parts of the *Dockerfile* to explicitly introduce vulnerabilities.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

CI-CD Advanced is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
