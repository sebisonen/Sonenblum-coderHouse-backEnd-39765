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
    async addProduct (product){
        try {
            const products = await this.getProducts()
            
        //  Le doy un ID autoincrementado
            this.products.length===0?product.id=1:product.id = this.products[this.products.length-1].id+1            

        // Chequeo que ningún campo esté sin completar y que el producto no se repita
            const values = Object.values(product)
            const emptyFields= values.some((value)=>value===undefined)
            const isProductRepeated = this.products.some((prod)=>prod.code===product.code)
            if (emptyFields||isProductRepeated){
                const errorMessage = emptyFields?
                    "All fields must be completed":
                    "This code is being used for another product"
                throw new Error(errorMessage)
            }else{//Si las validaciones están bien lo agrego a products y lo escribo en el file    
                this.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
                console.log("Product added successfully")
            }
        }catch (error) {
            console.log(error)
        }      
    }
    async getProductById(id){
        try {
            const products = await this.getProducts()
            let gettedProduct = products.find(((product)=>product.id===id))
            return gettedProduct? gettedProduct:"Not Found"
        } catch (error) {
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

            // Validaciones
            const invalidChange = Object.keys(field).some((key)=>key==="id") //Estoy tratando de pisar el id? 
            if (productIndex===-1){//Si el index es -1 significa que el producto no fue encontrado
                throw new Error("Not a valid ID")
            }else if(invalidChange){
                const errorMessage ="ID cannot be changed"
                throw new Error(errorMessage)
            } 
            //Actualizo el file 
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log( `Product ${product.id} has been modified successfully`)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(id){
        try{
            const products= await this.getProducts()
            //Con el filter genero mi array excluyendo el producto a eliminar:
            const newProducts = products.filter((prods)=>prods.id!==id)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
        }catch(error){
            console.log(error)
        }
    }   
}