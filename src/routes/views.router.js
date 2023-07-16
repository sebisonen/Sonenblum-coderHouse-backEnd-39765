import BaseRouter from './router.js'
//Manager y models
import {cartsManager} from "../dao/managers/mongoDB/index.js";
import productsModel from "../models/products.model.js"
//Utils

export default class ViewsRouter extends BaseRouter{
    init(){

    this.get('/',["PUBLIC","USER","ADMIN"],(req,res)=>{
        res.redirect('/products')
    })  
        this.get('/products',["PUBLIC"],async (req,res) =>{
            try {
                const{page=1, limit=10, sort,...queries}=req.query
                const user = req.user
            // Creo un tamplate de URL para mandar a handlebars y lograr que la query persista con el paginate (en el reload se perdía)
                let queryUrl=""
                for (let key in queries){
                    queryUrl+=`&${key}=${queries[key]}`
                }
            // Si no es obligatorio no hago un sort de los prods
                let sortedIsRequested 
                sort?
                    sortedIsRequested={price:sort}:
                    sortedIsRequested={}
                const {docs, hasPrevPage, hasNextPage, prevPage,nextPage, ...rest} =
                 await productsModel.paginate(queries,{page, limit, sort: sortedIsRequested,lean: true })
                const products = docs
                // Renders
                rest.totalDocs==0||page>rest.totalPages?
                res.render('error', {css: 'error'}):
                res.render('products', {user: req.user, products, queryUrl, page: rest.page, hasPrevPage, hasNextPage, prevPage,nextPage,limit, css:'home'})
            } catch (error) {
                res.render('error')
            }
        })
        this.get('/carts/:cid', ["USER"],async (req,res)=>{
        
            const cart = await cartsManager.getCartById(req.params.cid)
            const products =cart.products
            res.render('cart',{cart, products})
        })
        // Login system
        this.get('/register',["NOT_AUTH"],(req,res)=>{
            
            res
                .clearCookie('accessToken')
                    //Borro la cookie por si alguien accede a esta ruta sin haberse deslogueado
                .render('register', {css:'register'})
        })
        this.get('/login',["NOT_AUTH"],(req,res)=>{
            res
                .clearCookie('accessToken')
                    //Borro la cookie por si alguien accede a esta ruta sin haberse deslogueado
                .render('login', {css:'login'})
        })
    }
}


