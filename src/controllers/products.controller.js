import { productsRepository } from "../services/index.js";

export const getProducts = async (req,res)=>{
    try {
        let products = await productsRepository.getProducts()
        const limit = req.query.limit
        const listedProducts = products.slice(0, limit)
        res.sendSuccessWithPayload(limit==0?products:listedProducts)
    } catch (error) {
        res.sendServerError()
    }
}

export const getProductById = async (req,res)=>{
    try {
        const id = String(req.params.pid)
        const product = await productsRepository.getProductById(id)
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
      const adding = await productsRepository.addProduct(product)
      adding?
      res.sendSuccess("Product added succesfully"):
      res.sendError("Product couldn't be added")
      
    } catch (error) {
        res.sendError(error.message)
    }
}
export const modifyProductById = async (req, res) =>{
    try {
        const fields= req.body;
        const id= String(req.params.pid)
        const updating = await productsRepository.updateProduct(id, fields)
        updating?
        res.sendSuccess("Product updated succesfully"):
        res.sendError("Product couldn't be updated")
    } catch (error) {
        res.sendServerError()
    } 
}
export const deleteProductById = async (req, res) =>{
    try {
      const id=String(req.params.pid)
      const deleted= await productsRepository.deleteProduct(id)
      deleted?
      res.sendSuccess("Product deleted succesfully"):
      res.sendError("Prouduct couldn't be deleted")
    } catch (error) {
        res.sendServerError()
    }
  }