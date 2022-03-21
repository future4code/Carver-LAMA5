import { BandDatabase } from "../../data/band/BandDatabase";
import { CustomError } from "../../error/CustomError";
import { Show, showInputDTO, WeekDay } from "../../model/show/Show";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";
import { TimeInRange } from "../../services/TimeInRange";
import { ShowRepository } from "./showRepository";

export class ShowBusiness {
    private showData: ShowRepository
    private idGenerator: IdGenerator
    private timeInRange: TimeInRange
    constructor(showDataImplementation: ShowRepository) {
        this.showData = showDataImplementation
        this.idGenerator = new IdGenerator()
        this.timeInRange = new TimeInRange()
    }

    create = async (showInput: showInputDTO) => {
        const { weekDay, startTime, endTime, bandId } = showInput

        if (!weekDay) {
            throw new CustomError(422, "Please, inform a week day for this show.")
        }
        if (weekDay.toLocaleUpperCase() !== "SEXTA" && weekDay.toLocaleUpperCase() !== "SÁBADO" && weekDay.toLocaleUpperCase() !== "DOMINGO") {
            throw new CustomError(422, "Week day must be SEXTA, or SÁBADO or DOMINGO.")
        }
        if (!startTime) {
            throw new CustomError(422, "Please, inform a start time for this show.")
        }
        if (!endTime) {
            throw new CustomError(422, "Please, inform a end time for this show.")
        }
        if (!Number.isInteger(startTime)) {
            throw new CustomError(422, "Start time must be a valid schedule")
        }
        if (!Number.isInteger(endTime)) {
            throw new CustomError(422, "End time must be a valid schedule")
        }
        if (endTime < startTime) {
            throw new CustomError(422, "Invalid show time.")
        }
        const validStartTime = this.timeInRange.scheduleInvalidRange(startTime)
        if (validStartTime) {
            throw new CustomError(422, "Start time must be a valid schedule")
        }
        const validEndTime = this.timeInRange.scheduleInvalidRange(endTime)
        if (validEndTime) {
            throw new CustomError(422, "End time must be a valid schedule")
        }
        if (!bandId) {
            throw new CustomError(422, "Please, inform a band id for this show.")
        }

        const showWeekData = await this.showData.getByWeekDay(weekDay)
        let validNewShowTime: boolean = false
        showWeekData.map((show) => {
            if (show.getStartTime() > startTime || show.getEndTime() > startTime) {
                validNewShowTime = true
            }
        })

        if (validNewShowTime) {
            throw new CustomError(422, "Not a valid time in this week day.")
        }


        const bandRegistered = await new BandDatabase().getBandById(bandId)

        if (!bandRegistered) {
            throw new CustomError(404, "Band not found.")
        }

        const id = this.idGenerator.generate()

        const newShowData = new Show(
            id,
            weekDay,
            startTime,
            endTime,
            bandId
        )

        await this.showData.create(newShowData)
    }
    getByWeekDayBandInfo = async (weekDay: WeekDay) => {
        if (!weekDay) {
            throw new CustomError(422, "Plase, inform a week day.")
        }
        if (weekDay.toLocaleUpperCase() !== "SEXTA" && weekDay.toLocaleUpperCase() !== "SÁBADO" && weekDay.toLocaleUpperCase() !== "DOMINGO") {
            throw new CustomError(422, "Week day must be SEXTA, or SÁBADO or DOMINGO.")
        }

        const weekDayData = await this.showData.getByWeekDayBandInfo(weekDay)

        return weekDayData
    }
}