import express from "express";
import { TicketController } from "../../controller/ticket/TicketController";





export const ticketRouter = express.Router()

const ticketController = new TicketController()

ticketRouter.post("/create", ticketController.create)
ticketRouter.post("/sell", ticketController.sellTicket)



