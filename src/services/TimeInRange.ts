export class TimeInRange{
    scheduleInvalidRange(time: number) {
        if (time < 8 || time > 23) {
            return true
        } else {
            return false
        }
    }
}