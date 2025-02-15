# CozyCorners - A Rental Listing Platform

## Description

CozyCorners is a web application that enables users to share and discover unique rental properties. Built with Node, Express.js, MongoDB and EJS, the platform provides intutive experience for users to list, manage, and browse properties.

The server is initialized in `app.js` using Express.
Routes are modularized inside the `/routes` folder using `express.Router().`
Sessions are managed using `express-session` and `cookies`, ensuring secure user authentication.
`connect-flash` is used for flash messages.

`Passport.js` is used for authentication and authorization.
`passport-local-mongoose` is used for `hashing` and `salting` passwords.

## Features

- **CRUD for Rental Listings** : Users can create, view, edit, and delete property listings.
  
- **Restful API**

- **Dynamic UI Rendering** : Uses EJS templating and EJS-Mate for layout inheritance.

- **Database Management**:
   - `MongoDB` with `Mongoose` for structured data handling.
   - Multiple models are implemented `Listing`, `User`, `Reviews` and `Booking`.
   - `Schema` for each model is defined with mongoose.
   - Relationships b/w these models are managed using mongoose's referencing system (via `ObjectId` refrences) and population.
  - Ex: relationship b/w Listing and Booking follows Many-to-Many(M:N) relationship. One Listing can have many Bookings(from different Users). Also one User can have many Bookings(for different Listings). But Each booking is uniquely associated with one Listing and one user basically Booking model connects Listing & User and store booking info(date).

- **FullCalendar Integration** :
   - Provides an interactive calendar for booking.
   - Enables seamless date selection and UI updates.

- **Booking System** :
   - Users can select available dates using FullCalendar integration.
   - Prevents double booking of the same listing on the same date.
   - Displays booked and available dates dynamically.

- **Real-Time Booking Validation** :
   - Session-based date selection before booking confirmation.
   - Booked dates are disabled in the UI.

- **Client-Side and Server-Side Validation** :
   - Bootstrap's built-in validation for client-side.
   - `Joi` schema validation for server-side.
     
- **Authorization & Authentication** :
   - `Passport.js` for user authentication.
   - Role-based access control.
     
- **Error handling**
   - custom Error class
   - `wrapAsync()` function hels to execute each route with `try and catch` without redundant code
   - error handling middlewares

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
4. Initialize the database. Run the database initialization script inside the init folder
   ```sh
   node init/index.js
   ```
5. Run the server:
   ```sh
   node index.js
   ```
6. Open your browser and navigate to:
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
