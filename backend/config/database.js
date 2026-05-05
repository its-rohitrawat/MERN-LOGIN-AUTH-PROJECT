import mongoose from "mongoose"

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("databse connection succesfull")
    }
    catch(error){
        console.log("database connection failed",error)
    }
}