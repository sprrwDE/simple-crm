/* import { Component, OnInit, OnDestroy } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  unsubscribe;
  allUsers: User[] = [];
  userCount: number = 0;
  loaded: boolean = false;

  constructor(private firestore: Firestore, private service: FirebaseService) {

    try {
      this.unsubscribe = onSnapshot(this.getUsers(), (snapshot) => {
        this.allUsers = [];
        snapshot.docs.forEach((doc) => {
          const rawData = doc.data();
          const user = new User({
            ...rawData,
          });
          this.allUsers.push(user);
          this.loaded = true;
        });
        this.userCount = this.allUsers.length;
      });
    } catch (error) {
      console.error('Fehler beim Laden der Benutzer:', error);
    }
  }

  ngOnDestroy() {
    if (this.unsubscribe) this.unsubscribe();
  }

  getUsers() {
    return collection(this.firestore, 'users');
  }
} */

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
      console.log(this.loaded);
      this.fetchedCollection$.subscribe((data) => {
        this.allUsers = data.map(
          (rawData) =>
            new User({
              ...rawData,
            })
        );
        this.allUsers.length > 0 ? this.loaded = true : this.loaded = false;
        console.log(this.loaded);
        this.userCount = this.allUsers.length;
        console.log('hello', this.allUsers);
      });
    }
  }
  
  