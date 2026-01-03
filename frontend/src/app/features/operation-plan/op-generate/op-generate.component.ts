import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OperationPlanService } from '../../../core/services/operation-plan.service';
import { CreateOperationPlanDto } from '../../../core/models/operation-plan';

@Component({
  selector: 'app-op-generate',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './op-generate.component.html',
  styleUrls: ['./op-generate.component.css']
})
export class OpGenerateComponent {
  dto: CreateOperationPlanDto = {
    vvnId: '',
    vesselId: '',
    date: '',
    algorithm: 'SJF' // Default
  };

  message = '';
  isError = false;

  constructor(private service: OperationPlanService, private router: Router) {}

  onSubmit() {
    this.message = '';


    if(this.dto.date) {
      this.dto.date = new Date(this.dto.date).toISOString();
    }

    this.service.generate(this.dto).subscribe({
      next: (res) => {
        this.message = 'Plano gerado com sucesso!';
        this.isError = false;
        setTimeout(() => this.router.navigate(['/operation-plans']), 1500);
      },
      error: (err) => {
        this.isError = true;
        this.message = 'Erro ao gerar plano.';
        console.error(err);
      }
    });
  }
}
