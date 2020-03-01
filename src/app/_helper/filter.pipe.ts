import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], args: any[]): any[] {
    if (!items) return [];
    if (!args || !args.length) return items;
    // if (!searchText) return items;
    // searchText = searchText.toLowerCase();
    return items.filter(item => item.id.indexOf(args[0]) !== -1);
    // return items.filter(it => {
    //   for (let key in it) {

    //     return it[key].toLowerCase().includes(searchText);
    //   }
    // });
  }

}
