const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

const mongodb_url = "mongodb://127.0.0.1:27017";
mongoose.connect(`${mongodb_url}/mern_auth`);

// Creating Routes
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((user) => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Incorrect Credentials");
            }
        } else {
            res.json("User not found.");
        }
    });
});
app.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
});
app.listen(3001, () => {
    console.log("Server is running at port: 3001");
});
