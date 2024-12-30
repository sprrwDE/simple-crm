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
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    public service: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: { status: string }
  ) {
    this.user.status = data.status;
  }

  async saveUser() {
    if (this.user.birthDate) {
      this.user.birthDate = this.birthDate.getDate();
    }

    this.service.saveDoc(this.data.status, this.user);
  }
}
