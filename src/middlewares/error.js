import EErrors  from "../constants/EErrors.js";

const errorHandler = (error, req, res, next)=>{//Este middleware va a hacer que no se caiga el server frente a un error, lo coloco en app
    console.log(error)
    res.send({message: error.message, error})
}
//A ESTE MIDDLEWARE NO ESTÁ LLEGANDO NO SE POR QUË
export default errorHandler