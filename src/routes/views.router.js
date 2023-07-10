import { Router } from "express";
import ProductManager from "../dao/managers/mongoDB/ProductManager.js";
import CartsManager from "../dao/managers/mongoDB/CartsManager.js";
import productsModel from "../models/products.model.js"
import { privacy } from "../middlewares/auth.js";
import { passportCall } from "../../utils.js";
import { authRoles } from "../middlewares/auth.js";
const router = Router()
const productManager = new ProductManager()
const cartsManager = new CartsManager()

// router.get('/',privacy("NOT_AUTHENTICATED"), (req,res)=>{
//     try {
//         res.render('login', {css:'login'})
//     } catch (error) {
//         res.render('error', {css:'error'})
//     }
// })



router.get('/', passportCall('jwt',{redirect:'/login'}),authRoles('user'), async (req,res) =>{
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

router.get('/realTimeProducts', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts', {products, css:'realTimeProducts'})
})

router.get('/carts/:cid', async (req,res)=>{

    const cart = await cartsManager.getCartById(req.params.cid)
    const products =cart.products
    res.render('cart',{cart, products})
})

// Login system
router.get('/register',
// privacy("NOT_AUTHENTICATED"),
(req,res)=>{
    
    res
        .clearCookie('accessToken')
            //Borro la cookie por si alguien accede a esta ruta sin haberse deslogueado
        .render('register', {css:'register'})
})
router.get('/login',
// privacy("NOT_AUTHENTICATED"),
 (req,res)=>{
    res
        .clearCookie('accessToken')
            //Borro la cookie por si alguien accede a esta ruta sin haberse deslogueado
        .render('login', {css:'login'})
})

export default router