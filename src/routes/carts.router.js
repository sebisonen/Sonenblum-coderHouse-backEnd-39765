import CartsManager from '../dao/managers/mongoDB/CartsManager.js'
import { Router } from 'express'
import cartsModel from '../models/carts.model.js'
const router = Router()
const cartsManager = new CartsManager()

//Traigo todo los carts
router.get('/',async(req,res)=>{
    try {
        const carts = await cartsManager.getCarts()
        carts?
            res.status(200).send(carts):
            res.status(400).send({status: "error", message:"The cart was not found"})
      
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer."})
    }
})
//Traigo un cart determinado segun el ID
router.get('/:cid', async (req, res)=>{
    try {
        const id= String(req.params.cid)
        const cart = await cartsManager.getCartById(id)
        cart?
            res.status(200).send(cart):
            res.status(400).send({status: "error", message:"The cart was not found"})
      
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer."})
    }
    
})
router.post('/', async (req, res)=>{//Creo un nuevo cart para un usuario
    try {
        const cart = req.body
       await cartsManager.createCart(cart)
        res.status(200).send({status: "Success", message:"Cart created", cart}) 
    }catch (error) {
            res.status(500).send({status: "error", message: "Server error. Get in touch with the developer."})
        
    }
})

router.post('/:cid/products/:pid', async (req, res)=>{//Agrego un prod al cart
    try {
        // Variables: Id´s, cart, y bool
        const cartId = String(req.params.cid)
        const productId = String(req.params.pid)
        const wasInCart = await cartsManager.isProductInCart(cartId, productId)
        // Operations
        wasInCart?
            await cartsManager.modifyQuantity(cartId, productId, 1):
            await cartsManager.addToCart(cartId, productId)

        // RES data
        const cart = await cartsManager.getCartById(cartId)

        res.status(200).send({status: "Success", message: wasInCart?"One more product was added":"Added to cart", cart}) 
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer.", error: error})
    }
    
})
router.put('/:cid/products/:pid',async (req, res)=>{//Modifico la cantidad de un producto dentro del cart
    try {
        // REQ data
        const quantityToSum = req.body.quantity
        const cartId = String(req.params.cid)
        const productId = String(req.params.pid)
        let cart = await cartsManager.getCartById(cartId)
        let cartElement = cart.products.find(el=>el.product._id.toString()===productId)
        
        // Validation criteria
        const moreThanStock = cartElement.quantity + quantityToSum > cartElement.product.stock
        const lessThanZero= cartElement.quantity + quantityToSum <= 0
        
        // Operations
        let modify
        if(moreThanStock||lessThanZero){
            const runOutOfStock = cartElement.product.stock-cartElement.quantity
            moreThanStock?
                // Agrego al cart, pero hasta llegar al valor del stock
                modify= await cartsManager.modifyQuantity(cartId, productId, runOutOfStock):
                // Borro el producto, no quiero tener nada con 0 quantity
                modify= await cartsManager.deleteFromCart(cartId, productId)
        }else{
            // Modifico normalmente la cantidad
            modify = await cartsManager.modifyQuantity(cartId, productId, quantityToSum)
        }
       
        // RES data
        let message
            //Actualizo el cart y cartElement luego de haber cambiado las cantidades
        cart = await cartsManager.getCartById(cartId)
        cartElement = cart.products.find(el=>el.product._id.toString()===productId)||0
            //Mensajes
        cartElement==0?
            message= "Product removed from cart":
            message=`Product amount set to ${cartElement.quantity}`

        res.status(200).send({status: "Success", message, cart, modify}) 
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer.", error})
    }
})
router.delete('/:cid', async (req,res)=>{
    try {
        const cartId = String(req.params.cid)
        await cartsManager.deleteCart(cartId)
        res.status(200).send({status: "Success", message: "Cart deleted"}) 
    }catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer.", error: error})
    }
})
router.delete('/:cid/products/:pid', async(req,res)=>{
    try {
        // Variables: Id´s, cart
        const cartId = String(req.params.cid)
        const productId = String(req.params.pid)
        const cart = await cartsManager.getCartById(cartId)


        await cartsModel.updateOne({_id: cartId}, {$pull: {products:{product: {_id: productId}}}})
        
        res.status(200).send({status: "Success", message: "Removed from cart", cart}) 
    } catch (error) {
        res.status(500).send({status: "error", message: "Server error. Get in touch with the developer.", error: error})
    }
})
export default router
