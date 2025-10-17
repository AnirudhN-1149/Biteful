import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Anirudh:Anirudh2005@cluster0.xmiy1ga.mongodb.net/biteful').then(() => console.log("DB connected"))
}