import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAkAydBHzVSOUdyDG4yjvsUZHAP5TFss00",
  authDomain: "simple-crm-28a05.firebaseapp.com",
  projectId: "simple-crm-28a05",
  storageBucket: "simple-crm-28a05.firebasestorage.app",
  messagingSenderId: "245225813153",
  appId: "1:245225813153:web:176f9946d7fb922bb62ce0"
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  firestore: Firestore = inject(Firestore);
  title: string = 'simple-crm';
  isDarkTheme: boolean = false;

  constructor() {
    initializeApp(firebaseConfig);
    this.toggleDarkTheme();
  }

  toggleDarkTheme() {
    const body = document.body;
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
