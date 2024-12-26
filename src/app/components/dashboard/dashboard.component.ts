import { Component, OnInit, OnDestroy } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  unsubscribe;
  allUsers: User[] = [];
  userCount: number = 0;
  loaded: boolean = false;

  constructor(private firestore: Firestore, private service: FirebaseService) {
    service.getData('users')
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
        console.log('Aktuelle Benutzer:', this.allUsers);
        this.userCount = this.allUsers.length
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
}
