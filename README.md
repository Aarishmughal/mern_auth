# Making a User Auth in MERN

_This project is the continuation of the [previous repository](https://github.com/Aarishmughal/react_auth_form). The forms made in this previous project are being used here. [This project from @kalanamalshan98](https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3) was very helpful in making this authentication module possible._

## Table of Contents

-   [Getting Started](#getting-started)
-   [Setting Up Backend Server](#setting-up-the-backend)
-   [Making Authentication More Secure](#making-authentication-more-secure)
    -   [Changes to `index.js`](#changes-to-indexjs)
    -   [Changes to Entity Models](#changes-to-entity-models)
    -   [Create new Routes & Middleware directory](#create-new-routes--middleware-directory)
-   [Making Changes to Frontend](#making-changes-to-frontend)

## Getting Started

1. Clone the repository for forms:
    ```bash
    git clone https://github.com/Aarishmughal/react_auth_form
    ```
2. Navigate to the cloned directory and install new dependencies:
    ```bash
    npm install bootstrap axios react-router-dom
    ```
3. Create a new directory for the backend:
    ```bash
    mkdir server
    cd server
    ```
    ```bash
    npm init -y
    npm install express mongoose cors nodemon
    ```

## Setting Up the Backend

1. Create a new file named `index.js` in the new `server` directory and add the different components of the backend:

    - Express Server
    - Entity Model Schemas
    - MongoDB Connection
    - Authentication Routes

    _Open the file `server/index.js` for further clarification regarding code._

2. Create a new directory named `models` inside the `server` directory and create a file named `User.js` to define the user schema:
    ```javascript
    const mongoose = require("mongoose");
    const UserSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
    });
    const UserModel = mongoose.model("users", UserSchema);
    module.exports = UserModel;
    ```

## Making Authentication More Secure

To make the authentication process secure and robust, you may implement the following:

### Changes to `index.js`

1.  In your `server` directory, install the following packages:

    ```bash
    npm install bcryptjs jsonwebtoken dotenv cookie-parser nodemon
    ```

2.  Save constants like Server `PORT` & `MONGO_URL` in a `.env` file in the `server` directory:

    ```env
    PORT=3001
    MONGO_URL=mongodb://127.0.0.1:27017
    ```

    To use these constants in your `index.js` file, you can use the `dotenv` package as follows:

    ```javascript
    // Other Imports...
    require("dotenv").config();
    // ...
    const PORT = process.env.PORT || 3001;
    const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";
    ```

3.  Update the MongoDB connection to match the following:

        ```javascript
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("MongoDB connected"))
        .catch(err => console.error(err));
        ```

4.  Using `cors` to establish secure connection between frontend and backend:

    ```javascript
    // Other Imports...
    const cors = require("cors");
    const FRONTEND_PORT = process.env.FRONTEND_PORT || 5173;
    // ...
    app.use(
        cors({
            origin: `http://localhost:3000${FRONTEND_PORT}`,
            credentials: true,
        })
    );
    // ...
    ```

5.  Install and use the `cookie-parser` package to handle Client Side Cookies:

    ```javascript
    // Other Imports...
    const cookieParser = require("cookie-parser");
    // ...
    app.use(cookieParser());
    // ...
    ```

6.  Save a Token-Key in the `.env` file to sign JWT tokens:

    ```env
    TOKEN_KEY=your_secret_key
    ```

### Changes to Entity Models

1. Update the existing `User.js` model in the `models` directory to include password hashing and token generation:

    ```javascript
    // server/models/User.js
    const mongoose = require("mongoose");
    const bcrypt = require("bcryptjs");
    const UserSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    });
    UserSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next(); // If password entry isn't modified(newly recieved), hash it
        this.password = await bcrypt.hash(this.password, 12); // Replace recieved plain password with hashed password
        next();
    });
    const UserModel = mongoose.model("users", UserSchema);
    module.exports = UserModel;
    ```

### Create new Routes & Middleware directory

1.  Create a new directory named `routes` inside the `server` directory and create a file named `auth.js` to handle authentication routes:

    ```javascript
    // server/routes/auth.js
    const express = require("express");
    const User = require("../models/User");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");

    const router = express.Router();

    router.post("/register", async (req, res) => {
        const { email, username, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser)
                return res.status(400).json({ message: "User already exists" });

            const user = new User({ email, username, password });
            await user.save();

            const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
                expiresIn: "1h",
            });
            res.cookie("token", token, { httpOnly: true });
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    });

    router.post("/login", async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user)
                return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
                expiresIn: "1h",
            });
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "User logged in successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    });

    module.exports = router;
    ```

2.  Create a new directory named `middleware` inside the `server` directory and create a new file named `auth.js` to handle authentication middleware:

    ```javascript
    // server/middleware/auth.js
    const jwt = require("jsonwebtoken");

    module.exports = (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "Unauthorized" });
        }
    };
    ```

3.  Update the `index.js` file to use the new routes and middleware:

    ```javascript
    // server/index.js
    const authRoutes = require("./routes/auth");

    const authMiddleware = require("./middleware/auth");

    app.use("/api/auth", authRoutes);
    app.get("/api/protected", authMiddleware, (req, res) => {
        res.status(200).json({ message: "You are authenticated" });
    });
    ```

## Making Changes to Frontend

1.  [This project from @kalanamalshan98](https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3) has all the forms made ready to use. You can copy the code from the `src` directory of that project and paste it into your `src` directory.

2.  Make sure to install packages like `axios` in your frontend project:

    ```bash
    npm install axios react-toastify
    ```

3.  Update the existing `Login` and `Register` pages to use the new authentication routes. For our project, we will only update the url in the `App.jsx` file:

    ```javascript
    // src/App.jsx
    function App() {
    const auth_API_URL = "http://localhost:3001/api/auth";
    return (
    // ...
    <Route path="/login" element={<Login API_URL={auth_API_URL} />}/>
    ```

4.  We will now update the `Login.jsx` page to optimize the API calls. Following changes will be made to the `Login.jsx` file:

    -   New import for `react-toastify` to show notifications.
    -   Changes to the `email`, `password` states to a single `inputValue` state object.
    -   Update to the `handleOnSubmit` function to optimize form submission.
    -   New `handleOnChange` function to handle input changes.
    -   Update to form fields to use the new `inputValue` state & new function `handleOnChange`.
    -   Add a `ToastContainer` component after the form to display notifications.

    ```javascript
    // src/pages/Login.jsx
    // ...
    const [inputValue, setInputValue] = useState({ email: "", password: "" });
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                `${props.API_URL}/login`,
                inputValue,
                { withCredentials: true }
            );
            if (data.message === "User logged in successfully") {
                toast.success(data.message);
                setTimeout(() => navigate("/"), 1000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Server error");
        }
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };
    // ... refer to the full code in the file
    ```

5.  We will now update the `Register.jsx` page to optimize the API calls. Following changes will be made to the `Register.jsx` file:

    -   New import for `react-toastify` to show notifications.
    -   Changes to the `username`,`dob`,`email`, `password` states to a single `inputValue` state object.
    -   Update to the `handleOnSubmit` function to optimize form submission.
    -   New `handleOnChange` function to handle input changes.
    -   Update to form fields to use the new `inputValue` state & new function `handleOnChange`.
    -   Add a `ToastContainer` component after the form to display notifications.

    ```javascript
    // src/pages/Register.jsx
    // ...
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${props.API_URL}/register`,
                inputValue,
                { withCredentials: true }
            );
            if (data.message === "User registered successfully") {
                toast.success(data.message);
                setTimeout(() => navigate("/"), 1000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Server error");
        }
    };
    // ... refer to the full code in the file
    ```

    _More Updates Coming Soon..._
