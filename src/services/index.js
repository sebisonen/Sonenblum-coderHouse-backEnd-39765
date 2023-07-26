import CartsManager from "../DAO/mongoDB/managers/CartsManager.js";
import ProductManager from "../DAO/mongoDB/managers/ProductManager.js"
import UsersManager from "../DAO/mongoDB/managers/UsersManager.js";
import TicketsManager from "../DAO/mongoDB//managers/TicketsManager.js";
import ProductsRepository from "./repositories/ProductsRepository.js";
import CartsRepository from "./repositories/CartsRepository.js";
import UsersRepository from "./repositories/UsersRepository.js";
import TicketsRepository from "./repositories/TicketsRepository.js";

const productManager = new ProductManager()
const cartsManager = new CartsManager()
const usersManager = new UsersManager()
const ticketsManager = new TicketsManager()

export const productsRepository = new ProductsRepository(productManager)
export const cartsRepository = new CartsRepository(cartsManager)
export const usersRepository = new UsersRepository(usersManager)
export const ticketsRepository = new TicketsRepository(ticketsManager)