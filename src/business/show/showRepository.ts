import { Show, ShowBandInfo, WeekDay } from "../../model/show/Show";

export interface ShowRepository {
    create(show: Show): Promise<void>
    getByWeekDay(weekDay: WeekDay): Promise<Show[] | null>
    getByWeekDayBandInfo(weekDay: WeekDay): Promise<ShowBandInfo[] | null>
}