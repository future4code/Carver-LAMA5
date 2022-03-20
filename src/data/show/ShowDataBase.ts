import { ShowRepository } from "../../business/show/showRepository";
import { CustomError } from "../../error/CustomError";
import { Show, ShowBandInfo, WeekDay } from "../../model/show/Show";
import { BaseDatabase } from "../BaseDatabase";

export class ShowDataBase extends BaseDatabase implements ShowRepository {
    protected TABLE_NAME = "NOME_TABELA_SHOWS"
    protected TABLE_NAME1 = "NOME_TABELA_BANDAS "

    create = async (show: Show) => {
        try {
            await this
                .getConnection()
                (this.TABLE_NAME)
                .insert({
                    "id": show.getId(),
                    "week_day": show.getWeekDay(),
                    "start_time": show.getStartTime(),
                    "end_time": show.getEndTime(),
                    "band_id": show.getBandId()
                })
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.message)
            }
        }
    }
    getShowById = async (id: string) => {
        try {
            const queryResult = await this
                .getConnection()
                (this.TABLE_NAME)
                .select()
                .where({ id })
            if (queryResult) {
                const result = new Show(
                    queryResult[0]!.id,
                    queryResult[0]!.week_day,
                    queryResult[0]!.start_time,
                    queryResult[0]!.end_time,
                    queryResult[0]!.band_id
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
    getByWeekDay = async (weekDay: WeekDay) => {
        try {
            const queryResult = await this
                .getConnection()
                (this.TABLE_NAME)
                .select()
                .where({ "week_day": weekDay })
                .orderBy("start_time")
            if (queryResult) {
                const result: Show[] | null = []
                queryResult.map(item => {
                    result.push(new Show(
                        item.id,
                        item.week_day,
                        item.start_time,
                        item.end_time,
                        item.band_id
                    ))
                })
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
    getByWeekDayBandInfo = async (weekDay: WeekDay) => {
        try {
            const queryResult = await this
                .getConnection()
                (this.TABLE_NAME)
                .select(
                    `${this.TABLE_NAME1}.name`,
                    `${this.TABLE_NAME1}.music_genre as musicGenre`
                )
                .innerJoin(
                    `${this.TABLE_NAME1}`,
                    `${this.TABLE_NAME}.band_id`,
                    `${this.TABLE_NAME1}.id`
                )
                .where({ "week_day": weekDay })
                .orderBy("start_time")
            if (queryResult) {
                const result: ShowBandInfo[] | null = []
                for (let show of queryResult) {
                    result.push(show)
                }
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