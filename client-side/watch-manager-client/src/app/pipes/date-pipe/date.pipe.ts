import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "date",
})
export class DatePipe implements PipeTransform {
    monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    transform(date: Date): string {
        const splits = date.toString().split("T")[0].split("-");

        return `${splits[2]} ${this.monthNames[Number(splits[1])]} ${splits[0]}`;
    }
}
