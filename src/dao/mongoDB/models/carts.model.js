import mongoose from 'mongoose'

const cartsCollections = 'carts'
const cartsSchema = new mongoose.Schema({
    products:{
        type: [{
            product:{
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'products'
                
            },
            quantity: Number
        }],
        default:[]
    }
    
}, {timestamps: {createdAt:'created_at', updatedAt:'updated_at'}})

// Middlewares
cartsSchema.pre('find', function(){
    this.populate('products.product')
})
cartsSchema.pre('findById', function(){
    this.populate('products.product')
})

const cartsModel = mongoose.models.carts|| mongoose.model(cartsCollections, cartsSchema)

export default cartsModel
