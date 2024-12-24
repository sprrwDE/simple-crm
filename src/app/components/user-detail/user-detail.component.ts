import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  doc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatCardModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  unsubscribe: any;
  routeSub: Subscription;
  firestore: Firestore = inject(Firestore);
  id: string = '';
  user!: User;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getData();
  }

  getData() {
    try {
       this.unsubscribe = onSnapshot(this.getSingleUser(this.id), (element) => {
        let userData = element.data();
        this.user = new User({
          ...userData,
          id: this.id
        });
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      this.loaded = true;
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getSingleUser(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }

  openEditDialog() {
    const dialog = this.dialog.open(EditUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
    });

    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}
