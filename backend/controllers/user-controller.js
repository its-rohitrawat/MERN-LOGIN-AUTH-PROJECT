import { User } from "../model/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyMail } from "../config/verify-mail.js";
import { Session } from "../model/session-model.js";
import { sendOtpMail } from "../config/otp-mail.js";
import { use } from "react";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All inputs are required",
      });
    }
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    //!password hash

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    //! generate token

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    //! email verification

    verifyMail(token, email);
    newUser.token = token;
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "user created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decodedInfo;

    try {
      let decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Token expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }

    const user = await User.findById(decodedInfo.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.isVerified = true;
    user.token = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all inputs fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user doesnt exists",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "password missmatch",
      });
    }

    //! check if the user is verified or not

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "User not found. Please Register first, check your mail for verification",
      });
    }

    //! check existing session
    const existingSession = await Session.findOne({ userId: user._id });
    if (existingSession) {
      await Session.deleteOne({ userId: user._id });
    }

    //! create new session
    await Session.create({ userId: user._id });

    //! create accessToken
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    //! create refreshToken
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.username}`,
      accessToken,
      refreshToken,
      user: { username: user.username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//!logout

export const logout = async (req, res) => {
  try {
    const userId = req.userId; //authmiddleware!!
    const sessionPromise = Session.deleteMany({ userId });
    const userPromise = User.findByIdAndUpdate(userId, { isLoggedIn: false });
    // await Session.deleteMany({ userId });
    // await User.findByIdAndUpdate(userId, { isLoggedIn: false });

    Promise.allSettled([sessionPromise, userPromise])
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Logged out successfully",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//!forgotpassword

export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.optExpiry = expiry;
    await user.save();

    await sendOtpMail(email, otp);
    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${email}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//!verifyotp
export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const { email } = req.params.email;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "otp is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    if (!user.otp || !user.optExpiry) {
      return res.status(400).json({
        success: false,
        message: "Otp not generated or already verified",
      });
    }

    if (user.optExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Otp has required, Please generate new one",
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }

    user.otp = null;
    user.optExpiry = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Otp verify successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//!confirm password
