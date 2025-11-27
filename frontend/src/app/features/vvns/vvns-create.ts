import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VvnsService } from '../../core/services/vvns.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-vvns-create',
  templateUrl: './vvns-create.html',
  //styleUrls: ['./vvns-create.css'],
  imports: [CommonModule, FormsModule, TranslatePipe]
})
export class VvnsCreateComponent {

  model = {
    vesselIMO: '',
    vesselName: '',
    representativeId: '',
    representativeName: ''
  };

  isSaving = false;

  constructor(private service: VvnsService, private router: Router) {}

  save() {
    this.isSaving = true;

    this.service.create(this.model).subscribe({
      next: () => {
        this.isSaving = false;

        this.router.navigate(['/viewvvns']);
      },
      error: () => {
        this.isSaving = false;
        alert('Erro ao criar VVN.');
      }
    });
  }
}
