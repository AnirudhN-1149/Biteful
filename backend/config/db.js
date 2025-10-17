import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('your_mongodb_uri_here').then(() => console.log("DB connected"))
}