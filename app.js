import ProductManager from './managers/ProductManager.js'
import express from 'express'
const app = express()
const productManager = new ProductManager('./files/products.json')
app.get('/products', async (req,res)=>{
    const products = await productManager.getProducts()
    const limit = req.query.limit
    const listedProducts = products.slice(0, limit)
    res.send(limit==0?products:listedProducts)
})
app.get('/products/:pid', async(req, res)=>{
    const product = await productManager.getProductById(Number(req.params.pid))
    res.send(product)
})

app.listen(8080, ()=>console.log(`Listening on port 8080`))





