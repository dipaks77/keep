import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string, fieldsToSearch: string[]): any[] {

    // if no value return original content
    if (!value) return items;

    // traverse through array
    return items.filter(item => {

      // set flag
      let ret = false;

      // search by specified fields
      fieldsToSearch.filter(key => {
        if (item[key].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          ret = true;
        }
      });

      // return flag
      return ret;
    });
  }

}
