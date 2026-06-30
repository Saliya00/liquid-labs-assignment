## Overview

REST API built with Node.js and Express following a layered Route, Controller and Service architecture. The application retrieves post data from the JSONPlaceholder public API and caches it in a local SQLite database. Once data has been cached, subsequent requests are served directly from the local database, reducing unnecessary external API requests.

---

## Features

- Retrieve all posts
- Retrieve a single post by ID
- Create a new post in the local database
- Delete a post from the local database
- Cache external API responses in SQLite
- Layered architecture (Routes → Controllers → Services → Database)

---

## Dependencies Used

- Express
- SQLite3
- Axios
- dotenv
- Nodemon (For development)

---

## Setup Environment Variables

Rename `.env.example` file in the project root to `.env` if default values to be used or else can be updated as required

```env
mv .env.example .env
```

---

## Installation

Clone the repository and go inside `liquid-labs-assignment` directory :

```bash
git clone https://github.com/Saliya00/liquid-labs-assignment.git
cd liquid-labs-assignment
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/posts`     | Retrieve all posts     |
| GET    | `/posts/:id` | Retrieve a single post |
| POST   | `/posts/`    | Create a new post      |
| DELETE | `/posts/:id` | Delete a post          |
| UPDATE | `/posts/:id` | Update a post          |

---

## Caching Strategy

The application implements a local database first caching strategy.

1. Check whether the requested data exists in the local SQLite database.
2. If found, return data from database.
3. If not, retrieve the data from the third party JSONPlaceholder API.
4. Insert retrieved data into database.
5. Return the data to the client.

---

## External API

This project uses the following public API:

https://jsonplaceholder.typicode.com/posts

No API key is required.
