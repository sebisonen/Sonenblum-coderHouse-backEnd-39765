import { Router } from "express";
import { generateProduct } from "../mocks/products.mock.js";

const router = Router()

router.get('/mockproducts', (req,res)=>{
    try {
        let users =[]
        for (let i=0; i < 50; i++ ){
             users.push(generateProduct())
        }
        res.send({status:"success", payload: users})
    } catch (error) {
        res.status(500).send({status:"error", message: error.message})
    }
})

export default router