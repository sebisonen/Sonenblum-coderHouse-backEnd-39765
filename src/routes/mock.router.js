import BaseRouter from "./router.js";
import { mockProducts, loggerTest } from "../controllers/mock.controller.js";
export default class MockRouter extends BaseRouter{
    init(){
        this.get('/mockproducts',["PUBLIC"],mockProducts )
        this.get('/loggerTest',["PUBLIC"], loggerTest)
    }
}
