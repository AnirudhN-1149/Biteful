import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('your_mongodb_uri').then(() => console.log("DB connected"))
}
