import { Injectable } from '@angular/core';
import { filter, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUserLists(query: string = '') {
    return of([
      { name: 'John Doe', age: 15 },
      { name: 'Jane Smith', age: 27 },
      { name: 'Michael Johnson', age: 42 },
      { name: 'Emily Davis', age: 33 },
      { name: 'David Brown', age: 19 },
    ]).pipe(map((users) => users.filter((item) => item.name.includes(query))));
  }
}
