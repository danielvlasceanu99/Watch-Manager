import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "dateYear",
})
export class DateYearPipe implements PipeTransform {
    transform(date: Date | undefined): string {
        if (!date) {
            return "";
        }
        return date.toString().split("T")[0].split("-")[0];
    }
}
