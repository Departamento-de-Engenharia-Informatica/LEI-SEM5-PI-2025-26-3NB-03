import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import {
  UpdateQualificationDto,
  QualificationDto
} from '../../core/models/qualification';
import { QualificationsService } from '../../core/services/qualifications.service';

@Component({
  standalone: true,
  selector: 'app-qualifications-edit',
  templateUrl: './qualifications-edit.html',
  imports: [CommonModule, FormsModule],
})
export class QualificationsEdit implements OnInit {

  code!: string;

  model: UpdateQualificationDto = {
    name: ''
  };

  isLoading = false;
  isSaving = false;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private service: QualificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.params['id'];
    this.load();
  }

  load() {
    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.service.get(this.code).subscribe({
      next: (q: QualificationDto) => {
        this.model = {
          name: q.name
        };
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar qualificação';
        this.isLoading = false;
      }
    });
  }

  save() {
    this.isSaving = true;
    this.successMessage = null;
    this.errorMessage = null;

    this.service.update(this.code, this.model).subscribe({
      next: () => {
        this.successMessage = 'Qualificação atualizada com sucesso!';
        setTimeout(() => this.router.navigate(['/qualifications']), 1200);
      },
      error: () => {
        this.errorMessage = 'Erro ao atualizar qualificação';
        this.isSaving = false;
      }
    });
  }
}
