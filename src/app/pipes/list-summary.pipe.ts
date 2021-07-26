import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listSummary',
  pure: false
})
export class ListSummaryPipe implements PipeTransform {

  transform(list: unknown, ...args: unknown[]): unknown {
    console.log(list)
    if (Object.values(list).every(item => item === true)) return 'All'
    else if (Object.values(list).every(item => item === false)) return 'None'
    else return Object.keys(list).filter(item => list[item]).join(", ");;
  }

}
