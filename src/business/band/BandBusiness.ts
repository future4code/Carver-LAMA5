import { UserDatabase } from "../../data/user/UserDatabase"
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
        const { name, musicGenre, responsible, userToken } = bandInput
        
        if (!name) {
            throw new CustomError(422, "Please, inform a name for new band.")
        }
        if (!musicGenre) {
            throw new CustomError(422, "Please, inform a music genere for new band.")
        }
        if (!responsible) {
            throw new CustomError(422, "Please, inform a responsible for new band.")
        }
        if (!userToken) {
            throw new CustomError(422, "You are not logged in.")
        }

        const userTokenInfo = this.authenticator.getData(userToken)

        const userData = new UserDatabase().getUserById(userTokenInfo.id)

        if (!userData) {
            throw new CustomError(404, "User not found.")
        }
        if (userTokenInfo.role !== "ADMIN") {
            throw new CustomError(401, "User is unauthorized.")
        }        

        const id = this.idGenerator.generate()

        const newBandInput = new Band(id, name, musicGenre, responsible)

        await this.bandData.create(newBandInput)
    }
    getBandByName = async (bandName: string) => {
        if (!bandName) {
            throw new CustomError(422, "Please, inform a band name.")
        }

        const bandData = await this.bandData.getBandByName(bandName)

        if (!bandData) {
            throw new CustomError(404, "Band not found.")
        }
        return bandData
    }
}