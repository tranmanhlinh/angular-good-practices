import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  template: `
    <div>User list</div>
    <br />
    <input type="text" [formControl]="searchControl" />
    <div>---------------------</div>
    <ng-container *ngFor="let user of users">
      <div>User name: {{ user.name }}</div>
      <div>User name: {{ user.age }}</div>
      <div>-------------------------</div>
    </ng-container>
  `,
})
export class UserListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  users: any = [];

  searchControl = new FormControl('');

  userService = inject(UserService);

  ngOnInit(): void {
    this.userService
      .getUserLists()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.users = data;
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .pipe(
        switchMap((query) => this.userService.getUserLists(query || '')),
        takeUntil(this.destroy$)
      )
      .subscribe((users) => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
