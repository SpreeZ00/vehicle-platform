# Vehicle-platform

## Description

Vehicle-Platform is a self-hosted web application that allows users to record and manage their vehicles. Users can add and update vehicle information such as brand, model, color and mileage.
The application automatically calculates the distance traveled between two points in time. The application also has statistics that give users an overview of their vehicle usage. Users can view statistics such as the total mileage of all their vehicles, the average mileage per month, and the most frequently used vehicles.
Vehicle-Platform is a great way for users to track the usage of their vehicles and gain valuable insights into their vehicle usage.

## Screenshots

WIP

## Pre-requisites

1. Something to host the application
2. A database (MySQL, MariaDB, PostgreSQL, etc.) supported by [Prisma](https://www.prisma.io/)

## Setup

Clone the repo:

```bash
git clone https://github.com/SpreeZ00/vehicle-platform.git && cd vehicle-platform/
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

- [X] [Demo Platform](https://vehicle-platform.vercel.app)
- [ ] More statistics
- [ ] Add Screenshots

## Contributing

Contributions are welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)
