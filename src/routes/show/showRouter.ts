import express from "express";
import { ShowController } from "../../controller/show/ShowController";




export const showRouter = express.Router()

const showController = new ShowController()

showRouter.post("/create", showController.create)
showRouter.get("/info", showController.getByWeekDayBandInfo)