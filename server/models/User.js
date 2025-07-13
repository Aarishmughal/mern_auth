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
    this.password = await bcrypt.hash(this.password, 12);   // Replace recieved plain password with hashed password
    next();
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
