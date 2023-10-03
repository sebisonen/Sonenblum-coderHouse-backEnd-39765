import {Router} from "express"
import {passportCall} from '../../utils.js'
import attachLogger from "../middlewares/logger.js"
    export default class BaseRouter{
        constructor(){
            this.router = Router()
            this.init()
        }
        getRouter(){ 
            return this.router
        }
        init(){} 
        get(path, policies, ...callbacks){
            this.router.get(
                path,
                attachLogger,
                this.generateCustomResponses,
                passportCall('jwt', {strategyType:'jwt'}),
                this.handlePolicies(policies),
                this.applyCallbacks(callbacks)
            )
        }
        post(path,policies, ...callbacks){
            this.router.post(
                path,
                attachLogger,
                this.generateCustomResponses,
                passportCall('jwt', {strategyType:'jwt'}),
                this.handlePolicies(policies),
                this.applyCallbacks(callbacks)
            )
        }
        put(path,policies, ...callbacks){
            this.router.put(
                path,
                attachLogger,
                this.generateCustomResponses,
                passportCall('jwt', {strategyType:'jwt'}),
                this.handlePolicies(policies),
                this.applyCallbacks(callbacks)
                )
        }
        delete(path, policies, ...callbacks){
            this.router.delete(
                path,
                attachLogger,
                this.generateCustomResponses,
                passportCall('jwt', {strategyType:'jwt'}),
                this.handlePolicies(policies),
                this.applyCallbacks(callbacks)
            )
        }        
        generateCustomResponses = (req,res,next)=>{
            res.sendSuccess = message => res.status(200).send({status: "success", message})
            res.sendSuccessWithPayload = payload =>res.status(200).send({status: "success", payload})
            res.sendError= message=>res.status(400).send({status: "error", message})
            res.sendServerError = error=> res.status(500).send({status:"error", message:"Internal server error.", error})
            res.sendBadRequest = error=> res.status(400).send({status:"error", error, message: error?.message})
            res.sendUnauthorized= error=>res.status(401).send({status:"error", error})
            res.sendForbidden = error => res.status(403).send({status:"error", error})
            next()
        }
       handlePolicies=policies=>{
            return (req,res,next)=>{
                
                if(policies[0]==="PUBLIC")return next()
                //A esta altura ya tengo el usuario desde passportCall()
                const user = req.user 
                //Si pedí que no estuviese autenticado pero ya está autenticado
                if(policies[0]==="NOT_AUTH"&&user)return res.status(401).send({status:"error", message:"Unauthorized"})
                //Si pedí que no estuviese y efectivamente no está autenticado
                if(policies[0]==="NOT_AUTH"&&!user)return next()
                //A partir de acá tenés que estar autenticado si o si
                if(!user)return res.status(401).send({status:"error", message:req.error})//Si llegó acá seguro es por JWT(por eso req.error: return en case 'locals')
                //Si no coincide tu rol con la policie
                if(!policies.includes(user.role.toUpperCase()))return res.status(403).send({status: "error", message:"Forbbiden"})
                next()
            }
       }
        applyCallbacks(callbacks){
            return callbacks.map(callback=>async(...params)=>{
                try{
                    await callback.apply(this, params)
                }catch(error){
                    params[1].status(500).send(error)
                }
            })
        }
    }