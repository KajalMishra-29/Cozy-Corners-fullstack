# CozyCorners - A Rental Listing Platform

## Description

CozyCorners is a web application that enables users to share and discover unique rental properties. Built with Node, Express.js, MongoDB and EJS, the platform provides intutive experience for users to list, manage, and browse properties.

The server is initialized in app.js using Express.  
Routes are modularized inside the /routes folder using `express.Router().`
Each route file handles specific API endpoints to keep the codebase clean and maintainable.

## Features

- Create, view, edit, and delete (CRUD) rental property listings.
- Restful API
- multiple models and relationship b/w them aare implemented Listing, Review, Booking, User
- Client-side validations using bootstrap's built-in validation classes.
- Server-side validation using Joi.
- Uses EJS templating and EJS-Mate for dynamic rendering.
- MongoDB as the database for storing listings.
- Middleware for validating user inputs.
- Passport for authentication and autorization
- Authorization to prevent unauthorized actions.
- Error handling with error handling middleware, handling async errors, custom error classes.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: EJS, Bootstrap
- **Middleware**: method-override, express.json, express.urlencoded
- **Validation**: Joi Schema Validation
- **Authentication**: Passport.js,

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/CozyCorners.git
   cd CozyCorners
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB (ensure it's running on `mongodb://127.0.0.1:27017/CozyCorners`):
   ```sh
   mongod
   ```
4. Run the server:
   ```sh
   node index.js
   ```
5. Open your browser and navigate to:
   ```sh
   http://localhost:8080/listings
   ```

## Project Structure

```
CozyCorners/
│── models/
│   ├── listing.js
│   ├── user.js
│── public/
│── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   ├── edit.ejs
│   ├── users/
│   │   ├── register.ejs
│   │   ├── login.ejs
│── utils/
│   ├── wrapAsync.js
│   ├── ExpressError.js
│── schema.js
│── index.js
│── package.json
│── README.md
```

## API Routes

| Method | Route                | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/listings`          | View all listings                  |
| GET    | `/listings/new`      | Show form to create a new listing  |
| GET    | `/listings/:id`      | Show details of a specific listing |
| POST   | `/listings`          | Create a new listing               |
| GET    | `/listings/:id/edit` | Show edit form for a listing       |
| PATCH  | `/listings/:id`      | Update a listing                   |
| DELETE | `/listings/:id`      | Delete a listing                   |
| GET    | `/register`          | Show user registration form        |
| POST   | `/register`          | Register a new user                |
| GET    | `/login`             | Show login form                    |
| POST   | `/login`             | Authenticate user                  |
| GET    | `/logout`            | Logout user                        |

## Sample Data

```js
const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    price: 2500,
    location: "New York City",
    country: "United States",
  },
];
```

## Contact

For any issues or feature requests, feel free to reach out:

- Email: your-email@example.com
- GitHub: [Your GitHub Profile](https://github.com/yourusername)
