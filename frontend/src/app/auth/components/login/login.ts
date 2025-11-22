import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../core/services/auth';
import { TranslateModule } from '@ngx-translate/core';
import { Header } from '../../../shared/components/header/header';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    Header,
    TranslateModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loginError = false;

  constructor(private authService: Auth, private router: Router) { }

  onLogin() {
    this.loginError = false;

    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigate(['/dashboard']); 
    } else {
      this.loginError = true;
    }
  }
}
