# Messenger Project

This repository contains a minimal skeleton for a messenger application built with **Nest.js**, **GraphQL** and **RabbitMQ**.

## Features

- User profile creation *(placeholder)*
- List of users *(placeholder)*
- List and details of conversations *(placeholder)*
- Sending messages through RabbitMQ

## Stack

- Node.js + Nest.js
- GraphQL API
- RabbitMQ for message queue
- Microservice worker listening to RabbitMQ
- Docker for local development

## Setup

1. Clone the repository

```bash
git clone <repo>
cd projet-web-messenger-m1
```

2. Install dependencies *(requires internet access)*

```bash
npm install --prefix backend
npm install --prefix worker
```

3. Copy environment variables

```bash
cp .env.example .env
```

4. Start RabbitMQ

```bash
docker-compose up -d
```

5. Run the API

```bash
npm run start:dev --prefix backend
```

6. Run the worker

```bash
npm run start:dev --prefix worker
```

The GraphQL playground is available at `http://localhost:3000/graphql`.

## Testing

- Unit and integration tests are not yet implemented.

### Example GraphQL queries

```graphql
mutation {
  sendMessage(content: "Hello world") {
    id
    content
  }
}
```

```graphql
query {
  messages {
    id
    content
  }
}
```

This skeleton is a starting point for the project. Extend it by adding authentication, persistence, real-time subscriptions and a frontend client.

