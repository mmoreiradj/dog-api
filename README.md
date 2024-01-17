# CI-CD Advanced project

## Description

The goal of the CI-CD advanced project is to make create a CI-CD of the dog-api and make use of trivy, a container scanner to look for vulnerabilities.
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
