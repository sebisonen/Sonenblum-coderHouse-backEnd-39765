
//Router
import BaseRouter from './router.js'
//Utils
import { passportCall } from "../../utils.js";
import * as sessionsController from "../controllers/sessions.controller.js"


//1. PASSPORT


export default class SessionsRouter extends BaseRouter{
    init(){
        //Register
        this.post(
            '/register',
            ["NOT_AUTH"],
            passportCall('register', {strategyType:"locals"}),
            sessionsController.register
        )
        //Login
        this.post(
            '/login',
            ["NOT_AUTH"],
            passportCall('login', {strategyType:"locals"}),
            sessionsController.login
        )
        //Logout
        this.post(
            '/logout',
            ["USER", "ADMIN"],
            sessionsController.logout
            )

        //github
        this.get('/github', ["NOT_AUTH"], passportCall('github',{strategyType:"github"}),(req,res)=>{})
        this.get(
            '/githubcallback',
            ["NOT_AUTH"],
            passportCall('github', {strategyType:"github"}),
            sessionsController.githubLogin
            )
    }
}
