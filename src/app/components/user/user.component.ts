import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { query } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  firestore = inject(Firestore);
  users$: Observable<any>;
  allUsers = [];

  getUsers() {
    return collection(this.firestore, 'users')
    // const collectionRef = collection(this.firestore, 'users');
    // return query(collectionRef);
  }

  constructor(public dialog: MatDialog) {
    this.users$ = collectionData(this.getUsers());
  }

  ngOnInit() {
    console.log(this.getUsers());
    console.log(this.users$)
    
/* this.users$.subscribe((users) => {
      console.log(users);
    });  */
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
    });
  }
}
