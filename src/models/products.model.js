import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
    const productsCollection = "products";

    const schema = new mongoose.Schema({
        title:{
            type: String,
            required: true
          },
        description: {
            type: String,
            required: true
          },
        price: {
            type: Number,
            required: true
          },
        thumbnail: String,
        code: {
            type: String,
            required: true,
            unique : true,
            dropDups: true
          },
        stock: {
            type: Number,
            required: true
          },
        id: {
            type: String,
            required: true
          }
    }, {timestamps: {createdAt:'created_at', updatedAt:'updated_at'}, strict: "throw"});

    schema.plugin(mongoosePaginate)
    const productsModel = mongoose.model(productsCollection,schema);

    export default productsModel