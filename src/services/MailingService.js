//ESTO TODAVIA NO TIENE IMPLEMENTACION
import config from "../config/config.js"
import nodemailer from 'nodemailer'
import MailingDict from "../constants/dictionaries/MailingDict.js"
import { generateMailTemplate } from "../utils.js"

export default class MailingService {
    constructor (){
        this.mailer = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth:{
                user: config.mailer.EMAIL,
                pass: config.mailer.PASSWORD
            }
        })
    }
    sendMail =async (emails, template, payload)=>{
        //Emails: puede ser uno solo en string o un array entero
        //Template: estan los dictionaries en la carpeta constants
        //Payload: el objeto que voy a vaciar en template
        const mailInfo = MailingDict[template]
        const html = await generateMailTemplate(template, payload)
        const result = await this.mailer.sendMail({
            from: 'Generic Ecommerce CoderHouse Backend Project <sebisonenblum@gmail.com>',
            to: emails,
            html,
            ...mailInfo
        })
        return result

    }
}
