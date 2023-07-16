import {fileURLToPath} from 'url';
import { dirname } from 'path'; //=> Toma una referencia absoluta de donde yo tenga guardado todo
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';

export const generateToken =(user)=>{
    const token = jwt.sign(user, 'jwtSecret',{expiresIn:'24h'})
    return token
}
export const createHash = async (password)=>{
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salts)
}
export const validatePassword = async (password, hashedPassword)=>bcrypt.compare(password,hashedPassword)

export const passportCall = (strategy,options = {}) =>{
    return async(req,res,next) =>{ 
        passport.authenticate(strategy,(error,user,info)=> {
            //Si de la estrategia viene un error, mandalo
            if(error) return next(error);
            //En el custom router uso JWT para validar todas las peticiones, lo cual no siempre voy a tener un token,
            //así que voy a necesitar manejar yo mismo el flujo de datos:
            if(!options.strategyType){//Le pido que me mande que tipo de estrategia se está utilizando en passport
                console.log(`Route ${req.url} doesn't have defined a strategyType`)//Esto es más un error de development(?)
                return res.sendServerError()
            }
            if(!user) {//Si no encontró usuario 
                switch(options.strategyType){//puede ser que sea por el tipo de estrategia 
                    case 'jwt'://Si estoy usando JWT 99% que el usuario no está logueado, por las dudas...
                        req.error = info.message?info.message:info.toString()//ponelo en un error...
                        return next()//...pero continuá igual, no cortes el programa
                    case 'locals': //Si estoy usando register/login o cualquiera local
                        return res.sendUnauthorized(info.message?info.message:info.toString())//Seguro es porque no esta autenticado

                }
            }
            req.user = user;
            next();
        })(req,res,next); 
    }
}
export const cookieExtractor = (req) =>{
    let token = null;
    if(req&&req.cookies) {
        token = req.cookies['accessToken']
    }
    return token;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;