import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "runtime",
})
export class RuntimePipe implements PipeTransform {
    transform(runtime: number | undefined): string {
        return runtime ? `${(runtime / 60).toFixed(0)}h ${runtime % 60}m` : "";
    }
}
