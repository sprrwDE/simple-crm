import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, doc } from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private fetchedCollectionSubject = new BehaviorSubject<DocumentData[]>([]);
  fetchedCollection$ = this.fetchedCollectionSubject.asObservable();

  private fetchedSingleSubject = new BehaviorSubject<DocumentData>({});
  fetchedSingleData$ = this.fetchedSingleSubject.asObservable();

  constructor(public firestore: Firestore) {}

  getData(db: string) {
    try {
      onSnapshot(collection(this.firestore, db), (list) => {
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

  getSingleDoc(db: string, id: string) {
    onSnapshot(doc(this.firestore, db, id), (element) => {
      const fetchedData: DocumentData = {...element.data()};
      this.fetchedSingleSubject.next(fetchedData);

      console.log('uff', fetchedData);
    });
  }
}
