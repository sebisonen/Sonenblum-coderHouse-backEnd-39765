import jwt  from "jsonwebtoken";

export const authToken =(req, res, next)=>{
    //1. Busco el token en los header
    const authHeader = req.headers.authorization

    //2. Si no hay header con autorizacion hay error
    if(!authHeader)res.status(401).send({status:"Error", error:"Not authenticated"})

    //3. Extraigo el token del header
    const token = authHeader.split(" ")[1]

    //4. Es valido el token?
    jwt.verify(token, "jwtSecret",(error,credentials)=>{
        //Si hay error
        if(error)return res.status(401).send({error:"Invalid token"})
        //Si no hay error. Mando en req a user (esto lo hacia antes con session)
        req.user = credentials.user
        //Termino el proceso
        next()
    })

}