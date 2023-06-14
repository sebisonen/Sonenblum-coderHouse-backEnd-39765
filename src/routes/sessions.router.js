import { Router } from "express";
import passport from "passport";

const router = Router()

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
        console.log(error)
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
export default router