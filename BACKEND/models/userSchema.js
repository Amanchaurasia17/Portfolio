import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name required!"],
    },
    email: {
        type: String,
        required: [true, "Email required!"],
    },
    phone: {
        type: String,
        required: [true, "Phone Number required!"],
    },
    aboutMe: {
        type: String,
        required: [true, "AboutMe is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    portfolioURL: {
        type: String,
        required: [true, "Portfolio is required!"],
    },
    githubURL:{
        type: String,
    },
    instagramURL:{
        type: String,
    },
    facebookURL:{
        type: String,
    },
    twitterURL:{
        type: String,
    },
    linkedinURL:{
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

userSchema.methods.getResetPasswordToken =function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;

};

export const User = mongoose.model("User", userSchema);