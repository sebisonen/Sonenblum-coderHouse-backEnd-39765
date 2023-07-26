import usersModel from "../models/users.model.js";

export default class UsersManager {
    getUserByEmail=(email)=> usersModel.findOne({email: email})
    createUser =(newUser)=>usersModel.create(newUser)

}