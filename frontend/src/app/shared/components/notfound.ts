import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="not-found-main">
      <h2>{{ 'NOT_FOUND.TITLE' | translate }}</h2>
      <p>{{ 'NOT_FOUND.MESSAGE' | translate }}</p>
      <a routerLink="/">{{ 'NOT_FOUND.GO_HOME' | translate }}</a>
    </div>
  `,
  styles: [`
    .not-found-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
      max-width: 600px;
      margin: 2rem auto; /* centraliza no main */
      text-align: center;
      font-family: Arial, sans-serif;
    }

    .not-found-main h2 {
      font-size: 3rem;
      margin: 0;
      color: #e74c3c;
    }

    .not-found-main p {
      font-size: 1.25rem;
      margin: 0.5rem 0 1rem 0;
    }

    .not-found-main a {
      text-decoration: none;
      color: #3498db;
      font-weight: bold;
    }

    .not-found-main a:hover {
      text-decoration: underline;
    }
  `]
})
export class NotFound {}
