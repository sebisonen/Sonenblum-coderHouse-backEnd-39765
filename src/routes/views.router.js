import { Router } from "express";
import ProductManager from "../dao/managers/mongoDB/ProductManager.js";
import CartsManager from "../dao/managers/mongoDB/CartsManager.js";
import productsModel from "../models/products.model.js"

const router = Router()
const productManager = new ProductManager()
const cartsManager = new CartsManager()

router.get('/', (req,res)=>{
    try {
        res.render('home', {css:'home'})
    } catch (error) {
        res.render('error', {css:'error'})
    }
})
router.get('/products', async (req,res) =>{
    try {
        const{page=1, limit=10, sort,...queries}=req.query
        const user = req.session.user

    // Creo un tamplate de URL para mandar a handlebars y lograr que la query persista con el paginate (en el reload se perdia)
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
        res.render('products', {user, products, queryUrl, page: rest.page, hasPrevPage, hasNextPage, prevPage,nextPage,limit, css:'home'})
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
router.get('/register',(req,res)=>{
    res.render('register')
})
router.get('/login', (req,res)=>{
    res.render('login')
})


export default router