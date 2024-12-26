import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  fetchedCollection$: Observable<any[]>;
  userCount: number = 0;
  loaded: boolean = false;
  allUsers: User[] = [];

  constructor(private service: FirebaseService) {
    service.getData('users');
    this.fetchedCollection$ = this.service.fetchedCollection$;
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
      this.userCount = this.allUsers.length;
    });
  }
}
