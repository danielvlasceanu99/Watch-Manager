import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "column",
})
export class ColumnPipe implements PipeTransform {
    transform(column: string): string {
        let col = column.split("_").join(" ");
        return col.charAt(0).toUpperCase() + col.slice(1);
    }
}
