import productsModel from "../dao/mongoDB/models/products.model.js";
import { cartsRepository } from "../services/index.js";

export const productsView = async (req,res) =>{
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
}
export const cartsView = async (req,res)=>{
    try {
        const cart = await cartsRepository.getCartById(req.params.cid)
        const products =cart.products
        res.render('cart',{cart, products, css:'cart'})
    } catch (error) {
        res.render('error')
    }
}
export const registerView = (req,res)=>{
    try {
        res
        .clearCookie('accessToken')
            //Borro la cookie por si alguien accede a esta ruta sin haberse deslogueado
        .render('register', {css:'register'})
    } catch (error) {
        res.render('error')
    }
}
export const loginView = (req,res)=>{
    try {
        res
        .clearCookie('accessToken')
            //Borro la cookie por si alguien accede a esta ruta sin haberse deslogueado
        .render('login', {css:'login'})
    } catch (error) {
        res.render('error')
    }
    
}