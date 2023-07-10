import { Router } from "express";
import passport from "passport";
import userModel from '../models/users.model.js'
import { validatePassword } from "../../utils.js";
import { generateToken } from "../../utils.js";
import { authToken } from "../middlewares/jwtAuth.js";
import { passportCall } from "../../utils.js";
const router = Router()


//1. PASSPORT
//Register
router.post('/register', passportCall('register'), async(req,res)=>{
    try {
        res.status(200).send({status:"success", message: "Registered"}) 
    } catch (error) {
        console.log(error)
    }
    
})

//Login
router.post('/login', passportCall('login'), (req,res)=>{
    try {
    //1.Passport me deja al user en req.user
        let user = req.user;
    //2.Le asigno un token
        let accessToken = generateToken(user);
    //3.Mando el token al front
        res
            .cookie('accessToken', accessToken,{
                maxAge:1000*60*60*24,//24hs
                httpOnly: true
            })
            .status(200)
            .send({status:"success", message: "Logged in", payload: user})

    } catch (error) {
        console.log(error)
        res.send({status:"error"})
    }
})

//Logout
router.post('/logout', (req,res)=>{
    try {
        res.clearCookie('accessToken').status(200).redirect('/login')
    } catch (error) {
        res.send({status: 'logout error', body: err})
    }
})

//github
router.get('/github',passportCall('github'),(req,res)=>{})
router.get('/githubcallback', passportCall('github'),(req,res)=>{
        //1.Accedo al user
        const user = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
          };
        //2.Le asigno un token
        let accessToken = generateToken(user);
        //3.Mando el token al front
            res
                .cookie('accessToken', accessToken,{
                    maxAge:1000*60*60*24,//24hs
                    httpOnly: true
                })
                .status(200)
                .redirect('/')
})



router.get('/jwtProfile', authToken,async(req,res)=>{
    try {
        res.send({status:"success",payload:req.user})
    } catch (error) {
        console.log(error)
        res.send({status:"error"})
    }

})

export default router