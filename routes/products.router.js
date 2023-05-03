import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
const router = Router();
const productManager = new ProductManager('./files/products.json')

const products = await productManager.getProducts()


// Configuro el endpoint
router.get("/", (req, res) => {
  try{
    const limit = req.query.limit
    const listedProducts = products.slice(0, limit)
    res.send(limit==0?products:listedProducts)
  }catch{
    res.status(500).send({status:"error", message:"Server error. Get in touch with the developer"})
  }
});

router.get('/:pid',async (req, res)=>{
  try {
    const product = await productManager.getProductById(Number(req.params.pid))
    product?
      res.status(200).send({status: "success", product}):
      res.status(400).send({status: "error", message:"The product was not found"})
      
  } catch (error) {
      res.status(500).send(error)
  }
})

router.post("/", async (req, res) => { 
  const product= req.body ;
  const adding = await productManager.addProduct(product)
  const products = await productManager.getProducts()
  req.io.emit('products', products)
  adding.error?
  res.status(400).send({status:"error", message: adding.message}):
  res.status(200).send({status:"success", message: adding.message})
})

router.put("/:pid", async (req, res) =>{
  const fields= req.body;
  const id=Number(req.params.pid)
  const updating = await productManager.updateProduct(id, fields)
  updating.error?
  res.status(400).send({status:"error", message: updating.message}):
  res.status(200).send({status:"success", message: updating.message})

})
router.delete("/:pid", async (req, res) =>{
  const id=Number(req.params.pid)
  const deleted= await productManager.deleteProduct(id)
  const products = await productManager.getProducts()
  req.io.emit('products', products)
  deleted.error?
  res.status(400).send({status:"error", message: deleted.message}):
  res.status(200).send({status:"success", message: deleted.message})
})

export default router;