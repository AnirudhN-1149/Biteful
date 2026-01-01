import foodModel from "../models/foodModel.js";
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Helper function to upload buffer to Cloudinary
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
            { folder: "food_ordering" }, // Optional: organize in a folder
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

// Add food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "No image uploaded!" });
        }

        // Upload to Cloudinary
        const result = await streamUpload(req.file.buffer);

        // Create food item with Cloudinary URL and public_id
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: result.secure_url,
            public_id: result.public_id
        });

        await food.save();
        res.json({ success: true, message: "Food added successfully!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error uploading food item!" });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({ success: false, message: "Food not found!" });
        }

        // Delete from Cloudinary
        if (food.public_id) {
            await cloudinary.v2.uploader.destroy(food.public_id);
        }

        // Delete from MongoDB
        await foodModel.findByIdAndDelete(req.body.id);
        
        res.json({ success: true, message: "Food removed!!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food!" });
    }
};

export { addFood, listFood, removeFood };