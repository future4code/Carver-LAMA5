import { Ticket, ticketSellDataInputDTO } from "../../model/ticket/Ticket";


export interface TicketRepository {
    create(ticket: Ticket): Promise<void>
    getByShowId (showId: string): Promise<Ticket | null>
    getById (id: string): Promise<Ticket | null>
    sellTicket (ticketSellInputDTO: ticketSellDataInputDTO): Promise<void>
}