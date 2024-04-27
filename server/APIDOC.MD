Sure, here's the API documentation in Markdown format:

---

# ToDo App API Documentation

## Table of Contents

- [Task API](#task-api)
  - [Get all tasks](#get-all-tasks)
  - [Get task by id](#get-task-by-id)
  - [Filter task by status](#filter-task-by-status)
  - [Search task by title](#search-task-by-title)
  - [Create task](#create-task)
  - [Update task](#update-task)
  - [Delete task](#delete-task)
- [Auth API](#auth-api)
  - [Signin](#signin)
  - [Signup](#signup)

## Task API

### Get all tasks

- **Description:** This endpoint retrieves all tasks.
- **Method:** GET
- **URL:** `http://localhost:3000/api/tasks`
- **Response:**
  - Status Code: 200 OK
  - Body: JSON array containing all tasks.

### Get task by id

- **Description:** This endpoint retrieves a task by its id.
- **Method:** GET
- **URL:** `http://localhost:3000/api/tasks/1`
- **Response:**
  - Status Code: 200 OK
  - Body: JSON object representing the task.

### Filter task by status

- **Description:** This endpoint retrieves tasks filtered by status.
- **Method:** GET
- **URL:** `http://localhost:3000/api/tasks/filter/1`
- **Response:**
  - Status Code: 200 OK
  - Body: JSON array containing filtered tasks.

### Search task by title

- **Description:** This endpoint searches for tasks by title.
- **Method:** GET
- **URL:** `http://localhost:3000/api/tasks/search/searchTerm`
- **Response:**
  - Status Code: 200 OK
  - Body: JSON array containing searched tasks.

### Create task

- **Description:** This endpoint creates a new task.
- **Method:** POST
- **URL:** `http://localhost:3000/api/tasks/create`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "ownerId": 10,
    "dueDate": "2024-04-26",
    "status": true
  }
  ```
- **Response:**
  - Status Code: 200 or 201 OK

### Update task

- **Description:** This endpoint updates an existing task.
- **Method:** POST
- **URL:** `http://localhost:3000/api/tasks/update`
- **Request Body:**
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "ownerId": 10,
    "dueDate": "2024-04-26",
    "status": true
  }
  ```
- **Response:**
  - Status Code: 200 or 201 OK

### Delete task

- **Description:** This endpoint deletes a task.
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/tasks`
- **Request Body:**
  ```json
  {
    "taskId": 1
  }
  ```
- **Response:**
  - Status Code: 200, 202, or 204 OK

## Auth API

### Signin

- **Description:** This endpoint allows users to sign in.
- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/signin`
- **Request Body:**
  ```json
  {
    "email": "example@gmail.com",
    "password": "examplepwd"
  }
  ```
- **Response:**
  - Status Code: 200 OK

### Signup

- **Description:** This endpoint allows users to sign up.
- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/signup`
- **Request Body:**
  ```json
  {
    "email": "example@gmail.com",
    "password": "examplepwd"
  }
  ```
- **Response:**
  - Status Code: 200 OK

---

You can use this API to CRUD tasks. You need to be logged in to use this API. Use the ToDo App Auth API to get the auth token.

Base URL: `http://localhost:3000/api`

---

This markdown document outlines the endpoints, methods, request bodies, responses, and descriptions of the ToDo App API. You can use this documentation to interact with the API endpoints effectively.
