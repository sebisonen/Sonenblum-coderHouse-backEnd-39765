export default class ProductsRepository{
    constructor(dao){
        this.dao = dao
    }

    getProducts =  () =>{
        return this.dao.getProducts()
    }
    getProductById = (id) =>{
        return this.dao.getProductById(id)
    }
    addProduct= (product) => {
        return this.dao.addProduct(product)
    }
    addManyProducts = (products)=>{
        return this.dao.addManyProducts(product)
    }
    updateProduct = (id, product)=>{
        return this.dao.updateProduct(id, product)
    }
    deleteProduct = (id) =>{
        return this.dao.deleteProduct(id)
    }
}