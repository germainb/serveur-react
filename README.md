# Thread Application Backend

## Overview
This is the backend part of a Thread Application built using **Express.js**, **Node.js**, and **MongoDB**. It provides a robust API to handle user authentication, thread management, and interactions such as liking and disliking threads.

## Features
- **User Authentication:**
  - Sign up
  - Login
  - Logout
- **Thread Management (CRUD):**
  - Create threads
  - Read threads
  - Delete threads
- **Thread Interactions:**
  - Like a thread
  - Dislike a thread

## Tech Stack
- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for building APIs
- **MongoDB**: Database to store user and thread data
- **Mongoose**: MongoDB object modeling tool
- **JWT**: For user authentication and session management

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js**
- **MongoDB**

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-avance-project-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### API Endpoints

#### **Authentication**
| Method | Endpoint   | Description         |
|--------|------------|---------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login with existing credentials |
| POST   | `/api/auth/profile`   | Logout the user      |

#### **Threads**
| Method   | Endpoint          | Description                      |
|----------|-------------------|----------------------------------|
| GET      | `/api/threads`    | Fetch all threads               |
| GET      | `/api/threads/:id`| Fetch a single thread by ID      |
| POST     | `/api/threads`    | Create a new thread             |
| PUT      | `/api/threads/:id`| Update a thread                 |
| DELETE   | `/api/threads/:id`| Delete a thread                 |

#### **Thread Interactions**
| Method   | Endpoint                 | Description                 |
|----------|--------------------------|-----------------------------|
| POST     | `/api/threads/:id/like`  | Like a thread              |
| POST     | `/api/threads/:id/dislike`| Dislike a thread           |

### Folder Structure
```
thread-application-backend
├── controllers   # Route handlers
├── models        # MongoDB schemas
├── routes        # API route definitions
├── middleware    # Custom middleware (e.g., auth verification)
├── config        # Helper functions
├── uploads       # avatar images
├── .env          # Environment variables
├── server.js     # Entry point
```

### Running Tests
To run tests (if implemented):
```bash
npm test
```

## License
This project is intended for learning purposes only and is not suitable for commercial use.

## Author
Created and maintained by Abbes.B

