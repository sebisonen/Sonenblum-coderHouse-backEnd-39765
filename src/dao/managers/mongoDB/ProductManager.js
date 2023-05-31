import productsModel from "../../../models/products.model.js";


 export default class ProductManager {
    getProducts =  () => productsModel.find().lean()
    getProductById = (id) => productsModel.findById(id).lean()
    addProduct= (product) => productsModel.create(product)
    addManyProducts = (products)=> productsModel.insertMany(products)
    updateProduct = (id, product)=> productsModel.findByIdAndUpdate(id, product)
    deleteProduct = (id) => productsModel.findByIdAndDelete(id)
}
