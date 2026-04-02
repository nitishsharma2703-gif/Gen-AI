import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username already exists"],
        required:[true, "username is required"],
     },

    email:{
        type:String,
        unique:[true, "Account already exists with this email address"],
        required:[true, "email is required"],
    },

    password:{
        type:String,
        required:[true, "password is required"],
    },

})

export default mongoose.model("users", userSchema);

