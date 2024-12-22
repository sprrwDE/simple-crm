import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  Firestore,
  collection,
  onSnapshot,
  doc,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  firestore:Firestore = inject(Firestore);
  allUsers: User[] = [];
  loaded: boolean = false;
  unsubscribe;

  getUsers() {
    return collection(this.firestore, 'users');
  }

  constructor(public dialog: MatDialog) {
    try {
      this.unsubscribe = onSnapshot(this.getUsers(), (list) => {
        this.allUsers = [];
        list.forEach((element) => {
          const rawData = element.data();
          const user = new User({
            ...rawData,
            id: element.id,
          });
          this.allUsers.push(user);
          this.loaded = true;
        });
      });
    } catch (error) {
      console.error('error', error);
    }
  }

  ngonDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
    });
  }

  logUserId(user: any) {
    console.log(user.id);
  }
}