import passport from 'passport'
//estrategias
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import { Strategy, ExtractJwt } from 'passport-jwt'
//Modelos y managers
import CartsManager from '../dao/managers/mongoDB/CartsManager.js'
import userModel from '../models/users.model.js'
//Utils
import { createHash,validatePassword } from '../../utils.js'
import { cookieExtractor } from '../../utils.js'
//ENV
import config from '../config.js'

const localStrategy = local.Strategy
const cartsManager = new CartsManager()

const initializePassport=()=>{
   passport.use('github', 
   new GithubStrategy(
      {
         clientID: "Iv1.4390333c9f882960",   
         clientSecret: "df34250d9a170396089fbef0b3f92bfdaa1fa515",
         callbackURL:"http://localhost:8080/api/sessions/githubcallback"
      },
      async(accesToken, refreshToken, profile, done)=>{
      try {
      //1. Tomo los datos que necesito
         const {name ,email} = profile._json
      //2.Busco el user en mi BBDD
         let user = await userModel.findOne({email})
      //3. Validaciones
         //A. No existe? Lo creo
         if(!user){
            const newUser = { 
               first_name: name,
               email,
               password:''
            }
            const result = await userModel.create(newUser)
            let cart = await cartsManager.createCart()
            result.cartId = cart._id
            result.save()
            return done(null, result)
         }
         //B. Existe? Lo mando
         user = {
            id: user._id,
            name: user.first_name,
            email: user.email,
            role: user.role,
            cartId: user.cartId
         }
         return done(null,user)
      } catch (error) {
         done(error)
      }
  }))

   passport.use('register', new localStrategy({passReqToCallback:true,usernameField: 'email'}, async(req,email,password,done)=>{
      try {
   // 0.Traigo de body todo lo que mandó el user
         const {first_name, last_name}= req.body
   //1.Corroboro si el usuario está en la bbdd
         const exists = await userModel.findOne({email})
         if(exists)return done(null,false,{message:'User with this email already exists'})
   //2.Si el usuario no existe, encripto la password
         const hashedPassword = await createHash(password)
   //3.Creo el usuario
         const user ={first_name, last_name, email, password:hashedPassword}
         const result = await userModel.create(user)
         //Despues de crear al user y si es que lo pudo hacer => le agrego un cart personal
         let cart = await cartsManager.createCart()
         result.cartId = cart._id
         result.save()
   //4.Mando el usuario
         done(null, result)
      } catch (error) {
         done(error)
      }
   }))

   passport.use('login', new localStrategy({usernameField: 'email'},async(email,password,done)=>{
      try {
      //0. Creo admin del proyecto
      let user
         if(email===config.app.ADMIN.EMAIL&&password===config.app.ADMIN.PASSWORD){
             user={
               id: 0,
               name: "Admin",
               role: "admin",
               email:"..."
             }
             return done(null, user, {status:"success", message: "ADMIN in"})
         }
      //1. busco al usuario, ¿existe?
         
         user = await userModel.findOne({email})
         if(!user) return done(null,false,({message: "Usuario o contraseña incorrectos"}))
      //2.Verifico contraseña encriptada (si es que ya existe el user)
         const isPasswordValid = await validatePassword(password, user.password)
         if(!isPasswordValid) return done(null,false,({message: "Usuario o contraseña incorrectos"})) 
      //3. Creo el usuario
         user = {
            id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role,
            cartId: user.cartId
         }

         return done(null,user)
         } catch (error) {
            done(error)
         }
   }))

   passport.use('jwt', new Strategy({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.app.JWT_SECRET
    }, async(payload,done)=>{
      return done(null,payload);
         //Payload va a ser el user, osea es lo que recibe
    }))
}



export default initializePassport