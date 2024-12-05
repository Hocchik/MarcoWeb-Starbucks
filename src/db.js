import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectDB = async ()  => {
    const connectionString = process.env.MONGODB_URI;
    try{
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 30000, 
            socketTimeoutMS: 45000 
        });
        console.log("Funciona BB")
    } catch(error){
        console.log(error.message);
    }
};

