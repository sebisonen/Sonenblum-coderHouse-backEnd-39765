import ticketsModel from "../models/tickets.model.js";
export default class TicketsManager{
    getTickets = () =>{
        return ticketsModel.find().lean()
    }
    createTicket = (ticket)=>{
        return ticketsModel.create(ticket)
    }
    getTicketById = (id)=>{
        return ticketsModel.findById(id).lean()
    }
}