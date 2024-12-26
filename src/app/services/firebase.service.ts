import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private fetchedCollectionSubject = new BehaviorSubject<DocumentData[]>([]);
  fetchedCollection$ = this.fetchedCollectionSubject.asObservable();

  constructor(public firestore: Firestore) {}

  getCollection(db: string) {
    return collection(this.firestore, db);
  }

  getData(db: string) {
    try {
      onSnapshot(this.getCollection(db), (list) => {
        const fetchedData: DocumentData[] = [];
        list.docs.forEach((element) => {
          const rawData = {
            ...element.data(),
            id: element.id,
          };
          fetchedData.push(rawData);
        });
        this.fetchedCollectionSubject.next(fetchedData);
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  }
}
