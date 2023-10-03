import CartsManager from "../dao/mongoDB/managers/CartsManager.js";
import ProductManager from "../dao/mongoDB/managers/ProductManager.js"
import UsersManager from "../dao/mongoDB/managers/UsersManager.js";
import TicketsManager from "../dao/mongoDB//managers/TicketsManager.js";
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