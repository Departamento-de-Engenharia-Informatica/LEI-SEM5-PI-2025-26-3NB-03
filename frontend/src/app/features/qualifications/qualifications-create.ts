import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QualificationsService } from '../../core/services/qualifications.service';
import { CreateQualificationDto } from '../../core/models/qualification';

@Component({
  standalone: true,
  selector: 'app-qualifications-create',
  templateUrl: './qualifications-create.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./qualifications.css']
})
export class QualificationsCreate {

  model: CreateQualificationDto = {
    code: '',
    name: ''
  };

  isSaving = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private service: QualificationsService,
    private router: Router
  ) {}

  save() {
    this.isSaving = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.service.create(this.model).subscribe({
      next: () => {
        this.successMessage = 'Qualificação criada com sucesso!';
        setTimeout(() => this.router.navigate(['/qualifications']), 1200);
      },
      error: () => {
        this.errorMessage = 'Erro ao criar qualificação';
        this.isSaving = false;
      }
    });
  }
}
