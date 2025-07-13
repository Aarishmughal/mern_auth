const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 5173;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: `http://localhost:${FRONTEND_PORT}`,
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
    res.status(200).json({ message: "You are authenticated" });
});
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

// Creating Routes
// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     // UserModel.findOne({ $or: [{ email: email }, { username: email }] }).then(
//     UserModel.findOne({ email: email }).then((user) => {
//         if (user) {
//             if (user.password === password) {
//                 res.json("Success");
//             } else {
//                 res.json("Incorrect Credentials");
//             }
//         } else {
//             res.json("User not found.");
//         }
//     });
// });
// app.post("/register", (req, res) => {
//     UserModel.create(req.body)
//         .then((users) => res.json(users))
//         .catch((err) => res.json(err));
// });
