import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyService } from '../../../core/services/privacy.service';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  currentUserId = 'user-test-123';
  userData: any = null;

  constructor(private privacyService: PrivacyService) {}


  downloadMyData() {
    this.privacyService.exportData(this.currentUserId).subscribe({
      next: (data) => {

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meus_dados_${this.currentUserId}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => alert('Erro ao descarregar dados: ' + err.message)
    });
  }


  deleteMyAccount() {
    if (confirm('⚠️ ATENÇÃO: Tem a certeza que quer eliminar a sua conta? \nEsta ação é irreversível e os seus dados serão anonimizados.')) {
      this.privacyService.deleteAccount(this.currentUserId).subscribe({
        next: () => {
          alert('Conta encerrada com sucesso.');

        },
        error: (err) => alert('Erro ao eliminar conta: ' + err.message)
      });
    }
  }
}
