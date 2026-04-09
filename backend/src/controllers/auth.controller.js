import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import tokenBlacklistModel from "../models/blacklist.model.js";




/**
 * @route RegisterUserController
 * @description Register a new user, exports username, email and password in the request body®️
 * @access Public
 */
export const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password"
      });
    }

    // ✅ Check existing user
    const userAlreadyExit = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (userAlreadyExit) {
      return res.status(400).json({
        message: "User already exist with this email or username"
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword
    });

    // ✅ Generate token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ⚠️ IMPORTANT FIX FOR LOCALHOST
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ❗ CHANGE THIS (important for localhost)
      sameSite: "lax", // ❗ change from strict
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: "User created successfully ✅",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * @route LoginUserController 
 * @description login a user, expects email and password in the request body®️
 * @access Public
 */
export const loginUserController = async (req, res) => {
    try{
        const {email, password} = req.body;

        // check email Already Register 🧘‍♂️
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        // check password is valid ✅
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid email or password"
            })

        }

        // Genrate Token 📀
        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        // token store in cookies 🍪
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day 🌻
        });

        res.status(200).json({
            message: "User logged in successfully✅",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

};

/**
 * @route LogoutUserController
 * @description Clear token from user cookie and add the token in blacklist ®️
 * @access Public
 */
export const logoutUserController = async (req, res) => {
    try{
       const token = req.cookies.token;

       if(!token){
        return res.status(400).json({
            message: "User not logged in"
        })
       }
       
       //Blacklist token remove cookies 🍪
       if(token){
        await tokenBlacklistModel.create({token});

        res.clearCookie("token");

        res.status(200).json({
            message: "User logged out successfully✅"
        })
     };
       
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

};

/**
 * @route getMeController
 * @description Get the current logged in user details.  ®️
 * @access Private
 */
export const getMeController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user.id);

        res.status(200).json({
            message: "User details fetched successfully✅",
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }

};