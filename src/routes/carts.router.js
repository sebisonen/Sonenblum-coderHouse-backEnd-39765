import BaseRouter from "./router.js";
import * as cartsController from '../controllers/carts.controller.js'

export default class CartsRouter extends BaseRouter{
    init(){
        this.get('/', ["USER", "ADMIN"], cartsController.getCarts )
        this.get('/:cid', ["USER", "ADMIN"], cartsController.getCartById)
        this.post('/', ["USER"], cartsController.createCart)
        this.post('/:cid/products/:pid',["USER"], cartsController.addToCart)
        this.put('/:cid/products/:pid', ["USER"], cartsController.modifyProductQuantity)
        this.delete('/:cid', ["USER"], cartsController.deleteCartById)
        this.delete('/:cid/products/:pid',["USER"], cartsController.deleteFromCart)
        
        this.post('/:cid/purchase', ["USER"], cartsController.purchase)
    }
}
