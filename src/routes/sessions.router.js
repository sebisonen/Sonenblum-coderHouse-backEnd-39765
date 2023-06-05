import { Router } from "express";
import userModel from "../models/users.model.js"

const router = Router()

router.post('/register', async(req,res)=>{
    try {
        const result = await userModel.create(req.body)//Suponiendo que está todo bien, sin validar nada
    res.status(200).send({status:"success", payload: result})
    } catch (error) {
        res.status(500).send({status:"error", error: error, message: "server error"})
    }
    
})

router.post('/login', async (req,res)=>{
    try {
         //NUMERO 1: busco al usuario, ¿existe?
    const {email, password} = req.body;
    const user = await userModel.findOne({email, password})
    if(!user) return res.status(400).send({status:"error", error: "Usuario o contraseña incorrectos"}) 
    
    //NUMERO 2: creo una sesion
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.status(200).send({status:"success", message: "logged in", payload: req.session.user})
    } catch (error) {
        res.status(500).send({message: "server error"})
    }
   
})
export default router