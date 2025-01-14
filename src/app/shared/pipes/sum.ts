import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sum",
  standalone: true,
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string, multiplierAttr?: string): any {
    return items.reduce(
      (a, b) => a + b[attr] * (multiplierAttr ? b[multiplierAttr] : 1),
      0
    );
  }
}
