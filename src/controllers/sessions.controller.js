//Utils
import { generateToken } from "../../utils.js"


export const register = async (req,res)=>{
    try {
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
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        cartId: req.user.cartId
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
            //El redirect hacerlo en public
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)

        res.sendError(error)
    }
    
}