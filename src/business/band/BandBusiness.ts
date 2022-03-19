import { CustomError } from "../../error/CustomError"
import { Band, BandInputDTO } from "../../model/band/Band"
import { Authenticator } from "../../services/Authenticator"
import { IdGenerator } from "../../services/IdGenerator"
import { BandRepositoty } from "./BandRepository"

export class BandBusiness {
    private bandData: BandRepositoty
    private idGenerator: IdGenerator
    private authenticator: Authenticator
    constructor(bandDataImplementation: BandRepositoty) {
        this.bandData = bandDataImplementation
        this.idGenerator = new IdGenerator()
        this.authenticator = new Authenticator()
    }

    create = async (bandInput: BandInputDTO) => {
        const { name, musicGenre, responsible } = bandInput
        
        if (!name) {
            throw new CustomError(422, "Please, inform a name for new band.")
        }
        if (!musicGenre) {
            throw new CustomError(422, "Please, inform a music genere for new band.")
        }
        if (!responsible) {
            throw new CustomError(422, "Please, inform a music responsible for new band.")
        }

        

        const id = this.idGenerator.generate()

        const newBandInput = new Band(id, name, musicGenre, responsible)

        await this.bandData.create(newBandInput)
    }
}