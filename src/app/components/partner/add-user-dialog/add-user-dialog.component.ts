import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  user: User = new User();
  birthDate!: Date;
  status!: string;

  constructor(public service: FirebaseService) {}

  async saveUser() {
    if (this.user.birthDate) {
      this.user.birthDate = this.birthDate.getDate();
    }
    if (this.user.status) {
      this.status = this.user.status;
    }
    this.service.saveDoc(this.status, this.user);
  }
}
