
import { generateToken } from "../../utils.js";
import { passportCall } from "../../utils.js";
import BaseRouter from './router.js'


//1. PASSPORT


export default class SessionsRouter extends BaseRouter{
    init(){
        //Register
        this.post('/register', ["NOT_AUTH"], passportCall('register', {strategyType:"locals"}), async(req,res)=>{
            try {
                res.status(200).send({status:"success", message: "Registered"}) 
            } catch (error) {
                console.log(error)
            }
            
        })

        //Login
        this.post('/login',["NOT_AUTH"], passportCall('login', {strategyType:"locals"}),(req,res)=>{
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
        this.post('/logout', ["USER", "ADMIN"],(req,res)=>{
            try {
                res.clearCookie('accessToken').status(200).redirect('/')
            } catch (error) {
                res.send({status: 'logout error', body: err})
            }
        })

        //github
        this.get('/github',passportCall('github'),(req,res)=>{})
        this.get('/githubcallback', passportCall('github'),(req,res)=>{
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
    }
}
