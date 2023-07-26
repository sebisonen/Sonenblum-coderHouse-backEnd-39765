import mongoose from 'mongoose';
    const collection = "tickets";
    const schema = new mongoose.Schema({
        amount:Number,
        purchaser: String,
        cart: {
            ref: 'carts',
            type: mongoose.Schema.Types.ObjectId,
        }

    },{timestamps: {createdAt:'purchase_datetime'}})
    const ticketsModel = mongoose.models.tickets|| mongoose.model(collection,schema);
    export default ticketsModel;