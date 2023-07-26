export default class TicketsRepository{
    constructor(dao){
        this.dao=dao
    }
    getTickets=()=>{
        return this.dao.getTickets()
    }
    createTicket =(ticket)=>{
        return this.dao.createTicket(ticket)
    }
    getTicketById = (id)=>{
        return this.dao.getTicketById(id)
    }
}