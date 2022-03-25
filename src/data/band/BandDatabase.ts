import { BandRepositoty } from "../../business/band/BandRepository";
import { CustomError } from "../../error/CustomError";
import { Band } from "../../model/band/Band";
import { BaseDatabase } from "../BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepositoty {

    protected TABLE_NAME = "NOME_TABELA_BANDAS"

    create = async (bandInput: Band) => {
        try {
            await this
                .getConnection()
                (this.TABLE_NAME)
                .insert({
                    "id": bandInput.getId(),
                    "name": bandInput.getName(),
                    "music_genre": bandInput.getMusicGenre(),
                    "responsible": bandInput.getResponsible()
                })
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
    }
    getBandByName = async (bandName: string) => {
        try {
            const queryResult: any = await this
                .getConnection()
                (this.TABLE_NAME)
                .select()
                .where({ "name": bandName })
                if (queryResult[0]) {
                    const result = new Band(
                      queryResult[0]!.id,
                      queryResult[0]!.name,
                      queryResult[0]!.music_genre,
                      queryResult[0]!.responsible
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
    getBandById = async (bandId: string) => {
        try {
            const queryResult: any = await this
                .getConnection()
                (this.TABLE_NAME)
                .select()
                .where({ "id": bandId })
                if (queryResult[0]) {
                    const result = new Band(
                      queryResult[0]!.id,
                      queryResult[0]!.name,
                      queryResult[0]!.music_genre,
                      queryResult[0]!.responsible
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

}