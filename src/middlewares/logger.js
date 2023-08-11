//En logger.js
import LoggerService from "../services/LoggerService.js"
import config from "../config.js"

const loggerService = new LoggerService(config.env)
    //Aca dijo mauri que no iba a hacer todo lo de las variables de entorno, deberíamos incorporarlo nosotros?

const attachLogger = (req,res,next)=>{ //Este middleware permite pasarlo a todos lados el logger a través de req.
    req.logger= loggerService.initialize
    next()
}

export default attachLogger