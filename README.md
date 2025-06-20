# Messenger Project

This project demonstrates a small messenger built with **Nest.js**, **GraphQL** and **RabbitMQ**. Messages are now persisted to a JSON file and protected by a very simple token based authentication. A lightweight Vue.js front-end is included in the `frontend/` directory.

## Features

- User profile creation *(placeholder)*
- List of users *(placeholder)*
- List and details of conversations *(placeholder)*
- Sending messages through RabbitMQ
- File based message persistence
- Token authentication
- Minimal Vue.js client

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

7. Open the front-end at `http://localhost:3000/index.html`.

The GraphQL playground is available at `http://localhost:3000/graphql`.

## Testing

Unit tests are located in `backend/test/` and can be executed with:

```bash
npm test
```

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

This skeleton can be extended with real databases, authentication strategies or real-time subscriptions.
