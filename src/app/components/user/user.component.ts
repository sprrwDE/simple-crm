import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';

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
  fetchedCollection$: Observable<any[]>;
  allUsers: User[] = [];
  loaded: boolean = false;

  constructor(public dialog: MatDialog, private service: FirebaseService) {
    this.fetchedCollection$ = this.service.fetchedCollection$;
    service.getData('users');
  }

  ngOnInit() {
    this.fetchedCollection$.subscribe((data) => {
      this.allUsers = data.map(
        (rawData) =>
          new User({
            ...rawData,
          })
      );
      this.allUsers.length > 0 ? (this.loaded = true) : (this.loaded = false);
      // Workaround -> bad, umschreiben
      console.log('hello', this.allUsers);
    });
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
    });
  }
}
