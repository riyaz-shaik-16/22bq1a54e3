# Backend Service

This is the backend for the application, built with Node.js, Express, and Mongoose for interacting with a MongoDB database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Key Dependencies](#key-dependencies)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or later is recommended, as required by some dependencies)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (Make sure your MongoDB server is running)

## Installation

1.  Navigate to the backend directory from your project's root:
    ```bash
    cd backend
    ```

2.  Install the required npm packages:
    ```bash
    npm install
    ```

## Configuration

This project uses `dotenv` to manage environment variables.

1.  Create a file named `.env` in the `backend` directory.
2.  Add the necessary environment variables to your `.env` file. At a minimum, you will likely need a database connection string and a port.

    ```env
    MONGODB_URI=mongodb://localhost:27017/your_database_name
    PORT=8000
    ```

## Running the Application

To start the server in development mode with live-reloading (using `nodemon`), run the following command:

```bash
npm run dev
```

The server will start and listen on the port defined in your `.env` file (e.g., `http://localhost:8000`).

## Key Dependencies

- **express**: Web framework for Node.js.
- **mongoose**: Elegant MongoDB object modeling for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **axios**: Promise-based HTTP client for making requests.
- **nodemon**: (Dev dependency) Utility that monitors for changes in your source and automatically restarts your server.