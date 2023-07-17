import {productManager} from "../dao/managers/mongoDB/index.js";

export const getProducts = async (req,res)=>{
    try {
        let products = await productManager.getProducts()
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
        const product = await productManager.getProductById(id)
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
      const adding = await productManager.addProduct(product)
      res.sendSuccess("Product added succesfully")
      
    } catch (error) {
        res.sendServerError()
    }
}
export const modifyProductById = async (req, res) =>{
    try {
        const fields= req.body;
        const id= String(req.params.pid)
        const updating = await productManager.updateProduct(id, fields)
        res.sendSuccess("Product updated succesfully")
    } catch (error) {
        res.sendServerError()
    } 
}
export const deleteProductById = async (req, res) =>{
    try {
      const id=String(req.params.pid)
      const deleted= await productManager.deleteProduct(id)
      res.sendSuccess("Product deleted succesfully")
    } catch (error) {
        res.sendServerError()
    }
  }