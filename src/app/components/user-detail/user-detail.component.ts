import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, Router, RouterModule } from '@angular/router'; // Router importiert
import { MatCardModule } from '@angular/material/card';
import { inject } from '@angular/core';
import {
  Firestore,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FirebaseService } from '../../services/firebase.service';

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
  fetchedSingleData$: Observable<any>

  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    public service: FirebaseService
  ) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.fetchedSingleData$ = this.service.fetchedSingleData$
    service.getSingleDoc('users', this.id)
  }

  ngOnInit() {
    this.fetchedSingleData$.subscribe((data) => {
      this.user = new User(data)
      console.log('blaaaasdadsada', this.user)
    })
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
