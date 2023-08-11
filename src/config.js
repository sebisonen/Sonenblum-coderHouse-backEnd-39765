import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()
program.option('-m, --mode <mode>', 'Modo de ejecución', 'prod')
program.parse()
dotenv.config({
    path: program.opts().mode==="dev"? //Si ejecuto nodemon ./app.js --mode dev
        './.env.dev': //Ejecuta esto
        './.env.prod' //Sino por default va a tirar esto
})

export default {
    app: {
        PORT: process.env.PORT||8080,
        ADMIN: {
            EMAIL: process.env.ADMIN_EMAIL,
            PASSWORD: process.env.ADMIN_PASSWORD
        },
        JWT_SECRET: process.env.JWT_SECRET
        
    },
    mongoDB: {
        URL: process.env.MONGO_URL
    },
    env: program.opts().mode==="dev"? "dev":"prod"
}