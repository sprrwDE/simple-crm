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
  // collectionData,
  onSnapshot,
  doc,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
// import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
// import { query } from '@angular/fire/firestore';
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
  // unsubSingle;

  getUsers() {
    return collection(this.firestore, 'users');
  }

  constructor(public dialog: MatDialog) {
    this.unsubList = onSnapshot(this.getUsers(), (list) => {
      list.forEach((element) => {
        const userData = element.data() as User; 
        this.allUsers.push(userData);
        // console.log(this.allUsers);
        // this.getSingleUser('users', element.id);
      });
    });

    /* 
    this.unsubSingle = onSnapshot(this.getSingleUser("users", "0TOAS3I6O16HqkGAqYc8"), (element) => {
      list.forEach(list => {
        console.log(list)
      })
    }) */
  }

  ngonDestroy() {
    this.unsubList();
  }

  getSingleUser(colId: string, docId: string) {
    console.log(doc(collection(this.firestore, colId), docId));
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
    });
  }
}
