import { TicketRepository } from "../../business/ticket/ticketRepository";
import { CustomError } from "../../error/CustomError";
import { Ticket, ticketSellDataInputDTO } from "../../model/ticket/Ticket";
import { BaseDatabase } from "../BaseDatabase";

export class TicketDataBase extends BaseDatabase implements TicketRepository {
    protected TABLE_NAME = "NOME_TABELAS_INGRESSOS"

    create = async (ticket: Ticket) => {
        try {
            await this
                .getConnection()
                (this.TABLE_NAME)
                .insert({
                    "id": ticket.getId(),
                    "name": ticket.getName(),
                    "quantity": ticket.getQuantity(),
                    "quantity_sold": ticket.getQuantitySold(),
                    "show_id": ticket.getShowId()
                })
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
    }
    getByShowId = async (showId: string) => {
        try {
            const queryResult = await this
                .getConnection()
                (this.TABLE_NAME)
                .select()
                .where({ showId })
            if (queryResult) {
                const result = new Ticket(
                    queryResult[0]!.id,
                    queryResult[0]!.name,
                    queryResult[0]!.quantity,
                    queryResult[0]!.quantity_sold,
                    queryResult[0]!.show_id
                )
                return result
            } else {
                return null
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
    }
    getById = async (id: string) => {
        try {
            const queryResult = await this
                .getConnection()
                (this.TABLE_NAME)
                .select()
                .where({ id })
            if (queryResult) {
                const result = new Ticket(
                    queryResult[0]!.id,
                    queryResult[0]!.name,
                    queryResult[0]!.quantity,
                    queryResult[0]!.quantity_sold,
                    queryResult[0]!.show_id
                )
                return result
            } else {
                return null
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
    }
    sellTicket = async (ticketSellInputDTO: ticketSellDataInputDTO) => {
        try {
            await this
                .getConnection()
                (this.TABLE_NAME)
                .update({
                    "quantity": ticketSellInputDTO.quantity,
                    "quantity_sold": ticketSellInputDTO.quantitySold
                })
                .where({ "id": ticketSellInputDTO.id })
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
    }
}
