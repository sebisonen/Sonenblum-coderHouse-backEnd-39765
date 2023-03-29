
class ProductManager {
    constructor(){
        this.products = []
    }
    addProduct = (title, description, price, thumbnail, code, stock) =>{
        // Creo el producto
        const newProduct ={
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        // Le doy un ID autoincrementado
        this.products.length===0?newProduct.id=1:newProduct.id = this.products[this.products.length-1].id+1

        // Me fijo que ningun valor esté sin completar y que el producto no se repita antes de crearlo
        const values = Object.values(newProduct)
        const emptyFields= values.some((value)=>value===undefined)
        const isProductRepeated = this.products.some((product)=>product.code===newProduct.code)
        if(!emptyFields && !isProductRepeated){
            this.products.push(newProduct)
        }else if(emptyFields){
            console.log("All fields must be completed")
        }else if(isProductRepeated){
            console.log("This product already exists")
        }
    }
    getProducts = ()=>{
        console.log(this.products)
    }
    getProductById = (id)=>{
        let gettedProduct = this.products.find(((product)=>product.id===id))
        if (gettedProduct===undefined){
           console.log("Not found")
        }else{
            console.log(gettedProduct)
        }
    }
}

// Tester del entregable

const ecommerce = new ProductManager()
// MUESTRO EL ARRAY VACIO
ecommerce.getProducts()

// AGREGO UN PRODUCTO (en este paso no se muestra nada por consola)
ecommerce.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123", 25)

//MUESTRO LOS PRODUCTOS (hay 1 solo producto, el creado en el paso anterior)
ecommerce.getProducts() 

// AGREGO UN PRODUCTO REPETIDO
ecommerce.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123", 25)

// AGREGO UN PRODUCTO NO VALIDO (no especifiqué el stock, le falta un argumento a la funcion)
ecommerce.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123")

// BUSCO POR ID (me devuelve el producto que busqué)
ecommerce.getProductById(1)

// BUSCO POR ID NO VALIDO (me devuelve "not found")
ecommerce.getProductById(1585635)
