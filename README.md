# Vehicle-platform

## Description

This project is about a self-hosting platform to keep track of your vehicles.

## Screenshots

WIP

## Pre-requisites

1. Something to host the application
2. A database (MySQL, MariaDB, PostgreSQL, etc.) supported by [Prisma](https://www.prisma.io/)

## Setup

Clone the repo:

```bash
git clone https://github.com/SpreeZ00/vehicle-platform.git 
```

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

Run the migrations:

```bash
# yarn
yarn prisma migrate dev

# npm
npm run prisma migrate dev

# pnpm
pnpm run prisma migrate dev
```

Build the application for production:

```bash
npm run build
```

Start the server locally or check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information:

```bash
npm run start
```

## Roadmap

- [ ] Demo Platform
- [ ] More statistics
- [ ] Add Screenshots

## Contributing

Contributions are welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)