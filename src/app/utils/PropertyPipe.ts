import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "propertyPipe" })
export class PropertyPipe implements PipeTransform {
  transform(value: string): string {
    const t = value
      .split("_")
      .map(s => s.toLowerCase())
      .join(" ");
    return t.charAt(0).toLocaleUpperCase() + t.slice(1);
  }
}
