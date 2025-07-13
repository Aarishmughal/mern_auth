# Making a User Auth in MERN

_This project is the continuation of the [previous repository](https://github.com/Aarishmughal/react_auth_form). The forms made in this previous project are being used here. [This project from @kalanamalshan98](https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3) was very helpful in making this authentication module possible._

## Table of Contents

-   [Getting Started](#getting-started)
-   [Setting Up Backend Server](#setting-up-the-backend)
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
## Making Changes to Frontend
1. [This project from @kalanamalshan98](https://medium.com/@kalanamalshan98/building-a-secure-mern-stack-login-and-signup-app-a-step-by-step-guide-093b87da8ad3) has all the forms made ready to use. You can copy the code from the `src` directory of that project and paste it into your `src` directory.

_More Updates Coming Soon..._