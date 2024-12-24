import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import {
  Firestore,
  collection,
  doc,
  updateDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {
  user: User = new User();
  birthDate!: Date;
  loading: boolean = false;

  constructor(private firestore: Firestore) {
    console.log(this.user.id);
  }

  getSingleUser() {
    return doc(collection(this.firestore, 'users'), this.user.id);
  }

  async editUser() {
    this.loading = true;
    await updateDoc(this.getSingleUser(), this.user.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        this.loading = false;
      });
  }

}

// Wie Autofill Datum?
