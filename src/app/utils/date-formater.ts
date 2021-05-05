import * as moment from "moment";

export class DateFormatter {
    formatNow(date: Date, format: string = "MMM DD, YYYY HH:mm:ss") {
        return moment(date).format(format);
    }
}