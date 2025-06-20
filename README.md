# Messenger Project

This project demonstrates a small messenger built with **Nest.js**, **GraphQL** and **RabbitMQ**. Messages are now persisted to a JSON file and protected by a very simple token based authentication. A lightweight React front-end is included in the `frontend/` directory. The file `backend/messages.json` is created automatically after the first message is sent.

## Features

- User profile creation *(placeholder)*
- List of users *(placeholder)*
- List and details of conversations *(placeholder)*
- Sending messages through RabbitMQ
- File based message persistence
- Token authentication
- Minimal React client

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
The worker and the API both read the RabbitMQ URL from the `RABBITMQ_URL` environment variable (see `.env.example`).

7. Open the front-end at `http://localhost:3000/index.html`.

The GraphQL playground is available at `http://localhost:3000/graphql`.

## Testing

Unit tests are located in `backend/test/` and `worker/test/` and can be executed with:

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
Authentication uses a static token defined by `API_TOKEN` in the `.env` file.
The front-end sends this token in the `Authorization` header when communicating with the GraphQL API.

This skeleton can be extended with real databases, authentication strategies or real-time subscriptions.
