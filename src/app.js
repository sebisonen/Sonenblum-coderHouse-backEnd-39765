import express from 'express'
import __dirname from '../utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose'
 
// Server
    const app = express()
    const server = app.listen(8080, ()=>console.log("Listening on port 8080. Open http://localhost:8080"))
    const io = new Server(server)

// DB
    mongoose.connect('mongodb+srv://sebisonenblum:apalapapa123@clusterdemosonen.yyxyxlr.mongodb.net/ecommerce?retryWrites=true&w=majority')

// CONFIG
    // Handlebars
        app.engine('handlebars', handlebars.engine());
        app.set('views', `${__dirname}/views`)
        app.set('view engine', 'handlebars')

    // Lectura de archivos y url
        app.use(express.json()) 
        app.use(express.urlencoded({extended:true}))
        // Public
        app.use(express.static(`${__dirname}/public`))

    // Middlewares
        app.use((req,res,next)=>{
            req.io = io 
            next()
        })

    // Routers
        app.use('/api/carts', cartsRouter)
        app.use('/api/products', productsRouter)
        app.use('/', viewsRouter)

    // Socket
        io.on('connection',()=>{
            console.log("Socket connected")
        })
