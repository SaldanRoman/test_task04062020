import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../services/users.service';

@Pipe({
  name: 'searchContact',
})
export class SearchContactPipe implements PipeTransform {
  transform(users: User[], filterKey: string): User[] {
    return users.filter((user) =>
      user.name.toLowerCase().includes(filterKey.toLowerCase())
    );
  }
}
