import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
  title: string = 'simple-crm';
  isDarkTheme: boolean = false;

  constructor() {
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
