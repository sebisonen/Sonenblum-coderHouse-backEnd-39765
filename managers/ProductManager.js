import fs from 'fs';

export default class ProductManager {
    constructor(path){
        this.path = path
        this.products =[]
    }
    async getProducts(){
        try {
            // Busco del file el array y lo almaceno en la variable products propia de la clase
            const data = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(data)
            this.products = products
            return this.products
        } catch (error) {
           return this.products
        }
    }
    
    async getProductById(id){
        try {
            const products = await this.getProducts()
            let gettedProduct = products.find(((product)=>product.id===id))
            return gettedProduct
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct (product){
        try {
        // Variables utiles
            const products = await this.getProducts()
            const response = {error: false}

        //  Agrego ID
            this.products.length===0?product.id=1:product.id = this.products[this.products.length-1].id+1            

        // Validaciones
            const emptyFields= 
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock
            const isProductRepeated = this.products.some((prod)=>prod.code===product.code)

        // Intento la carga
            if (emptyFields||isProductRepeated){
                // Defino qué mensaje voy a enviar
                const message = emptyFields?"All fields must be completed":"This code is being used for another product"
                // Armo la respuesta del manager
                response.message = message
                response.error = true
                return response
            }else{//Si las validaciones están bien lo agrego a products y lo escribo en el file    
                this.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
                // Defino la respuesta del manager
                const message ="Product added successfully"
                response.message = message
                return response
            }
        }catch (error) {
            console.log(error)
        }      
    }
    async updateProduct(id, field){
        try {
            
            const products = await this.getProducts()// Almaceno la data del file en la variable products
            const product = await this.getProductById(id)//Encuentro el producto que quiero actualizar
            const productIndex = products.findIndex((prod) => prod.id==id)//Consigo el indice para luego poder pisarlo
            const updatedProduct = {...product, ...field}
            products[productIndex] = updatedProduct

            const response = {error: false}
            // Validaciones
            const invalidChange = Object.keys(field).some((key)=>key==="id") //Estoy tratando de pisar el id? 
            if (productIndex===-1){//Si el index es -1 significa que el producto no fue encontrado
                
                response.message = "Not a valid ID"
                response.error = true
                return response
                
            }else if(invalidChange){
                response.message ="ID cannot be changed"
                response.error= true
                return response
                
            } 
            //Actualizo el file 
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            response.message= `Product ${product.id} has been modified successfully`
            // Ver el return
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try{
            const products= await this.getProducts()
            const validId = products.some((prod)=>prod.id==id)
            const response ={error: false}
            
            if(!validId){
                response.message="This ID is not not valid"
                response.error= true
                return response
            }

            //Con el filter genero mi array excluyendo el producto a eliminar:
            const newProducts = products.filter((prods)=>prods.id!==id)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
            response.message=`Product with ID ${id} has been deleted successfully`
            return response

        }catch(error){
            console.log(error)
        }
    }   
    
}


