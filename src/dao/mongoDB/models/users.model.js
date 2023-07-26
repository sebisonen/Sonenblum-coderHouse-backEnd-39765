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
        default:"",
        },
    email: {
        type: String,
        required:true,
        minlength: 1
    },
    cartId:{
        type: String
    },
    password:  String,
        // required:true,
        // minlength: 1
    
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true, strict: "throw"})

const usersModel= mongoose.models.users|| mongoose.model(collection, schema)

export default usersModel