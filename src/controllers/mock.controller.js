import { generateProduct } from "../mocks/products.mock.js";

export const mockProducts = (req,res)=>{
    try {
        let users =[]
        for (let i=0; i < 50; i++ ){
             users.push(generateProduct())
        }
        res.send({status:"success", payload: users})
    } catch (error) {
        res.status(500).send({status:"error", message: error.message})
    }
}
export const loggerTest = (req,res )=>{
    const logger = req.logger
    logger.debug(`${req.method} at  ${req.url} - ${new Date().toLocaleString()} by user ${req.user?req.user:"public"}`)
    logger.http(`${req.method} at  ${req.url} - ${new Date().toLocaleString()} by user ${req.user?req.user:"public"}`)
    logger.info(`${req.method} at  ${req.url} - ${new Date().toLocaleString()} by user ${req.user?req.user:"public"}`)
    logger.warning(`${req.method} at  ${req.url} - ${new Date().toLocaleString()} by user ${req.user?req.user:"public"}`)
    logger.error(`${req.method} at  ${req.url} - ${new Date().toLocaleString()} by user ${req.user?req.user:"public"}`)
    logger.fatal(`${req.method} at  ${req.url} - ${new Date().toLocaleString()} by user ${req.user?req.user:"public"}`)
    res.sendStatus(200)
}