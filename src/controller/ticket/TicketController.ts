import { Request, Response } from "express";
import { TicketBusiness } from "../../business/ticket/TicketBusiness";
import { BaseDatabase } from "../../data/BaseDatabase";
import { TicketDataBase } from "../../data/ticket/TicketDataBase";
import { ticketInputDTO, ticketSellInputDTO } from "../../model/ticket/Ticket";

export class TicketController {
    private ticketBusiness: TicketBusiness
    constructor() {
        this.ticketBusiness = new TicketBusiness(new TicketDataBase)
    }

    create = async (req: Request, res: Response) => {
        const { name, quantity, showId } = req.body
        const token = req.headers.authorization

        const ticketInput: ticketInputDTO = {
            name,
            quantity,
            showId,
            token
        }
        try {
            await this.ticketBusiness.create(ticketInput)

            res.status(201).send("Ticket has been created!")
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }  
        await BaseDatabase.destroyConnection()
    }
    sellTicket = async (req: Request, res: Response) => {
        const { id, quantity } = req.body
        const ticketSellInput: ticketSellInputDTO = {
            id,
            quantity
        }
        try {
            await this.ticketBusiness.sellTicket(ticketSellInput)

            res.status(201).send("Ticket has been sold!")
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }  
        await BaseDatabase.destroyConnection()
    }
}