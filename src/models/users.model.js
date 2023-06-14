import mongoose from "mongoose";

const collection ="users"

const schema= new mongoose.Schema({
    first_name: {
        type: String,
        required:true,
        minlength: 1
    },
    last_name: {
        type: String,
        required:true,
        minlength: 1
    },
    email: {
        type: String,
        required:true,
        minlength: 1
    },
    password: {
        type: String,
        required:true,
        minlength: 1
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true, strict: "throw"})

const userModel= mongoose.model(collection, schema)

export default userModel