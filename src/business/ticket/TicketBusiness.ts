import { ShowDataBase } from "../../data/show/ShowDataBase";
import { CustomError } from "../../error/CustomError";
import { Ticket, ticketInputDTO, ticketSellDataInputDTO, ticketSellInputDTO } from "../../model/ticket/Ticket";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";
import { TicketRepository } from "./ticketRepository";

export class TicketBusiness {
    private ticketData: TicketRepository
    private idGenerator: IdGenerator
    private authenticator: Authenticator
    constructor(ticketDataImplementation: TicketRepository) {
        this.ticketData = ticketDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    create = async (ticketInput: ticketInputDTO) => {
        const { name, quantity, showId, token } = ticketInput
        
        if (!name) {
            throw new CustomError(422, "Please, inform a name for ticket.")
        }
        if (!quantity) {
            throw new CustomError(422, "Please, inform a quantity for ticket.")
        }
        if (quantity <= 0) {
            throw new CustomError(422, "Ticket quantity must be greater than 0.")
        }
        if (!showId) {
            throw new CustomError(422, "Please, inform a show id for ticket.")
        }
        if (!token) {
            throw new CustomError(422, "Please, login to create a ticket.")
        }

        const userData = this.authenticator.getData(token)

        if (!userData) {
            throw new CustomError(422, "Invalid token.")
        }
        if (userData.role !== "ADMIN") {
            throw new CustomError(401, "Unauthorized user.")
        }

        const showData = await new ShowDataBase().getShowById(showId)

        if (!showData) {
            throw new CustomError(404, "Show not found.")
        }

        const ticketShowData = await this.ticketData.getByShowId(showId)

        if (ticketShowData) {
            throw new CustomError(422, "This show already have tickets.")
        }
            
        const id = this.idGenerator.generate()

        const newTicketData = new Ticket(
            id,
            name,
            quantity,
            0,
            showId
        )

        await this.ticketData.create(newTicketData)
    }
    sellTicket = async (ticketSellInputDTO: ticketSellInputDTO) => {
        const { id, quantity } = ticketSellInputDTO
        
        if (!id) {
            throw new CustomError(422, "Please, inform a id for ticket.")
        }
        if (!quantity) {
            throw new CustomError(422, "Please, inform quantity sell for ticket.")
        }
        if (quantity <= 0) {
            throw new CustomError(422, "Ticket quantity must be greater than 0.")
        }

        const ticketData = await this.ticketData.getById(id)

        if (!ticketData) {
            throw new CustomError(404, "Ticket not found.")
        }

        if (ticketData.getQuantity() < quantity) {
            throw new CustomError(422, "Quantity cannot be greater than ticket's stock.")
        }

        const newQuantity = ticketData.getQuantity() - quantity
        const newQuantitySold = ticketData.getQuantitySold() + quantity

        const updateTicket: ticketSellDataInputDTO = {
            id,
            quantity: newQuantity,
            quantitySold: newQuantitySold
        }

        await this.ticketData.sellTicket(updateTicket)
    }
}