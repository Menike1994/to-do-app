# ToDo App

This is a simple ToDo App built with Node.js, Express and MySQL.

## Installation

1. Clone the repository:

```bash
git clone
```

2. Navigate into the project directory:

```bash
cd ToDo-APP/server
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Define environment variables such as database connection URL, jwt secret, etc. Example:

   ```
    MYSQL_HOST=127.0.0.1
    MYSQL_USER=root
    MYSQL_PWD=admin
    MYSQL_DB=TaskApp
    JWT_SECRET=yourjwtsecret

   ```

5. Run the sql script
   ```
   mysql> source PATH_TO_SQL_SCRIPT
   ```

## Usage

1. Start the server:

```bash
npm run dev
```

2. Visit `http://localhost:3000` in your browser to use the ToDo App.

3. Refere the [API Doc](APIDOC.MD) for endpoint usage

## Project Structure

```
└── server/
    ├── src/
    │   ├── consts/
    │   │   └── ERROR.ts
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   └── tasksController.ts
    │   ├── middleware/
    │   │   └── authMiddleware.ts
    │   ├── models/
    │   │   ├── tasks.ts
    │   │   └── users.ts
    │   ├── respositories/
    │   │   ├── tasksRepo.ts
    │   │   └── userRepo.ts
    │   ├── services/
    │   │   └── authService.ts
    │   └── main.ts
    ├── .env
    └── sqlScript.sql
```

## Technologies Used

- Node.js
- Express
- MySQL

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
