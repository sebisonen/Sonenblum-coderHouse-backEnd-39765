import winston from "winston"
export default class LoggerService{
    constructor(env){ //Le voy a pasar en que stage estoy
    this.options = {
        levels: {
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            http: 4,
            debug: 5
        },
        colors:{
            fatal: "black",
            error: "red",
            warning: "yellow",
            http: "green",
            info: "white",
            debug: "white"
        }
    }
    this.initialize= this.createLogger(env)
    }
    createLogger = (env) =>{
        switch(env){
            case "dev":
            return winston.createLogger({
                levels: this.options.levels,
                transports:[
                    new winston.transports.Console({
                        level:"debug",
                        format: winston.format.combine(
                            winston.format.colorize({colors: this.options.colors}),
                            winston.format.simple()
                        )})
                ]
            })
            case "prod": 
            return winston.createLogger({
                levels: this.options.levels,
                transports:[
                    new winston.transports.Console({
                        level:"info",
                        format: winston.format.combine(
                            winston.format.colorize({colors: this.options.colors}),
                            winston.format.simple()
                    )}),
                    new winston.transports.File({
                        filename: './errors.log',
                        level: "warning",
                    })
                ]
            })
        }
        }
}