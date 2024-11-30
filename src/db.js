import mongoose from "mongoose";

export const connectDB = async ()  => {
    try{
        await mongoose.connect('mongodb://localhost/Registros');
        console.log("Funciona BB")
    } catch(error){
        console.log(error);
    }
};

