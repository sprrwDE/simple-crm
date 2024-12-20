import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {

  user:User = new User()
  birthDate!: Date;

  constructor() {}

  saveUser() {
    this.user.birthDate = this.birthDate.getTime()
    console.log(this.user)
  }
}
