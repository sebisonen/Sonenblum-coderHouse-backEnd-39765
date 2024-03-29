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
//Simple router
import MockRouter from './routes/mock.router.js'
//Utils
import __dirname from './utils.js'
//env
import config from './config/config.js';
//Middlewares
import errorHandler from './middlewares/error.js'
//Swagger
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'


// CONFIG
// Server
const app = express()
const server = app.listen(config.app.PORT, ()=>console.log(`Listening on port ${config.app.PORT}. Open http://localhost:${config.app.PORT}`))

// DB
const connection=mongoose.connect(config.mongoDB.URL)

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// Lectura de archivos y url
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

// Public
app.use(express.static(`${__dirname}/public`))

//Swagger
const swaggerOptions ={
    definition: {
        openapi: '3.0.1', 
        info:{ 
            title: "Sebastian Sonenblum's coderHouse Backend Project",
            description: "Documentation for the main API of this project"
        }
    },
    apis:[`${__dirname}/documentation/**/*.yaml`]
}
const specifications = swaggerJSDoc(swaggerOptions);

app.use('/docs',swaggerUiExpress.serve, swaggerUiExpress.setup(specifications));



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

const mockRouter = new MockRouter()
app.use('/api/mocks', mockRouter.getRouter())

//Error handler
app.use(errorHandler) //CREO QUE NO ESTÁ ENTRANDO A ESTO


