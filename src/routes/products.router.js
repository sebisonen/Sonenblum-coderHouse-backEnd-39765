import BaseRouter from "./router.js";
import * as productsController from '../controllers/products.controller.js'

export default class ProductsRouter extends BaseRouter{
    init(){
        this.get('/',["PUBLIC"], productsController.getProducts)
        this.get('/:pid',["PUBLIC"], productsController.getProductById)
        this.post("/",["ADMIN"], productsController.addProduct )
        this.put("/:pid",["ADMIN"], productsController.modifyProductById)
        this.delete("/:pid", ["ADMIN"], productsController.deleteProductById)

    }
}