import {fileURLToPath} from 'url';
import { dirname } from 'path'; //=> Toma una referencia absoluta de donde yo tenga guardado todo
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';

export const generateToken =(user)=>{
    const token = jwt.sign(user, 'jwtSecret',{expiresIn:'24h'})
    //IMPORTANTE: EN ESTA LINEA SACAR USER DE {} PONER USER SOLO DEPENDE SI USO JWT O NO
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
            //Params del callback de authenticate son iguales a los que ejecuta done
            //Xej done(null,false,{message:"contraseña invalida"})
            if(error) return next(error);
            if(!user) {
                if(options.redirect) return res.redirect(options.redirect);
                return res.status(401).send({status:"error",error:info.message?info.message:info.toString()})
            }
            req.user = user;
            next();
        })(req,res,next); //Esto no entendi
    }
}
export const cookieExtractor = (req) =>{
    let token = null; //Aquí va a venir el token... Si lo encuentra
    if(req&&req.cookies) {
        token = req.cookies['accessToken']
    }
    return token;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;