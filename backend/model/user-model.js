import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(

    {
        username : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String, required : true},
        isVerified : {type : Boolean, default : null},
        isLoggedIn : {type : Boolean, default : null},
        token : {type : String, default : null},
        otp : {type : String, default : null},
        optExpiry : {type : Date, default : null},

    },
    {timestamps : true}

)

export const User = mongoose.model("user", UserSchema);