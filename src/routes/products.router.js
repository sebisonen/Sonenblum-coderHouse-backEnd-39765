import { Router } from "express";
import ProductManager from "../dao/managers/mongoDB/ProductManager.js"

// Mongoose
  const productManager = new ProductManager()

// Router
  const router = Router();

// FS
  // // import ProductManager from "../managers/FS/ProductManager.js";
  // const productManager = new ProductManager('./files/products.json')
// Configuro el endpoint

router.get("/", async (req, res) => {
  try{
    let products = await productManager.getProducts()
    const limit = req.query.limit
    console.log(limit)
    const listedProducts = products.slice(0, limit)
    res.send(limit==0?products:listedProducts)
  }catch{
    res.status(500).send({status:"error", message:"Server error. Get in touch with the developer"})
  }
});

router.get('/:pid',async (req, res)=>{
  try {
    const id = String(req.params.pid)
    const product = await productManager.getProductById(id)
    product?
      res.status(200).send({status: "success", payload: product}):
      res.status(400).send({status: "error", message:"The product was not found"})
      
  } catch (error) {
      res.status(500).send({status:"error", message: error.message})
  }
})

router.post("/", async (req, res) => { 
  try {
    const product= req.body;
    const adding = await productManager.addProduct(product)
    console.log(adding)
    const products = await productManager.getProducts()
    req.io.emit('products', products)
    res.status(200).send({status:"success", message: "Product added succesfully"})
  } catch (error) {
    res.status(400).send({status:"error", message: error.message, error: error})    
  }
})

router.put("/:pid", async (req, res) =>{
  try {
    const fields= req.body;
    const id= String(req.params.pid)
    const updating = await productManager.updateProduct(id, fields)
    res.status(200).send({status:"success", payload: updating, message: "Updated succesfully"})
  } catch (error) {
    res.status(400).send({status:"error", message: "Couldn't be updated"})
  } 
})

router.delete("/:pid", async (req, res) =>{
  try {
    const id=String(req.params.pid)
    const deleted= await productManager.deleteProduct(id)
    const products = await productManager.getProducts()
    req.io.emit('products', products)
    res.status(200).send({status:"success", message: "Product deleted"})
  } catch (error) {
    res.status(400).send({status:"error", message: "Couldn't be deleted"})
  }
})

export default router;