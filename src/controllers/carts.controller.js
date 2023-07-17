import {cartsManager} from '../dao/managers/mongoDB/index.js'
export const getCarts = async(req,res)=>{//Traigo todo los carts
    try {
        const carts = await cartsManager.getCarts()
        carts?
            res.sendSuccessWithPayload(carts):
            res.sendError("The cart was not found")
        
    } catch (error) {
        res.sendServerError()
    }
}
export const getCartById =  async (req, res)=>{
    try {
        const id= String(req.params.cid)
        
        const cart = await cartsManager.getCartById(id)
        cart?
            res.sendSuccessWithPayload(cart):
            res.sendError("The cart was not found")
    
    } catch (error) {
        res.sendServerError()
    }
    
}
export const createCart = async (req, res)=>{//Creo un nuevo cart para un usuario
    try {
        const cart = req.body
        await cartsManager.createCart(cart)
        res.sendSuccess("Cart created") 
    }catch (error) {
        res.sendServerError()
    }
}
export const addToCart = async (req, res)=>{
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
        res.sendServerError()
    }
}
export const modifyProductQuantity =async (req, res)=>{
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
        res.sendSuccess(message)
    } catch (error) {
        res.sendServerError()
    }
}
export const deleteCartById = async (req,res)=>{//Elimino un determinado cart segun su ID
    try {
        const cartId = String(req.params.cid)
        await cartsManager.deleteCart(cartId)
        res.sendSuccess("Cart deleted")
        
    }catch (error) {
        res.sendServerError()
    }
}
export const deleteFromCart = async(req,res)=>{//Dentro de un cart elimino un producto
            try {
                // Variables: Id´s, cart
                const cartId = String(req.params.cid)
                const productId = String(req.params.pid)            
                const deleted = await cartsManager.deleteFromCart(cartId, productId)
                res.sendSuccess("Removed from cart")
            } catch (error) {
                res.sendServerError()
            }
        }