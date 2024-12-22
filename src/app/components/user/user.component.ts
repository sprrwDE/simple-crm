import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  onSnapshot,
  doc,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  firestore = inject(Firestore);
  allUsers: User[] = [];
  unsubList;

  getUsers() {
    return collection(this.firestore, 'users');
  }

  constructor(public dialog: MatDialog) {
    this.unsubList = onSnapshot(this.getUsers(), (list) => {
      this.allUsers = []
      list.forEach((element) => {
        const rawData = element.data(); 
        const user = new User({
          ...rawData,
          id: element.id, 
        });
        this.allUsers.push(user); 
      });
      console.log(this.allUsers);
    });
  }

  ngonDestroy() {
    this.unsubList();
  }

  test(user:any) {
    console.log(user.id)
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
    });
  }
}




// fragen warum array clearen -> richtiger weg?
// warum kommen neue user nicht unten
// warum in console.log nicht immer firstName das erste