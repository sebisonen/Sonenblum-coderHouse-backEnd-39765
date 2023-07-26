import { cartsRepository, ticketsRepository, productsRepository } from '../services/index.js'

export const getCarts = async(req,res)=>{//Traigo todo los carts
    try {
        const carts = await cartsRepository.getCarts()
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
        
        const cart = await cartsRepository.getCartById(id)
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
        await cartsRepository.createCart(cart)
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
        const wasInCart = await cartsRepository.isProductInCart(cartId, productId)
        // Operations
        wasInCart?
            await cartsRepository.modifyQuantity(cartId, productId, 1):
            await cartsRepository.addToCart(cartId, productId)

        // RES data
        const cart = await cartsRepository.getCartById(cartId)

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
        let cart = await cartsRepository.getCartById(cartId)
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
                modify= await cartsRepository.modifyQuantity(cartId, productId, runOutOfStock):
                // Borro el producto, no quiero tener nada con 0 quantity
                modify= await cartsRepository.deleteFromCart(cartId, productId)
        }else{
            // Modifico normalmente la cantidad
            modify = await cartsRepository.modifyQuantity(cartId, productId, quantityToSum)
        }
    
        // RES data
        let message
            //Actualizo el cart y cartElement luego de haber cambiado las cantidades
        cart = await cartsRepository.getCartById(cartId)
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
        await cartsRepository.deleteCart(cartId)
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
        const deleted = await cartsRepository.deleteFromCart(cartId, productId)
        res.sendSuccess("Removed from cart")
    } catch (error) {
        res.sendServerError()
    }
}



// Testing del purchase
//En el controler se hacen tambien validaciones de todo tipo

export const purchase = async(req,res)=>{
    try {
        //Cart
        const cartId = req.params.cid
        const cart = await cartsRepository.getCartById(cartId)
        
        //Products from BBDD
        const storeProducts = await productsRepository.getProducts()
        let productsToUpdate = []
        let unavailableProducts = []

        //Ticket
        let amount = 0
    //Operaciones
        //1. Chequeo stock, devuelvo los productos a actualizar y los que no se pudieron comprar
        cart.products.map((cartProduct)=>{
            const storeProduct = storeProducts.find(product=>product._id.toHexString()==cartProduct.product._id.toHexString())
            const stockAvailability =storeProduct.stock>=cartProduct.quantity
            if (stockAvailability){
                amount += cartProduct.product.price*cartProduct.quantity
                productsToUpdate.push(
                    {
                        _id: cartProduct.product._id,
                        stock: storeProduct.stock-cartProduct.quantity
                    }
                ) 
            }else{
                unavailableProducts.push(cartProduct.product._id)
            }
        })
        //2. Creo el ticket
        const ticket = {
            amount: amount,
            purchaser: req.user.email,
            cart: req.params.cid
        }
        const create= await ticketsRepository.createTicket(ticket)

        //3. Hago update de stock en la BBDD y vacio el cart
        productsToUpdate.forEach(async (product)=>{
            const update = await productsRepository.updateProduct(product._id, {stock: product.stock})
            const cleanCart = await cartsRepository.deleteFromCart(cartId, product._id )
        })
        res.send({message: "ticket-endpoint", payload: ticket, unavailableProducts})
    } catch (error) {
        res.sendError(error.message)
    }
}


