//Utils
import jwt from 'jsonwebtoken'
import { createHash, generateToken, validatePassword } from "../../utils.js"
import TemplatesDict from "../constants/dictionaries/TemplatesDict.js"
import RestoreTokenDTO from "../dto/users/restoreTokenDTO.js"
import { loginDTO, registerDTO } from "../dto/users/usersDTO.js"
import { usersRepository } from "../services/index.js"
import MailingService from "../services/MailingService.js"
import config from '../config.js'


export const register = async (req,res)=>{
    const mailingService = new MailingService() 
    try {
        let user =req.user
        const result = await mailingService.sendMail(user.email, TemplatesDict.WELCOME, registerDTO.getFrom(user))
        res.sendSuccess("Registered")
        
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)

        res.sendError(error)
    }    
}
export const login = (req,res)=>{
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
            .sendSuccessWithPayload({payload: user} )
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)

        res.sendError(error.message)
    }
}

export const logout = (req,res)=>{
    try {
        res.clearCookie('accessToken').status(200).redirect('/')
        //El redirect tiene que estar en public
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)

        res.sendError(error)
    }
}
export const githubLogin= (req,res)=>{
    try {
        //1.Accedo al user
    const user = loginDTO.getFrom(req.user)
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
            //El redirect hacerlo en public
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)

        res.sendError(error)
    }
    
}
export const restoreRequest = async (req,res)=>{
    try {
       const {email} = req.body  
        if(!email)return res.sendError("Email field is empty")
        const user = await usersRepository.getUserByEmail(email)
        if(!user)return res.sendError("Not a valid email")
        const restoreToken = generateToken(RestoreTokenDTO.getFrom(user))
        const mailingService = new MailingService()
        const result = await mailingService.sendMail(email, TemplatesDict.RESTORE, {restoreToken})
        res.sendSuccess() 
    } catch (error) {
        res.sendServerError()
    }
    
}

export const restorePassword = async (req,res)=>{
    try {
        const {password,token}=req.body
        //1.Desencripto el token para conseguir al user
        const userToken = jwt.verify(token, config.app.JWT_SECRET)
        const user = await usersRepository.getUserByEmail(userToken.email)
        //2.Chequeo que la contraseña no sea igual a la previa
        const isPasswordDuplicate = await validatePassword(password, user.password)
        if(isPasswordDuplicate)return res.sendBadRequest({message:'La contraseña es igual a la anterior'})
        const newHashedPassword = await createHash(password)
        const update = await usersRepository.update(user._id, {password: newHashedPassword})
        update?
        res.sendSuccess():
        res.sendServerError()
    } catch (error) {
        res.sendServerError()
    }
}