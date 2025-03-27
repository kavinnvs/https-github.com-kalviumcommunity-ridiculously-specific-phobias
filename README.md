# E-Commerce Application: Backend Web Development Project

### **Milestone 1: Project Overview**

**Brief Overview:**
This project involves developing a fully functional e-commerce platform utilizing the MERN stack — MongoDB, Express, React, and Node.js. The application will be built using React's Create React App (CRA) for the front-end, MongoDB as the database solution, and Node.js with Express to handle the back-end server operations.

The project will be split into two main areas: **Frontend** (client-side) and **Backend** (server-side) development. 

- **Frontend:** We will be creating various pages for user interaction, including:
  - **Login Page**
  - **Sign Up Page**
  - **Forgot Password Page**
  - **Home Page**
  - **Product Display Page**
  - **Cart Page**
  - **Address Page**
  - **Payment Page**
  - **Order Confirmation Page**
  - **Order History Page**
  - **Help Page**
  - **Error Page**
  - Detailed Product Pages

- **Backend:** The server will interact with MongoDB, a NoSQL database, to handle data management. We will be using the Mongoose library to interact with the database and define schemas for data consistency. To manage communication between the front-end and the back-end, we will implement APIs that allow for CRUD operations (Create, Read, Update, Delete) using HTTP methods like `POST`, `GET`, `PUT`, `PATCH`, and `DELETE`.

We’ll integrate **bcrypt** for password hashing to ensure user data security, and the entire project will follow best practices for backend structure, focusing on scalability and maintainability.

---

### **Milestone 2: Frontend Development (Login Page)**

For this milestone, we successfully created the **Login Page** using React's Create React App (CRA). To improve the user interface and design, we will be updating the layout with **Tailwind CSS** for styling and incorporate **React-Icons** for intuitive icons. Tailwind CSS will help us streamline the design process with its utility-first classes, making the UI responsive and visually appealing.

The Login Page will include fields for the user's email and password, and will handle form validation, state management, and error handling for incorrect login attempts. React Icons will be utilized for visual appeal and ease of use, enhancing the overall experience.

---

### **Milestone 3: Backend Structure and Initial Setup**

At this stage, we’ve laid the foundation for the backend by setting up the directory structure for the project. The backend is structured as follows:

- **`src/` Directory:** Contains all source code files for the server.
  - **`config/`**: Stores environment configuration files like `.env` for MongoDB URL and the server port.
  - **`controllers/`**: Defines functions to handle incoming requests for various routes.
  - **`database/`**: Contains the MongoDB connection logic in `db.js`.
  - **`middleware/`**: Houses custom middleware functions such as `error.js` for centralized error handling.
  - **`model/`**: Contains Mongoose models for the database schema.
  - **`routers/`**: Defines route handlers for different API endpoints.
  - **`utils/`**: Stores utility functions, including the `ErrorHandler.js` to manage application-level errors.

In the **`index.js`** file, we imported Express, initialized the app, and set up basic routing and server listening. We can now handle HTTP requests through `app.get` and set the server to listen for incoming requests on the specified port.

### **Milestone 4: Backend Structure and Initial Setup**
creating user model, user controller and Multer support


Milestone 6
: Backend Structure and Initial Setup** Password Encryption and User Data Storage

Password Hashing:

Implement bcrypt to hash the user's password during the signup process. Ensure that the hashed password is stored in the database instead of the plaintext version to enhance security. User Data Storage:

Save all relevant user information (e.g., name, email, etc.) in the database. Maintain the integrity and confidentiality of the password by ensuring it remains encrypted throughout the process.

Milestone 7
Create Login Endpoint:

Accept user credentials (email/username and password). Retrieve the corresponding user from the database. Validate Password:

Use bcrypt to hash the entered password. Compare it with the stored hashed password for authentication.

Milestone 8
In this milestone we created two components called Home.jsx and productcard.jsx. product card.jsx is the template used in home.jsx to map out all the products and display them. We also added routes to the home.jsx to display it when the page loads. Based on the number of products the products are mapped and displayed.



## Milestone 9: Create Product Form

### Learning Goals 🎯
By the end of this milestone, you will:

- Learn how to create a form that collects all the details of a product.
- Understand how to take multiple images as input and handle them properly.

### Why Create a Product Form?

In this milestone, we will create a form that allows users to input all necessary product details. These details will be stored in a database and displayed on the product homepage created in the previous milestone.

### Steps for Milestone 9 📝

1. **Create the Product Form**: 
   - Design and implement a form that collects all product-related information.
   - Ensure the form is user-friendly and validates the input fields.

2. **Handle Multiple Product Images**:
   - Enable the form to accept multiple images as input.
   - Implement proper handling and storage of these images.

This milestone is a crucial step in building a functional product listing feature. Good luck! 🚀

---

## Milestone 10: Product Schema & API Endpoint

### Learning Goals 🎯
By the end of this milestone, you will:

- Learn how to write a product schema.
- Learn how to create an endpoint to validate and store product details in MongoDB.

### Product Schema

- Define the structure of product data (e.g., name, description, price, image URL) using Mongoose.
- Ensure each field has proper validation (e.g., required fields, correct data types).

### Endpoint Creation

- Build a **POST** endpoint to receive product data.
- Validate and save the product details to MongoDB.

### Why Validation?

Validation ensures that only valid data is saved in the database, maintaining data integrity and preventing errors.

This milestone is essential for backend development and securing data consistency in your project. Keep going! 🚀

# Milestone 11: Fetch & Display Product Data

## Learning Goals 🎯
By the end of this milestone, you will:

- Learn how to write an endpoint that extracts and sends data from MongoDB.
- Understand how to receive data on the frontend.
- Dynamically display data using the product card created earlier.

## Steps for Milestone 11 📝

1. **Write an API Endpoint**:
   - Create an endpoint that retrieves all product data from MongoDB and sends it to the frontend.

2. **Fetch Data in Frontend**:
   - Write a function in the frontend to fetch all product data from the backend.

3. **Display Data Dynamically**:
   - Pass the fetched data to the product card component to display it dynamically.

This milestone is crucial in connecting the backend and frontend, making your application fully functional. Keep going! 🚀

E-commerce Project - Milestones 12-16
This document outlines the progress and key learnings achieved during milestones 12-16 of the E-commerce project.

Milestone 12: Data Fetching and Display
Learning Goals:

Implement an endpoint to filter and retrieve product data from MongoDB based on user email.
Develop frontend logic to receive and dynamically display fetched product data using the previously created product card component.
Key Achievements:

Successfully implemented an endpoint in the backend to filter products based on user email.
Integrated the endpoint with the frontend, enabling the dynamic display of filtered products.
Enhanced the product card component for better user experience.
Challenges:

[Describe any challenges encountered during implementation, e.g., data formatting issues, performance bottlenecks]
[Explain how these challenges were addressed]
Milestone 13: Data Updating
Learning Goals:

Implement an endpoint to update existing product data in MongoDB.
Develop frontend functionality to auto-fill forms with existing data and provide options for editing.
Key Achievements:

Created an endpoint to handle product updates in the backend.
Implemented frontend logic to pre-populate forms with existing product data.
Enabled users to edit product information and submit updates.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling data validation, preventing overwriting]
[Explain how these challenges were addressed]
Milestone 14: Data Deletion
Learning Goals:

Implement an endpoint to delete a specific product from MongoDB based on its ID.
Integrate frontend logic to trigger product deletion requests.
Key Achievements:

Created an endpoint to delete products from the database.
Implemented frontend functionality to initiate product deletion requests.
Added appropriate safeguards and confirmations before deleting products.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling accidental deletions, maintaining data integrity]
[Explain how these challenges were addressed]
Milestone 15: Navigation Component
Learning Goals:

Create a reusable navigation component for consistent user experience across multiple pages.
Key Achievements:

Developed a reusable navigation component.
Successfully integrated the navigation component into multiple pages within the application.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling responsive design, ensuring cross-browser compatibility]
[Explain how these challenges were addressed]
Milestone 16: Product Detail Page
Learning Goals:

Create a dedicated page to display individual product details.
Implement functionality to add products to the cart with quantity selection.
Key Achievements:

Developed a product detail page with comprehensive information.
Implemented features for selecting product quantity and adding items to the cart.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling inventory updates, ensuring smooth cart interactions]
[Explain how these challenges were addressed]
Overall:

[Summarize the overall progress and key learnings across all milestones. Mention any significant achievements or unexpected outcomes.]
Future Plans:

[Outline the next steps for the E-commerce project, such as:
Implementing cart functionality
Integrating payment gateways
Enhancing user authentication and authorization]
Note:

This is a basic template. Please replace the bracketed sections with your specific details and accomplishments.
Use Markdown syntax to format the README.md file for better readability..


# Milestone 17 - Cart Management API

## Project Overview
This milestone involves modifying the user schema to store cart products and implementing an endpoint to receive product details and store them in the database.

## Tasks
1. **Edit the User Schema**
   - Modify the existing user schema to include a `cart` field.
   - Ensure the `cart` field stores product details such as `productId`, `quantity`, and `price`.

2. **Create an API Endpoint**
   - Develop an endpoint to receive product details from the frontend.
   - Validate the received data before storing it in the database.
   - Update the user's cart with the received product details.

## Installation & Setup
### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud-based)
- npm or yarn package manager

### Steps to Run
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Documentation
### **1. Add Product to Cart**
**Endpoint:** `POST /api/cart/add`

**Request Body:**
```json
{
  "userId": "12345",
  "productId": "67890",
  "name": "Product Name",
  "price": 100,
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Product added to cart successfully",
  "cart": [
    {
      "productId": "67890",
      "name": "Product Name",
      "price": 100,
      "quantity": 2
    }
  ]
}
```

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose





E-commerce Project - Milestones 12-16
This document outlines the progress and key learnings achieved during milestones 12-16 of the E-commerce project.

Milestone 12: Data Fetching and Display
Learning Goals:

Implement an endpoint to filter and retrieve product data from MongoDB based on user email.
Develop frontend logic to receive and dynamically display fetched product data using the previously created product card component.
Key Achievements:

Successfully implemented an endpoint in the backend to filter products based on user email.
Integrated the endpoint with the frontend, enabling the dynamic display of filtered products.
Enhanced the product card component for better user experience.
Challenges:

[Describe any challenges encountered during implementation, e.g., data formatting issues, performance bottlenecks]
[Explain how these challenges were addressed]
Milestone 13: Data Updating
Learning Goals:

Implement an endpoint to update existing product data in MongoDB.
Develop frontend functionality to auto-fill forms with existing data and provide options for editing.
Key Achievements:

Created an endpoint to handle product updates in the backend.
Implemented frontend logic to pre-populate forms with existing product data.
Enabled users to edit product information and submit updates.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling data validation, preventing overwriting]
[Explain how these challenges were addressed]
Milestone 14: Data Deletion
Learning Goals:

Implement an endpoint to delete a specific product from MongoDB based on its ID.
Integrate frontend logic to trigger product deletion requests.
Key Achievements:

Created an endpoint to delete products from the database.
Implemented frontend functionality to initiate product deletion requests.
Added appropriate safeguards and confirmations before deleting products.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling accidental deletions, maintaining data integrity]
[Explain how these challenges were addressed]
Milestone 15: Navigation Component
Learning Goals:

Create a reusable navigation component for consistent user experience across multiple pages.
Key Achievements:

Developed a reusable navigation component.
Successfully integrated the navigation component into multiple pages within the application.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling responsive design, ensuring cross-browser compatibility]
[Explain how these challenges were addressed]
Milestone 16: Product Detail Page
Learning Goals:

Create a dedicated page to display individual product details.
Implement functionality to add products to the cart with quantity selection.
Key Achievements:

Developed a product detail page with comprehensive information.
Implemented features for selecting product quantity and adding items to the cart.
Challenges:

[Describe any challenges encountered during implementation, e.g., handling inventory updates, ensuring smooth cart interactions]
[Explain how these challenges were addressed]
Overall:

[Summarize the overall progress and key learnings across all milestones. Mention any significant achievements or unexpected outcomes.]
Future Plans:

[Outline the next steps for the E-commerce project, such as:
Implementing cart functionality
Integrating payment gateways
Enhancing user authentication and authorization]
Note:

This is a basic template. Please replace the bracketed sections with your specific details and accomplishments.
Use Markdown syntax to format the README.md file for better readability..


# Milestone 19 :- Creating a cart handler

# Cart Page Implementation

## Milestone Overview
By the end of this milestone, you will:
- Create a cart page that displays the products inside the cart using an endpoint built in milestone 18.
- Implement functionality to increase and decrease product quantity using `+` and `-` buttons.
- Write an endpoint to handle increasing and decreasing product quantity.

---

## Project Structure
```
project-root/
│-- backend/
│   ├── routes/
│   │   ├── cart.js  # Defines cart-related API routes
│   ├── models/
│   │   ├── cartModel.js  # Defines the cart schema
│   ├── controllers/
│   │   ├── cartController.js  # Handles cart operations
│   ├── server.js  # Main backend entry point
│
│-- frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.js  # Cart page UI and logic
│   │   ├── App.js  # Main frontend entry point
│
│-- README.md  # Project Documentation
```

---

## Backend Implementation
### API Endpoints

#### Get Cart Products
**Endpoint:** `GET /api/cart`
- Fetches all products in the cart.
- Returns a list of cart items with product details and quantities.

#### Increase Product Quantity
**Endpoint:** `PUT /api/cart/increase/:productId`
- Increases the quantity of a specific product in the cart.
- Updates the database accordingly.

#### Decrease Product Quantity
**Endpoint:** `PUT /api/cart/decrease/:productId`
- Decreases the quantity of a specific product in t





# Milestone-21

## 🎯 Learning Goals  
By the end of this milestone, you will be able to:  
✅ Create a **frontend form** to collect address details  
✅ Accept the following inputs:  
   - **Country**  
   - **City**  
   - **Address Line 1**  
   - **Address Line 2**  
   - **Zip Code**  
   - **Address Type** (e.g., Home, Office, Other)  

---

## 🛠 Tech Stack  
- **Frontend:** React.js  
- **State Management:** useState (React Hook)  
- **Routing:** React Router  
- **Form Handling:** Controlled Components  
- **Backend (Optional, if needed):** Express.js, MongoDB  

---

## 🚀 Project Setup  

### 🔹 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/address-form.git
cd address-form







# 📦 Milestone 22: Store Address in User Profile  

## 🚀 Overview  
In this milestone, we have implemented a **backend endpoint** that allows users to **store their address** inside their profile in the database. This feature ensures that users can manage their addresses efficiently.  

## 🎯 Learning Goals  
By the end of this milestone, you will:  
- Create a **backend endpoint** to store user addresses in the database.  
- Update the **user profile schema** to include address details.  
- Connect the frontend **AddressForm** with the backend API.  
- Display the updated address in the **Profile page**.  

## 🏗️ Project Structure  
```
/project-root
│── /src
│   ├── /Components
│   │   ├── AddressForm.jsx   # Form to collect address details
│   │   ├── Profile.jsx       # Displays user profile with stored address
│   ├── /Model
│   │   ├── userModel.js      # Defines user schema with address field
│   ├── /Routes
│   │   ├── user.js           # Backend routes for user profile and address update
│   ├── App.jsx               # Includes routing for AddressForm and Profile
│── server.js                 # Main server file
│── package.json
│── README.md
```

## 🔧 Installation & Setup  
1. **Clone the repository**  
   ```bash
   git clone <repo-url>
   cd project-root
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the server**  
   ```bash
   npm start
   ```

## 🛠️ API Endpoints  
### 1️⃣ **Update Address**  
**Endpoint:**  
```
POST /update-address
```
**Body:**  
```json
{
  "email": "user@example.com",
  "address": {
    "country": "India",
    "city": "Mumbai",
    "address1": "123 Street Name",
    "address2": "Apt 45",
    "zipCode": "400001",
    "addressType": "Home"
  }
}
```
**Response:**  
```json
{
  "message": "Address updated successfully",
  "user": {
    "email": "user@example.com",
    "address": { ... }
  }
}
```

### 2️⃣ **Fetch User Profile**  
**Endpoint:**  
```
GET /profile?email=user@example.com
```
**Response:**  
```json
{
  "user": {
    "name": "John Doe",
    "email": "user@example.com",
    "address": { ... }
  }
}
```

## 🎯 Features Implemented  
✔️ **User can add an address through AddressForm**  
✔️ **Address is stored in the database inside user profile**  
✔️ **Profile page displays stored address**  
✔️ **Backend API updates and retrieves user address**  

## 📌 Notes  
- Ensure the backend server is running before testing.  
- Update the `email` dynamically when integrating authentication.  
- Test API using **Postman** or **Thunder Client** before connecting frontend.  

## 🏁 Conclusion  
Milestone 22 successfully integrates **address management** inside the user profile, enhancing the user experience with persistent address storage. 🚀  








# Milestone 23: Select Address Page & Order Placement

## Learning Goals 🎯
By the end of this milestone, you will:
- Implement a "Place Order" button inside the cart.
- Create a "Select Address" page that retrieves and displays all saved addresses from the database.
- Allow users to select a delivery address before placing an order.

## Features Implemented 🚀
### Backend:
1. **Updated `user.js` (Routes)**
   - Added a `GET /fetch-addresses` endpoint to retrieve all addresses for a user.
   - Integrated address retrieval logic using `userModel`.

2. **Updated `userModel.js` (Schema)**
   - Ensured addresses are stored as an array inside the user schema.

### Frontend:
1. **Created `SelectAddress.jsx`**
   - Fetched user addresses using Axios (`/auth/fetch-addresses`).
   - Displayed all available addresses.
   - Allowed users to select a preferred address.

2. **Updated `App.jsx`**
   - Added a route for `/select-address`.
   - Integrated `SelectAddress` into the application.

## How to Use 🛠️
1. Navigate to `/cart` and click the "Place Order" button.
2. You'll be redirected to the `/select-address` page.
3. Choose a delivery address from the available options.
4. Confirm the selection to proceed with the order.

## Technologies Used 🏗️
- **Frontend:** React, Axios, React Router
- **Backend:** Express, MongoDB, Mongoose, JWT Authentication

## Next Steps 🔜
- Implement order placement logic.
- Connect order details with a payment gateway.
- Enhance UI/UX for a smoother checkout experience.








# 🛒 Milestone 24 - Order Confirmation Page

## 🎯 Learning Goals
By the end of this milestone, you will:
- Implement an **Order Confirmation Page** in the frontend.
- Use **Axios** to fetch and display order details.
- Ensure a smooth **user experience** post-purchase.

---

## 📌 Features to Implement
1. **Display Order Summary**
   - Fetch and display **product details, quantity, and price**.
   - Show **total cost** of the order.

2. **Address Selection**
   - Retrieve and display the **selected shipping address**.

3. **Payment Confirmation**
   - Show **payment status** (Success/Failure).
   - Display **Order ID**.

4. **User Feedback**
   - Add a **thank-you message** and navigation buttons.

---

## 🏗️ Folder Structure

---

## 🔗 API Endpoints
| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| `GET`  | `/order/confirmation`    | Fetch order details                 |
| `GET`  | `/auth/get-addresses`    | Retrieve stored user addresses      |

---

## 🔧 Tech Stack
- **Frontend:** React, Axios, React Router
- **Backend:** Express.js, MongoDB
- **Authentication:** JWT

---

## 🚀 Steps to Implement
1. **Create `OrderConfirmation.jsx`**
2. **Fetch Order Details using `axios.get('/order/confirmation')`**
3. **Display Order ID, Products, and Address**
4. **Style the page for a smooth UX**
5. **Update `App.jsx` to add a new route**

---

## 📝 Example Code (OrderConfirmation.jsx)
```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get("/order/confirmation").then((response) => {
      setOrder(response.data);
    });
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>🎉 Order Confirmed!</h2>
      <p>Order ID: {order.id}</p>
      <p>Total Amount: ${order.total}</p>
      <p>Shipping Address: {order.address}</p>
    </div>
  );
};

export default OrderConfirmation;







# Milestone 25 - Place an Order

## 📌 Overview
This milestone focuses on creating a backend endpoint that allows users to place an order.  
The order consists of **products, quantity, and a shipping address** associated with a registered user.

## 🏗️ Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcrypt.js (for password hashing)
- multer (for file uploads)
- dotenv (for environment variables)
- JWT (for authentication)

---

## 🚀 API Endpoint: Place an Order
### **📌 Endpoint: `/place-order`**
**Method:** `POST`  
**URL:** `/auth/place-order`  

### **📌 Request Body**
```json
{
  "email": "user@example.com",
  "products": [
    { "productId": "65f1a98b7f1c3e5d1a123456", "quantity": 2 },
    { "productId": "65f1a98b7f1c3e5d1a654321", "quantity": 1 }
  ],
  "address": "123, Main Street, City"
}









# Milestone 26 - Retrieve User Orders

## 📌 Overview
This milestone focuses on creating a backend endpoint that allows users to **view all their past orders**.  
Using the user's **email**, the system retrieves their **_id** and fetches all orders associated with them.

## 🏗️ Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcrypt.js (for password hashing)
- dotenv (for environment variables)
- JWT (for authentication)

---

## 🚀 API Endpoint: Retrieve Orders
### **📌 Endpoint: `/your-orders`**
**Method:** `GET`  
**URL:** `/auth/your-orders?email=user@example.com`  

### **📌 Response**
✅ **Success (200)**
```json
{
  "orders": [
    {
      "_id": "65f3c89a0d12ab34567c8901",
      "userId": "65f0b91c123abc123abc1234",
      "productId": {
        "_id": "65f1a98b7f1c3e5d1a123456",
        "name": "Laptop",
        "price": 999
      },
      "quantity": 2,
      "address": "123, Main Street, City",
      "status": "Pending",
      "createdAt": "2025-03-11T12:34:56.789Z"
    }
  ]
}











# 📌 Milestone 27 - My Orders Page

## 📝 Overview  
In this milestone, we will create a **"My Orders"** page to display all the orders placed by a user. The orders will be fetched from the backend using the `/your-orders` endpoint.

---

## 🎯 Learning Goals  
By completing this milestone, you will:  
- ✅ Create a **frontend page** (`MyOrders.jsx`) to display user orders.  
- ✅ Make a **GET request** to the `/your-orders` API endpoint.  
- ✅ Send the **user's email** as a query parameter to fetch their orders.  
- ✅ Display the **list of orders**, including product details.  
- ✅ Add the **"My Orders" page to the Navbar** for easy access.  

---

## 📂 Steps to Complete This Milestone  

### 1️⃣ Modify `App.jsx`  
- Import the `MyOrders` component.  
- Add a route for `/my-orders`.  
- Ensure it correctly renders the `MyOrders` page.  

### 2️⃣ Create `MyOrders.jsx` Component  
- Fetch **orders** from the backend using `/your-orders`.  
- Display order details such as:  
  - **Product Name**  
  - **Quantity**  
  - **Order Status** (Pending, Shipped, Delivered, Cancelled)  
  - **Order Date**  
- Use **Tailwind CSS** for styling.  

### 3️⃣ Modify the Navbar  
- Add a **"My Orders"** link in the Navbar.  
- Ensure it redirects to `/my-orders`.  

---

## 🛠️ API Endpoint - `/your-orders`  
- **Method:** `GET`  
- **URL:** `/your-orders?email=<user_email>`  
- **Response Example:**  
```json
{
  "orders": [
    {
      "_id": "65abc123def456",
      "productId": {
        "_id": "789xyz456",
        "name": "Smartphone X",
        "price": 699
      },
      "quantity": 2,
      "status": "Shipped",
      "address": "123 Street, City",
      "createdAt": "2025-03-11T12:00:00.000Z"
    }
  ]
}














# Milestone 28 - Cancel Order Feature & Fixes

## **Overview**
Milestone 28 introduces a **Cancel Order** feature in the backend, along with bug fixes and improvements in the `user.js` file. Users can now cancel their orders, and deleted products will no longer cause issues in the order list.

---

## **Features Implemented**
### ✅ **Cancel Order API**
- **Endpoint:** `POST /cancel-order`
- **Description:** Allows users to cancel an order by providing the `orderId`.
- **Request Body:**
  ```json
  {
    "orderId": "ORDER_ID_HERE"
  }







# 🛒 Milestone 29 - Integrating PayPal Payment  

## 🎯 Learning Goals  
By the end of this milestone, you will:  
- Learn how to use the **PayPal API**.  
- Learn how to integrate **online payments** into your project.  

## 📝 Steps for Milestone 29  

### 1️⃣ Create a PayPal Developer Account  
- Go to the [PayPal Developer Dashboard](https://developer.paypal.com/).  
- Sign up or log in.  

### 2️⃣ Set Up Sandbox Accounts  
- Navigate to **Sandbox > Accounts** in the dashboard.  
- Copy the **UserID** of the sandbox account and save it.  
- In the **Sandbox Accounts** section, find your **Client ID** and save it.  

### 3️⃣ Modify the Order Confirmation Page  
- In your **order confirmation** page, add **two payment options**:  
  - **Cash on Delivery (COD)**  
  - **Online Payment (PayPal)**  
- Use **radio buttons** to let users select between COD and PayPal.  
- When a user selects **Online Payment**, the **PayPal buttons** should be displayed.  

### 4️⃣ Prepare for the Next Milestone  
- In the next milestone, we will write the actual code to handle **PayPal transactions**.  

## ✅ Expected Outcome  
- Users should be able to select **COD** or **PayPal** on the order confirmation page.  
- If **PayPal** is selected, the **PayPal payment buttons** should appear.  

🚀 **Get ready for the next step: Implementing PayPal payments!**  
















# Milestone-30

# 🛒 E-Commerce Application with PayPal Integration

This project is a full-stack e-commerce application that allows users to register, log in, manage addresses, place orders, and make online payments using PayPal. The backend is built using **Node.js, Express, MongoDB**, and authentication is handled with **JWT & bcrypt**.

---

## 🚀 Features

### **User Authentication**
✅ Register new users with hashed passwords  
✅ Secure login using JWT authentication  

### **User Profile & Address Management**
✅ Fetch user profile  
✅ Add multiple addresses  

### **Order Management**
✅ Place orders for multiple products  
✅ Fetch all orders of a user  
✅ Cancel an order  

### **Payment Integration (PayPal)**
✅ Secure online payments using **PayPal API**  
✅ Verify PayPal payment status and update order status  

---

## 📌 **Tech Stack**

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT, bcrypt  
- **Payments**: PayPal API  
- **File Uploads**: Multer  

---

## 📚 **Learning Goals 🎯**
By the end of this milestone, you will:

✅ Learn how to use PayPal API  
✅ Learn how to integrate online payments  

---

## 🛠️ **Project Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo-name.git
cd your-repo-name