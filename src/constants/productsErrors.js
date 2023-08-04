export const productsErrorIncompleteValues=(product)=>{
    return `One or more requiered parameters were not given:
    Needed parameters:
    *title: A defined string was needed, ${product.title} was received.
    *price: A defined float was needed, ${product.price} was received.
    *stock: A defined int was needed, ${product.stock} was received.
    `
}