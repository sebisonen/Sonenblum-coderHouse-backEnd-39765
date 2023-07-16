import express from "express";
import dictionaryRouter from "./clase23/routes/dictionary.router.js"
import petsRouter from "./clase23/routes/pets.router.js"
import UserRouter from "./clase23/routes/users.router.js";
const app = express()

//Clase 23 (custom router)

const userRouter = new UserRouter()

    app.use('/api/users', userRouter.getRouter() )
    app.use('/api/dictionary', dictionaryRouter)
    app.use('/api/pets', petsRouter)
app.listen(8080, ()=>console.log("Listening on port 8080. Open http://localhost:8080"))
