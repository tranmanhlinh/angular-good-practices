import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-list-declarative',
  template: `
    <div>User list Declarative</div>
    <br />
    <input type="text" [formControl]="searchControl" />
    <div>---------------------</div>
    <ng-container *ngFor="let user of users$ | async">
      <div>User name: {{ user.name }}</div>
      <div>User name: {{ user.age }}</div>
      <div>-------------------------</div>
    </ng-container>
  `,
})
export class UserListDeclarativeComponent {
  searchControl = new FormControl('');
  userService = inject(UserService);

  users$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((query) => this.userService.getUserLists(query || ''))
  );
}
