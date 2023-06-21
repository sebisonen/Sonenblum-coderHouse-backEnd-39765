import passport from 'passport'
import local from 'passport-local'
import { createHash,validatePassword } from '../../utils.js'
import userModel from '../models/users.model.js'
import GithubStrategy from 'passport-github2'

const localStrategy = local.Strategy


const initializePassport=()=>{
   passport.use('github', 
   new GithubStrategy(
      {
 

  },async(accesToken, refreshToken, profile, done)=>{
      try {
         //1. Tomo los datos que necesito
         const {name ,email} = profile._json
         //2.Busco el user en mi BBDD
         const user = await userModel.findOne({email})
         
         //3. Validaciones
         //A. No existe? Lo creo
         if(!user){
            const newUser = { 
               first_name: name,
               email,
               password:''
            }
            const result = await userModel.create(newUser)
            return done(null, result)
         }
         //B. Existe? Lo mando
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

   //4.Mando el usuario
         done(null, result)
      } catch (error) {
         done(error)
      }
}))
   passport.use('login', (new localStrategy({usernameField: 'email'},async(email,password,done)=>{
      try {
         //0. Traigo lo que el user mande y creo admin del proyecto
         
         if(email==="adminCoder@coder.com"&&password==="adminCod3r123"){
             user={
               id: 0,
               name: "Admin",
               role: "admin",
               email:"..."
             }
             return done(null, user, {status:"success", message: "ADMIN in"})
         }
     
         //1. busco al usuario, ¿existe?
         let user
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
            role: user.role
         }
         return done(null,user)

         } catch (error) {

            done(error)
         }
   })))
}

passport.serializeUser(function(user,done){
  
   return done(null,user.id)
})
passport.deserializeUser(async function(id,done){
   if(id===0){
      return done(null,{
         role:"admin",
         name: "ADMIN"
      })
   }
   const user = await userModel().findOne({_id:id})
   return done(null,user)
})

export default initializePassport