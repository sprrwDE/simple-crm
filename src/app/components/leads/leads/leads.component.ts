import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.class';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../../services/firebase.service';
import { AddUserDialogComponent } from '../../partner/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {
  fetchedCollection$: Observable<any[]>;
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, public service: FirebaseService, private route: ActivatedRoute) {
    this.fetchedCollection$ = this.service.fetchedCollection$;
    service.getData('leads');
  }

  ngOnInit() {
    this.fetchedCollection$.subscribe((data) => {
      this.allUsers = data.map(
        (rawData) =>
          new User({
            ...rawData,
          })
      );
    });
  }

openDialog() {
  const currentPath = this.route.snapshot.url.map((segment) => segment.path).join('/');
    this.dialog.open(AddUserDialogComponent, {
      width: '100%',
      maxWidth: '560px',
      panelClass: 'custom-dialog',
      data: { status: currentPath }, 
    });
  }
}