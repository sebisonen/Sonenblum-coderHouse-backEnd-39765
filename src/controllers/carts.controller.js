import EErrors from '../constants/EErrors.js'
import { cartsErrorOutOfStock } from '../constants/cartsErrors.js'
import ErrorService from '../services/ErrorService.js'
import { cartsRepository, ticketsRepository, productsRepository } from '../services/index.js'
import MailingService from "../services/MailingService.js"
import TemplatesDict from '../constants/dictionaries/TemplatesDict.js'

export const getCarts = async(req,res)=>{//Traigo todo los carts
    try {
        const carts = await cartsRepository.getCarts()
        req.logger.info(JSON.stringify(carts))
        carts?
            res.sendSuccessWithPayload(carts):
            res.sendError("The carts were not found")
        
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
}
export const getCartById =  async (req, res)=>{
    try {
        const id= String(req.params.cid)
        const cart = await cartsRepository.getCartById(id)
        req.logger.info(JSON.stringify(cart))
        cart?
            res.sendSuccessWithPayload(cart):
            res.sendError("The cart was not found")
    
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
    
}
export const createCart = async (req, res)=>{//Creo un nuevo cart para un usuario
    try {
        const cart = req.body
        await cartsRepository.createCart(cart)
        res.sendSuccess("Cart created") 
    }catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
}
export const addToCart = async (req, res)=>{
    try {
        // Variables: Id´s, cart, y bool
        const quantity = Number(req.body.quantity)
        
        const cartId = String(req.params.cid)
        const productId = String(req.params.pid)
        const wasInCart = await cartsRepository.isProductInCart(cartId, productId)
        
        //CHECKING IF HAS STOCK
        const storeProduct = await productsRepository.getProductById(productId)
        if(storeProduct.stock<=0){
            ErrorService.createError({
                name: "Adding to cart error",
                cause: cartsErrorOutOfStock(storeProduct),
                message: "The product couldn't be added to cart, it is out of stock",
                code: EErrors.OUT_OF_STOCK
            })
        }
        
        // Operations
        wasInCart?
            await cartsRepository.modifyQuantity(cartId, productId, quantity):
            await cartsRepository.addToCart(cartId, productId, quantity)

        // RES data
        const cart = await cartsRepository.getCartById(cartId)

        res.status(200).send({status: "Success", message: "Added to cart", cart}) 
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.send({status:"error", error: error.message})
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
        const moreThanStock = quantityToSum > cartElement.product.stock
        const lessThanZero= quantityToSum <= 0
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
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
}
export const deleteCartById = async (req,res)=>{//Elimino un determinado cart segun su ID
    try {
        const cartId = String(req.params.cid)
        await cartsRepository.deleteCart(cartId)
        res.sendSuccess("Cart deleted")
        
    }catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
}
export const deleteFromCart = async(req,res)=>{//Dentro de un cart elimino un producto
    try {
        // Variables: Id´s, cart
        const cartId = String(req.params.cid)
        const productId = String(req.params.pid)            
        const deleted = await cartsRepository.deleteFromCart(cartId, productId)
        
        req.logger.info(JSON.stringify(deleted))
        deleted?
        res.sendSuccess("Removed from cart"):
        req.sendError("Couldn't be removed")
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendServerError()
    }
}

export const purchase = async(req,res)=>{
    try {
        //Cart
        const cartId = req.params.cid
        let cart = await cartsRepository.getCartById(cartId)
        
        //Products from BBDD
        const storeProducts = await productsRepository.getProducts()
        let productsToUpdate = []
        let unavailableProducts = []
        let nonExistentProducts= []
        //Ticket
        let amount = 0
        
    //Operaciones
        //1. Chequeo stock, devuelvo los productos a actualizar y los que no se pudieron comprar
        cart.products.map((cartProduct)=>{
            const storeProduct = storeProducts.find(product=>product._id.toHexString()==cartProduct.product?._id.toHexString())
            const stockAvailability =storeProduct?.stock>=cartProduct.quantity

            if(stockAvailability&&storeProduct){//En el caso en que el producto existe y hay stock

                amount += cartProduct.product.price*cartProduct.quantity
                productsToUpdate.push(
                    {
                        _id: cartProduct.product._id,
                        stock: storeProduct.stock-cartProduct.quantity
                    }
                ) 
            }else if(!stockAvailability&&storeProduct){//El producto existe pero no hay stock
                unavailableProducts.push(cartProduct.product?._id)
            }else{//El producto no está siendo encontrado en la bbdd 
                //Esto solo deberia pasar si se elimina directo desde compass, 
                //Ya que desde el endpoint cuando se borra un prod se elimina de todos los carritos
                nonExistentProducts.push(cartProduct)
            }
        })
    
        //2. Creo el ticket
        const ticket = {
            amount: amount,
            purchaser: req.user.email,
            cart: await cartsRepository.getCartById(req.params.cid)
        }
        const create= await ticketsRepository.createTicket(ticket)

        //3. Mando mail con la compra efectiva
        cart = await cartsRepository.getCartById(req.params.cid)
        const mailingService = new MailingService()
        const result = await mailingService.sendMail(req.user.email, TemplatesDict.PURCHASE, {
            amount: amount,
            purchaser: req.user.name,
            products: cart.products,
            ticket_id: create.id
        })

        //4. Hago update de stock en la BBDD y vacio el cart
        productsToUpdate.forEach(async (product)=>{
            const update = await productsRepository.updateProduct(product._id, {stock: product.stock})
            const cleanCart = await cartsRepository.deleteFromCart(cartId, product._id )
        })
        res.sendSuccessWithPayload({ticket, unavailableProducts})
    } catch (error) {
        req.logger.error(`${req.method} at  ${req.originalUrl} - ${new Date().toLocaleString()} by user ${req.user?req.user.name:"public."}.\n Error: ${error}`)
        res.sendError(error.message)
    }
}


