import ProductManager from './managers/ProductManager.js'
import express from 'express'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()



// Configuracion de lectura de archivos y url
    app.use(express.json()) 
        
    app.use(express.urlencoded({extended:true}))
        
// Routers
    app.use('/api/carts', cartsRouter)
        //Aca digo que cada vez que haya una peticion de esta url me derive a ese codigo,
        // por lo que en users.router.js no pongo la ruta, ya se entiende
    app.use('/api/products', productsRouter)

// Port
    app.listen(8080, ()=>console.log("Listening on port 8080. Open http://localhost:8080"))



