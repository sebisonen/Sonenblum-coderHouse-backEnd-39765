import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
const router = Router()
const productManager = new ProductManager('./files/products.json')

router.get('/', async (req,res) =>{
    const products = await productManager.getProducts()
    // console.log(products)
    res.render('home', {products, css:'home'})
})
router.get('/realTimeProducts', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts', {products, css:'realTimeProducts'})
})
export default router