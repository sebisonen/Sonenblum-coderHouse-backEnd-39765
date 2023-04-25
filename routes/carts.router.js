import CartsManager from '../managers/CartsManager.js'
import { Router } from 'express'
const router = Router()
const cartsManager = new CartsManager(('./files/carts.json'))

const carts = await cartsManager.getCarts()

router.get('/:cid', async (req, res)=>{
    try {
        const id= Number(req.params.cid)
        const cart = await cartsManager.getCartById(id)
        cart?
            res.status(200).send(cart):
            res.status(400).send({status: "error", message:"The cart was not found"})
      
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer."})
    }
    
})
router.post('/', async (req, res)=>{
    try {
        const cart= await cartsManager.createCart()
        res.status(200).send({status: "Success", message:"Cart created", cart}) 
    }catch (error) {
            res.status(500).send({status: "error", message: "Server error. Get in touch with the developer."})
        
    }
    
})
router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const cartId = Number(req.params.cid)
        const productId = Number(req.params.pid)
        const added = await cartsManager.addToCart(cartId, productId)
        added.error?
            res.status(400).send({status: "error", message: added.message}):
            res.status(200).send({status: "Success", message: added.message}) 
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer."})
    }
    
})

export default router
