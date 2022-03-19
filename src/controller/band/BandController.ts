import { Request, Response } from "express"
import { BandBusiness } from "../../business/band/BandBusiness"
import { BandDatabase } from "../../data/band/BandDatabase"

import { BandInputDTO } from "../../model/band/Band"

export class BandController {

    private bandBusiness: BandBusiness
    constructor() {
        this.bandBusiness = new BandBusiness(new BandDatabase)
    }

    create = async (req: Request, res: Response) => {
        const { name, musicGenre, responsible } = req.body
        
        const bandInput: BandInputDTO = {
            name,
            musicGenre,
            responsible
        } 
        try {
            await this.bandBusiness.create(bandInput)
            res.status(201).send("Band has been created!")
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message })
        }  
    }
}