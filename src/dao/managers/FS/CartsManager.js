import fs from 'fs';
import ProductManager from './ProductManager.js';
const productManager =  new ProductManager('./files/products.json')

export default class CartsManager {
    
    constructor(path){
        this.path = path
        this.carts =[]
    }
    async getCarts(){
        try {
            // Busco del file el array y lo almaceno en la variable products propia de la clase
            const data = await fs.promises.readFile(this.path,'utf-8')
            const carts = JSON.parse(data)
            this.carts = carts
            return this.carts
        } catch (error) {
           return this.carts
        }
    }
    async getCartById(id){
        const carts = await this.getCarts()
        const cart = carts.find((cart)=>cart.id ==id)
        return cart
    }
    async createCart(){
        try {
            const carts = await this.getCarts()
            // Creo mi cart
            const cart = {products: []}

            // Creo el id
            carts.length===0?cart.id=1:cart.id = carts[carts.length-1].id+1

            // Lo sumo a mi array de carts
            carts.push(cart)

            // Lo subo a mi BBDD
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
            return cart
        } catch (error) {
            console.log(error)
        }
        
    }
    async addToCart(cartId, productId){
        try {
            const carts = await this.getCarts()
            const gettedCart = await this.getCartById(cartId)
            const cartIndex = carts.findIndex((cart) => cart.id==cartId)
            const gettedProduct= await productManager.getProductById(productId)
            // VALIDACIONES
            // Existe el cart?
            if(!gettedCart)return {error: true, message:"This cart does not exist"} 
            
            // Existe el product?
            if(!gettedProduct)return {error: true, message: "This product does not exist"}
           
            // Ese producto ya está en el cart?
            const existingProduct = gettedCart.products.find((product)=>product.product===productId)
            if(existingProduct){
                const productIndex = gettedCart.products.findIndex((product)=>product.product==productId)
                existingProduct.quantity += 1
                carts[cartIndex].products[productIndex]=existingProduct
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                return {error: false, message: "Quantity incremented succesfully"}
            }else{
                gettedCart.products.push({product: productId, quantity:1})
                carts[cartIndex]= gettedCart
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                return {error: false, message: "Product added succesfully"}
            }
        } catch (error) {
            console.log(error)
        }
    }
}