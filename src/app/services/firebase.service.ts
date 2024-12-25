import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  unsubscribe;
  allUsers: User[] = [];

  constructor(public firestore: Firestore) {
    try {
      this.unsubscribe = onSnapshot(this.getUsers(), (list) => {
        this.allUsers = [];
        list.docs.forEach((element) => {
          const rawData = element.data();
          const user = new User({
            ...rawData,
            id: element.id,
          });
          this.allUsers.push(user);
          // this.loaded = true;
        });
      });
    } catch (error) {
      console.error('error', error);
    }
  }

  getUsers() {
    return collection(this.firestore, 'users');
  }
}
