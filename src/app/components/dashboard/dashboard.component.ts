import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  userCount: number = 0;
  leadCount: number = 0;
  customerCount: number = 0;
  allUsers: User[] = [];
  allLeads: User[] = [];
  allCustomers: User[] = [];

  constructor(public service: FirebaseService) {
  }

  ngOnInit() {
    this.service.getDataObservable('users').subscribe((data) => {
      this.allUsers = data.map((rawData) => new User({ ...rawData }));
      this.userCount = this.allUsers.length;
    });
  
    this.service.getDataObservable('leads').subscribe((data) => {
      this.allLeads = data.map((rawData) => new User({ ...rawData }));
      this.leadCount = this.allLeads.length;
    });

    this.service.getDataObservable('customers').subscribe((data) => {
      this.allCustomers = data.map((rawData) => new User({ ...rawData }));
      this.customerCount = this.allCustomers.length;
    });
  }
}
