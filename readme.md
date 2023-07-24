### ----------- Book Store Rest API --------

### //------INTRODUCTION------//

The Book Store Rest API enables users to execute CRUD actions on books and uses JWT tokens for authorization and password hashing. It enables the admin to add, update, delete books from the book store and the customer to view the books availabe.


### //------TECH STACK USED-------//
>>Node.js: The server-side runtime environment for running the API.
>>Express.js: A minimal and flexible Node.js web application framework.
>>MongoDB: A NoSQL database used for storing user and book information.
>>mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
>>bcrypt: Used for password hashing.
>>jsonwebtoken: Used for handling JWT tokens.
>>joi: Used for validation of the request bodies.

### //----INSTALLATION----//

1. Clone the repository:

Open your terminal:

git clone https://github.com/your-username/BookStoreAPI.git
cd BookStoreAPI

2. Install dependencies:

npm install

  "dependencies":

    "bcrypt": "^5.1.0",
    "express": "^4.18.2",
    "joi": "^17.9.2",
    "jsonwebtoken": "^9.0.1",
    "mongodb": "^5.7.0",
    "mongoose": "^7.4.0",
    "nodemon": "^3.0.1",
    "validator": "^13.9.0"

3. Connect the server in the port and open the postman to interact with the application using API.

4. Connect and Use MongoDB: To begin using MongoDB, connect `mongosh` to the running instance. Copy the connection URL and update the URL in the ..db/mongoose.js.

### User API Requests

- `POST /auth/register`: Register a new user. Payload should include `name`, `email` and `password`.
For registering the user as `admin`, also specify the role as `"role": "admin"`. Only the admin can create, update and delete the books.

- `POST /auth/login`: Login as an existing user. Payload should include `email`  and `password`.

### Book API Requests

- `GET /books`: Get the list of all books.

- `GET /books/:id`: Get a specific book by its ID.

- `POST /books`: Add a new book. Payload should include `email`, `title`, `author`, `genre`, `price` and `stock`. Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).

- `PUT /books/:id`: Update an existing book by its ID. Payload should include `email`, `title`, `author`, `price` and `stock`.Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).

- `DELETE /books/:id`: Delete a book by its ID. Header should be added with the jwt Authorization token (Bearer <JWT_TOKEN>).