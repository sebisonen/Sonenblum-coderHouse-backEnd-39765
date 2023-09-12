import EErrors  from "../constants/EErrors.js";
import { productsErrorIncompleteValues } from "../constants/productsErrors.js";
import ErrorService from "../services/ErrorService.js";
import { productsRepository } from "../services/index.js";

export const getProducts = async (req,res)=>{
    try {
        let products = await productsRepository.getProducts()
        const limit = req.query.limit
        const listedProducts = products.slice(0, limit)
        req.logger.info(`Products: ${
            limit==0?
                JSON.stringify(products, null, 1):
                JSON.stringify(listedProducts, null, 1)
        }`)
        res.sendSuccessWithPayload(limit==0?products:listedProducts)
    } catch (error) {
        req.logger.info(JSON.stringify(error))
        res.sendServerError()
    }
}

export const getProductById = async (req,res)=>{
    try {
        const id = String(req.params.pid)
        const product = await productsRepository.getProductById(id)
        req.logger.info(JSON.stringify(product))
        product?
            res.sendSuccessWithPayload(product):
            res.sendError("The product was not found")
    } catch (error) {
        res.sendServerError()
    }
}
export const addProduct = async (req, res) => { 
    try {
      const product= req.body;
      if(!product.title||!product.price||!product.stock){  
        ErrorService.createError({
            name:"Product creation error",
            cause: productsErrorIncompleteValues(product),
            message: "Error adding new product",
            code: EErrors.INCOMPLETE_VALUES
        })
      }
      const adding = await productsRepository.addProduct(product)
      req.logger.info(JSON.stringify(adding))
      adding?
      res.sendSuccess("Product added succesfully"):
      res.sendError("Product couldn't be added")

    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.send({status:"error", error: error.message})
        
    }
}
export const modifyProductById = async (req, res) =>{
    try {
        const fields= req.body;
        const id= String(req.params.pid)
        const updating = await productsRepository.updateProduct(id, fields)
        req.logger.info(JSON.stringify(updating))
        updating?
        res.sendSuccess("Product updated succesfully"):
        res.sendError("Product couldn't be updated")
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    } 
}
export const deleteProductById = async (req, res) =>{
    try {
      const id=String(req.params.pid)
      const deleted= await productsRepository.deleteProduct(id)
      req.logger.info(JSON.stringify(deleted))
      deleted?
      res.sendSuccess("Product deleted succesfully"):
      res.sendError("Prouduct couldn't be deleted")
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
  }
  