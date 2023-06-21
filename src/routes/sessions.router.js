import { Router } from "express";
import passport from "passport";
import userModel from '../models/users.model.js'
import { validatePassword } from "../../utils.js";
import { generateToken } from "../../utils.js";
import { authToken } from "../middlewares/jwtAuth.js";
const router = Router()


//1. PASSPORT
//Register
router.post('/register',passport.authenticate('register', {failureRedirect: '/api/sessions/registerFail',failureMessage: true} ), async(req,res)=>{
    try {
       res.status(200).send({status:"success", message: "Registered"}) 
    } catch (error) {
        console.log(error)
    }
    
})
router.get('/registerFail', (req, res)=>{
    console.log(req.session.messages)
    res.status(400).send({status:"error", error: "Couldn't register"})

})

//Login
router.post('/login', passport.authenticate('login',{failureRedirect: '/api/sessions/loginFail',failureMessage: true}),async (req,res)=>{
    try {
        
        req.session.user={
            name:req.user.name,
            role:req.user.role,
            id: req.user.id,
            email: req.user.email
        }
        res.status(200).send({status:"success", message: "Logged in", payload: req.session.user})
    } catch (error) {
        res.status(500).send({status:"error", error: req.session.messages})
    }
    
})
router.get('/loginFail', (req, res)=>{
    res.status(400).send({status:"error", message:"Couldn't login"})
})

//Logout
router.post('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.clearCookie('connect.sid').status(200).redirect('/login')
        else res.send({status: 'logout error', body: err})
    })
})

//github
router.get('/github', passport.authenticate('github'),(req,res)=>{})
router.get('/githubcallback', passport.authenticate('github'), (req,res)=>{

        const user= req.user
        req.session.user={
            id:user.id,
            name: user.first_name,
            role: user.role,
            email: user.email
        }

        
        res.status(200).redirect('/products')
})


//2. JWT. Esta codeado pero no esta funcional esta lógica
router.post('/jwtLogin', async(req,res)=>{
try {
    //0.1 Me traigo el input del user
    const  {email, password} = req.body;
    //Declaro token
    let accessToken;
    //0.2 Creo al admin
    if (email === 'admin@admin.com' && password === '123') {
        const user = {
          id: 0,
          name: `Admin`,
          role: 'admin',
          email: '...',
        };
        //Asigno token al admin
        accessToken = generateToken(user);
        res.send({status:"success",accessToken})
      }

      //1. Busco si existe el user (segun el input del usuario)
      let user;
      user = await userModel.findOne({ email }); //Sólo busco por mail
      
      //1.1 Valido email y contraseña
      if (!user) return res.status(400).send({status:"error", message:"Incorrect email or password"});
      const isValidPassword = await validatePassword(password, user.password);
      if (!isValidPassword) return res.status(400).send({status:"error", message:"Incorrect email or password"});
      
      //2 Si existe lo creo
      user = {
        id: user._id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
      };

      //3.Le asigno un token
      accessToken = generateToken(user);

      //4.Mando el token al front
      res.send({status:"success",accessToken})
} catch (error) {
    console.log(error)
    res.send({status:"error"})
}
})

router.get('/jwtProfile', authToken,async(req,res)=>{
    try {
        console.log(req.user)
        res.send({status:"success",payload:req.user})
    } catch (error) {
        console.log(error)
        res.send({status:"error"})
    }

})
export default router