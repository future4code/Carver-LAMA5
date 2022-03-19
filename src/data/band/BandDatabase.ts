import { BandRepositoty } from "../../business/band/BandRepository";
import { CustomError } from "../../error/CustomError";
import { Band } from "../../model/band/Band";
import { BaseDatabase } from "../BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepositoty {

    protected TABLE_NAME = "NOME_TABELA_BANDAS"

    create = async (bandInput: Band) => {
        try {
            await BaseDatabase
                .connection(this.TABLE_NAME)
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
          this.closeConnection()
    }

}