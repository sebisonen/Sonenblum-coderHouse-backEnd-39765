export default class CartsRepository{
    constructor(dao){
        this.dao = dao
    }
    getCarts = () =>{
        return this.dao.getCarts()
    }
    getCartById = (id) =>{
        return this.dao.getCartById(id)
    }
    createCart = (cart) => {
        return this.dao.createCart(cart)
    }
    createCart = (cart) =>{
        return this.dao.createCart(cart)
    }
    addToCart = (cartId, productId)=>{
        return this.dao.addToCart(cartId, productId)
    }
    deleteCart = (cartId) =>{
        return this.dao.deleteCart(cartId)
    }
    deleteFromCart = (cartId, productId)=>{
        return this.dao.deleteFromCart(cartId, productId)
    }
    modifyQuantity = (cartId, productId, quantity) =>{
        return this.dao.modifyQuantity(cartId, productId, quantity)
    }
    isProductInCart = (cartId,productId)=>{
        return this.dao.isProductInCart(cartId,productId)
    }
}