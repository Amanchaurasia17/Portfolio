import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minLength: [3, "Name should be atleast 3 characters long"],
    },
    subject: {
        type: String,
        minLength: [5, "Subject should be atleast 5 characters long"],
    },
    message: {
        type: String,
        minLength: [10, "Message should be atleast 10 characters long"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export const Message = mongoose.model("Message", messageSchema);
