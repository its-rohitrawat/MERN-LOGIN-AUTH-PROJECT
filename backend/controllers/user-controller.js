import User from "../model/user-model.js"
import bcyrpt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

export const registerUser = async (req,res)=>{
    try{
        
        const{username, email, password} = user.body

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message : "All inputs are required"
            })

        }
        const isExistingUser = await User.findOne({email})
        if(isExistingUser){
            return res.status(400).json({
                success: false,
                message : "User already exists!"
            })
        }


    //!password hash

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcyrpt.hash(password, salt);

    const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
    });

    //! generate token

    const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET, {expiresIn : "10m"})

    //! email verification

    res.status(200).json({
        success: true,
        message : "user created",
        data : newUser,
    })
    }catch(error){
        res.status(500).json({
            success: false,
            message : "something went wrong"
        })
    }
}
export const loginUser = (req,res)=>{}
