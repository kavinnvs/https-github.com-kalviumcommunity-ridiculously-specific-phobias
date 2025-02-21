E-Commerce Application: Backend Web Development Project
Milestone 1: Project Overview
Brief Overview: This project involves developing a fully functional e-commerce platform utilizing the MERN stack — MongoDB, Express, React, and Node.js. The application will be built using React's Create React App (CRA) for the front-end, MongoDB as the database solution, and Node.js with Express to handle the back-end server operations.

The project will be split into two main areas: Frontend (client-side) and Backend (server-side) development.

Frontend: We will be creating various pages for user interaction, including:

Login Page
Sign Up Page
Forgot Password Page
Home Page
Product Display Page
Cart Page
Address Page
Payment Page
Order Confirmation Page
Order History Page
Help Page
Error Page
Detailed Product Pages
Backend: The server will interact with MongoDB, a NoSQL database, to handle data management. We will be using the Mongoose library to interact with the database and define schemas for data consistency. To manage communication between the front-end and the back-end, we will implement APIs that allow for CRUD operations (Create, Read, Update, Delete) using HTTP methods like POST, GET, PUT, PATCH, and DELETE.

We’ll integrate bcrypt for password hashing to ensure user data security, and the entire project will follow best practices for backend structure, focusing on scalability and maintainability.

Milestone 2: Frontend Development (Login Page)
For this milestone, we successfully created the Login Page using React's Create React App (CRA). To improve the user interface and design, we will be updating the layout with Tailwind CSS for styling and incorporate React-Icons for intuitive icons. Tailwind CSS will help us streamline the design process with its utility-first classes, making the UI responsive and visually appealing.

The Login Page will include fields for the user's email and password, and will handle form validation, state management, and error handling for incorrect login attempts. React Icons will be utilized for visual appeal and ease of use, enhancing the overall experience.

Milestone 3: Backend Structure and Initial Setup
At this stage, we’ve laid the foundation for the backend by setting up the directory structure for the project. The backend is structured as follows:

src/ Directory: Contains all source code files for the server.
config/: Stores environment configuration files like .env for MongoDB URL and the server port.
controllers/: Defines functions to handle incoming requests for various routes.
database/: Contains the MongoDB connection logic in db.js.
middleware/: Houses custom middleware functions such as error.js for centralized error handling.
model/: Contains Mongoose models for the database schema.
routers/: Defines route handlers for different API endpoints.
utils/: Stores utility functions, including the ErrorHandler.js to manage application-level errors.
In the index.js file, we imported Express, initialized the app, and set up basic routing and server listening. We can now handle HTTP requests through app.get and set the server to listen for incoming requests on the specified port.

Milestone 4: Backend Structure and Initial Setup
creating user model, user controller and Multer support

**Milestone 6
: Backend Structure and Initial Setup** Password Encryption and User Data Storage

Password Hashing:

Implement bcrypt to hash the user's password during the signup process. Ensure that the hashed password is stored in the database instead of the plaintext version to enhance security. User Data Storage:

Save all relevant user information (e.g., name, email, etc.) in the database. Maintain the integrity and confidentiality of the password by ensuring it remains encrypted throughout the process.

**Milestone 7
Create Login Endpoint:

Accept user credentials (email/username and password). Retrieve the corresponding user from the database. Validate Password:

Use bcrypt to hash the entered password. Compare it with the stored hashed password for authentication.

**Milstone 8
In this milestone we created two components called Home.jsx and productcard.jsx. product card.jsx is the template used in home.jsx to map out all the products and display them. We also added routes to the home.jsx to display it when the page loads. Based on the number of products the products are mapped and displayed.
Milestone 8: Creating a Home Page
Designed a responsive homepage layout.
Implemented a grid layout for displaying product cards.
Ensured responsiveness for different screen sizes.
Milestone 9: Creating a Product Form
Created a form to input product details.
Allowed users to upload multiple product images.
Saved the entered details in the database.
Milestone 10: Product Schema & API Endpoint
Created a Mongoose schema for products.
Developed a POST endpoint to validate and store product data in MongoDB.
Milestone 11: Fetch & Display Products
Created an API endpoint to fetch all products from the database.
Implemented a frontend function to fetch and display product data dynamically.
Used useState and useEffect to manage the data lifecycle.
Milestone 12: Fetch & Display Filtered Products
Created an API endpoint to fetch products based on the user's email.
Implemented frontend logic to request and display filtered products.
Ensured efficient state management using React hooks.
Milestone 13:- Edit Product Functionality
Created a PUT API endpoint to update product details in MongoDB.
Added an Edit button on the product card.
Implemented auto-filled form for editing existing product details.
Connected frontend with backend to send PUT requests.
Handled errors and ensured data validation.
Milestone 14:- Edit & Delete Product Functionality
Created a PUT API endpoint to update product details in MongoDB.
Added an Edit button on the product card.
Implemented auto-filled form for editing existing product details.
Connected frontend with backend to send PUT requests.
Handled errors and ensured data validation.
Created a DELETE API endpoint to remove products from MongoDB.
Added a Delete button to the product card.
Integrated frontend with backend to send DELETE requests.
Milestone 15 - Creating a Navbar Component 🚀
Create a New Nav Component
The Navbar should include links to the following pages:
Home
My Products
Add Product
Cart
Navbar is responsive and adapts to different screen sizes.
Add Navbar to All Pages
Import and integrate the Nav component into all pages.
Ensure smooth navigation between different sections of the application.
Make the Navigation Smooth & User-Friendly
Use React Router for handling navigation.
Implement active link highlighting for better UX.
Optimize the layout to be mobile-friendly.
Milestone 16 - Creating a Product Info Page 🛒
Create a New Product Info Page
The page should display detailed information about a product.
Include product name, image, price, and description.
Add a Quantity Selector
Allow users to select the desired quantity of the product.
Ensure the quantity selection updates dynamically.
Implement the Add to Cart Button
Add a button that allows users to add the selected quantity of the product to their cart.
Ensure smooth user interaction and feedback after adding to cart.