
# 📦 # Problem 5: A Crude Server 


## 📥 Installation

1. Clone repository:

   ```bash
   git clone https://github.com/pius706975/99tech-test.git
   ```

2. Navigate to the directory
   ```bash
   cd to problem5
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create `.env.development` to store the environment configuration:

   ```bash
   .env.development
   ```

5. Fill the `.env.development` file based on your requirements:

   ```
    PORT = 5000
    NODE_ENV = development
    BASE_URL = http://localhost:5000/api

    DB_PORT = <your db port e.g., 5432>
    DB_USERNAME = <your db username e.g., john>
    DB_PASSWORD = <your db password e.g., john123>
    DB_NAME = <your db name e.g., dbtest>
    DB_HOST = <your db host e.g., localhost>
    DB_DIALECT = postgres

    JWT_ACCESS_TOKEN_SECRET = <you can fill out with random string but generate a proper secret is recommended>
   ```

## 🏃 Run the server

Run database migration and seed so that you don't need to create a new account or add new resource. Use the provided resource to make it easier.

```bash
# run db migration

npm run migration
```

```bash
# run db seed to fill out the provided data into database

npm run db:seed
```

Run the server in the development mode:

```bash
npm run dev
```

Or in the production mode

```bash
npm start
```

---

## 🛠 Additional

- **Linting and code formatting:**

  ```bash
  npm run lint      # Linting check
  npm run lint:fix  # Formatting code with prettier
  ```

- **Creating DB table:**

  ```bash
  npm run migration:generate --name "create-table-name"
  ```
---

## 📚 API Documentation

Access swagger documentations: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Swagger will automatically return the documentations based on route file annotation.

## 🔗 The example of API Request

**POST** a request to `/api/example`:

```bash
curl --request POST   --url http://localhost:5000/api/auth/signup
```

Response:

```json
{
    "message": "Successfully signed up"
}
```

---

## 👨‍💻 Author

- Pius Restiantoro - [GitHub](https://github.com/pius706975)