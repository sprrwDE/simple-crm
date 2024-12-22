import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-dialog',
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
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  user: User = new User();
  birthDate!: Date;
  loading: boolean = false;

  constructor(private firestore: Firestore) {}

  async saveUser() {
    this.loading = true;
    if (this.user.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }

    try {
      const userCollection = collection(this.firestore, 'users');
      await addDoc(userCollection, this.user.toJSON());
      console.log('User successfully saved.');
    } catch (error) {
      console.error('Error saving user: ', error);
    } finally {
      this.loading = false;
    }
  }
}
