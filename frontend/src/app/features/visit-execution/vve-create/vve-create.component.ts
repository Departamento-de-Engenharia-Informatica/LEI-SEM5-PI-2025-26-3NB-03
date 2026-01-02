import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitExecutionService } from '../../../core/services/visit-execution.service';
import { CreateVisitExecutionDto } from '../../../core/models/visit-execution';

@Component({
  selector: 'app-vve-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vve-create.component.html',
  styleUrls: ['./vve-create.component.css']
})
export class VveCreateComponent {
  formData: CreateVisitExecutionDto = {
    vvnId: '',
    vesselId: '',
    arrivalTime: '',
    creatorId: 'operador_logistico_01'
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private service: VisitExecutionService,
    private router: Router
  ) {}

  onSubmit() {

    if (this.formData.arrivalTime) {
      this.formData.arrivalTime = new Date(this.formData.arrivalTime).toISOString();
    }

    this.service.create(this.formData).subscribe({
      next: (res) => {
        this.successMessage = 'Chegada do navio registada com sucesso!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000); // Volta ao início
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erro ao registar chegada. Verifica os dados.';
        this.successMessage = '';
      }
    });
  }
}
