import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'unique'
})

export class UniquePipe implements PipeTransform{

    transform(value: any[], key: string): any[] {
        return [...new Map(value.map(item => [item[key], item])).values()];
    }

}