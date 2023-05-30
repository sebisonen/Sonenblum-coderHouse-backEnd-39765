import mongoose from "mongoose";
import cartsModel from "../../../models/carts.model.js";

export default class CartsManager{
    getCarts = () => cartsModel.find().lean()
    getCartById = (id) => cartsModel.findById(id).populate('products.product').lean()
    createCart = (cart) => cartsModel.create(cart)
    addToCart = (cartId, productId)=> cartsModel.updateOne({_id: cartId},{$push: {products:{product: productId, quantity: 1}}})
    isProductInCart= async (cartId,productId)=>{
        let cart= await this.getCartById(cartId)
        let isInCart = cart.products.some((el)=>el.product._id.toHexString()===productId)
        return isInCart
    }
    // New methods
    deleteCart = (cartId) => cartsModel.findByIdAndDelete(cartId)
    deleteFromCart =(cartId, productId)=> cartsModel.updateOne({_id: cartId},{$pull: {products:{product: productId}}})
    modifyQuantity = (cartId, productId, quantity) => cartsModel.updateOne({_id:cartId,"products.product":productId},{$inc:{"products.$.quantity":quantity}})

}




// const requestedOrders = ()=> orderModel.aggregate([ 
//         {$match: {size:'medium'}},
       
//         {$group:{_id:'$name', totalquantity: {$sum: '$quantity'}}},
 
//         {$sort:{totalquantity: -1}},
   
//         {$group:{_id: 1, orders:{$push: '$$ROOT'}}},

//         {$project:{_id: 0, orders: '$orders'}},
    
//         {$merge:{into:'reports'}}

// ])