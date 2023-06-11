import mongoose from "mongoose";

const collection ="users"

const schema= new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role:{
        type:String,
        default:"user"
    }
})

const userModel= mongoose.model(collection, schema)

export default userModel