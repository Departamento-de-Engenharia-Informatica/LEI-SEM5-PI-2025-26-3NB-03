import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loginError = false;

  // O Angular injeta o AuthService e o Router automaticamente
  constructor(private authService: Auth, private router: Router) { }

  onLogin() {
    this.loginError = false; // Reset da mensagem de erro

    // Chama a lógica de autenticação hardcoded do serviço
    const success = this.authService.login(this.email, this.password);

    if (success) {
      // Se for bem-sucedido, navega para a página inicial (dashboard)
      this.router.navigate(['/dashboard']); 
    } else {
      // Se falhar, mostra a mensagem de erro
      this.loginError = true;
    }
  }
}