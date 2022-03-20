
export class Show {
    constructor(
        private id: string,
        private weekDay: WeekDay,
        private startTime: number,
        private endTime: number,
        private bandId: string
    ) { }
    getId() {
        return this.id
    }
    getWeekDay() {
        return this.weekDay
    }
    getStartTime() {
        return this.startTime
    }
    getEndTime() {
        return this.endTime
    }
    getBandId() {
        return this.bandId
    }
}

export type showInputDTO = {
    weekDay: WeekDay,
    startTime: number,
    endTime: number,
    bandId: string
}

export type ShowBandInfo = {
    band: string,
    musicGenre: string
}

export enum WeekDay {
    SEXTA = "SEXTA",
    SÁBADO = "SÁBADO",
    DOMINGO = "DOMINGO"
}