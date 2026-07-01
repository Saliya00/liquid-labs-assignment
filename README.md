## Overview

REST API built with Node.js and Express following a layered Route, Controller and Service architecture. The application retrieves post data from the JSONPlaceholder public API and caches it in a local SQLite database. Once data has been cached, subsequent requests are served directly from the local database, reducing unnecessary external API requests.

---

## Features

- Retrieve all posts
- Retrieve a single post by ID
- Create a new post in the local database
- Delete a post from the local database
- UPdate a post from local databse
- Cache external API responses in SQLite
- Layered architecture (Routes → Controllers → Services → Database)
- API endpoints secured with a simple API_KEY based authentication middleware

---

## Dependencies Used

- Express - Web application framework used to build the REST API
- SQLite3 - Used as the local database
- dotenv - Used to load environment variables from `.env` file into `process.env` at runtime
- Nodemon (For development) - Used to auto restart application when source code changes

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

The application implements a simple caching mechanism using a seperate `cache_status` table

1. On the first request to GET /posts, data is fetched from the external API and stored locally in the database while updating `is_cache_available` field to `true`
2. Once cached, all subsequent `GET /posts` requests are served directly from the SQLite database.
3. `GET /posts/:id` first checks the local database for the requested post. If it is not found, the post is retrieved from the external API, cached locally and then returned.
4. Uses `INSERT OR IGNORE` in SQL query to avoid inserting duplicate records into the local database.

---

## External API

This project uses the following public API:

https://jsonplaceholder.typicode.com/posts

No API key is required.
