import express from 'express'
import __dirname from '../utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import sessionsRouter from  './routes/sessions.router.js'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
 
// Server
    const app = express()
    const server = app.listen(8080, ()=>console.log("Listening on port 8080. Open http://localhost:8080"))
    const io = new Server(server)

// DB
    const connectionString=
    const connection=mongoose.connect(connectionString)

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

    // Sockets config
        app.use((req,res,next)=>{
            req.io = io 
            next()
        })
    //Passport
        initializePassport()
    
    //Cookie Parser
        app.use(cookieParser())
    // Routers
        app.use('/api/carts', cartsRouter)
        app.use('/api/products', productsRouter)
        app.use('/api/sessions', sessionsRouter)
        app.use('/', viewsRouter)

    // Socket connection
        io.on('connection',()=>{
            console.log("Socket connected")
        })
