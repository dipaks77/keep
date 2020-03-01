import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string, fieldsToSearch: string[]): any[] {
    if (!value) return items;
    return items.filter(item => {
      let ret = false;
      fieldsToSearch.filter(key => {
        if (item[key].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          ret = true;
        }
      });
      return ret;
    });
  }

}
