import {faker} from '@faker-js/faker/locale/es' //Para que los datos sean en español
export const generateProduct = () =>{
    
    return {
        title: faker.commerce.productName(),//estos se buscan en la docu de faker
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        thumbnail: faker.image.urlLoremFlickr()||"Sin imagen",
        code: faker.string.alphanumeric(6),
        stock: faker.number.int({ max: 25 }),

   
    }
}

