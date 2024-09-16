import { Pipe, PipeTransform } from '@angular/core';
import Task from '../models/task';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: Task[], filtro: string): Task[] {
    if (!items || !filtro) {
      return items;
    }
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(filtro.toLowerCase()) ||
        item.description.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
