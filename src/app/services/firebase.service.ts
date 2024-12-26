import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private fetchedCollectionSubject = new BehaviorSubject<DocumentData[]>([]);
  fetchedCollection$ = this.fetchedCollectionSubject.asObservable();

  private fetchedSingleSubject = new BehaviorSubject<DocumentData>({});
  fetchedSingleData$ = this.fetchedSingleSubject.asObservable();

  public loaded: boolean = false;

  constructor(public firestore: Firestore) {}

  getData(db: string) {
    this.loaded = false;
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
        this.loaded = true;
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
    }
  }

  getSingleDoc(db: string, id: string) {
    this.loaded = false;
    onSnapshot(doc(this.firestore, db, id), (element) => {
      const fetchedData: DocumentData = { ...element.data() };
      this.fetchedSingleSubject.next(fetchedData);
      this.loaded = true;
    });
  }

  async deleteSingleDoc(db: string, id: string) {
    try {
      const docRef = doc(this.firestore, db, id);
      await deleteDoc(docRef);
      console.log('Document successfully deleted!');
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  }

  async saveDoc(db: string, data: any) {
    this.loaded = false;
    try {
      await addDoc(collection(this.firestore, db), data.toJSON());
    } catch (error) {
      console.error('Error saving user: ', error);
    } finally {
      this.loaded = true;
    }
  }

  async editDoc(db: string, id: string, data: any) {
    this.loaded = false;
    await updateDoc(doc(collection(this.firestore, db), id), data.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        this.loaded = true;
      });
  }
}
