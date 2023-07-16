//Modulos
import express from 'express'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import initializePassport from './config/passport.config.js'
//Custom router
import ProductsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'
import SessionsRouter from './routes/sessions.router.js';
import ViewsRouter from './routes/views.router.js'
//Utils
import __dirname from '../utils.js'



// CONFIG
// Server
const app = express()
const server = app.listen(8080, ()=>console.log("Listening on port 8080. Open http://localhost:8080"))

// DB
const connectionString=''
const connection=mongoose.connect(connectionString)

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// Lectura de archivos y url
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

// Public
app.use(express.static(`${__dirname}/public`))

//Passport
initializePassport()

//Cookie Parser
app.use(cookieParser())

//Custom Routers

const productsRouter = new ProductsRouter()
app.use('/api/products', productsRouter.getRouter() )

const cartsRouter = new CartsRouter()
app.use('/api/carts', cartsRouter.getRouter())

const sessionsRouter = new SessionsRouter()
app.use('/api/sessions', sessionsRouter.getRouter())

const viewsRouter = new ViewsRouter()
app.use('/', viewsRouter.getRouter())

