import BaseRouter from './router.js'
//Manager y models
import * as viewsController from '../controllers/views.controller.js'

export default class ViewsRouter extends BaseRouter{
    init(){
        this.get('/products',["PUBLIC"], viewsController.productsView)
        this.get('/carts/:cid', ["USER"], viewsController.cartsView)
        this.get('/register',["NOT_AUTH"], viewsController.registerView)
        this.get('/login',["NOT_AUTH"], viewsController.loginView)
        this.get('/',["PUBLIC","USER","ADMIN"],(req,res)=>{
            res.redirect('/products')
        })//Si alguien entra por primera vez te lleve a products.
        this.get('/restoreRequest', ["NOT_AUTH"], viewsController.restoreRequest)
        this.get('/restorePassword', ["NOT_AUTH"], viewsController.restorePassword)
    }
}


