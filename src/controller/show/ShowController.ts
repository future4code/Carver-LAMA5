import { Request, Response } from "express";
import { ShowBusiness } from "../../business/show/ShowBusiness";
import { BaseDatabase } from "../../data/BaseDatabase";
import { ShowDataBase } from "../../data/show/ShowDataBase";
import { showInputDTO } from "../../model/show/Show";

export class ShowController{
    private showBusiness: ShowBusiness
    constructor() {
        this.showBusiness = new ShowBusiness(new ShowDataBase)
    }

    create = async (req: Request, res: Response) => {
        const { weekDay, startTime, endTime, bandId } = req.body
        const showInput: showInputDTO = {
            weekDay,
            startTime,
            endTime,
            bandId
        }
        try {
            await this.showBusiness.create(showInput)

            res.status(201).send("Show has been created!")
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }  
        await BaseDatabase.destroyConnection()
    }
    getByWeekDayBandInfo = async (req: Request, res: Response) => {
        const {weekDay} = req.body
        try {
            const weekDayData = await this.showBusiness.getByWeekDayBandInfo(weekDay)

            res.status(200).send({weekDayData})
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }  
        await BaseDatabase.destroyConnection()
    }
}