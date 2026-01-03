import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OperationPlanService } from '../../../core/services/operation-plan.service';
import { OperationPlan, UpdateOperationPlanDto } from '../../../core/models/operation-plan';

@Component({
  selector: 'app-op-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './op-edit.component.html',
  styleUrls: ['./op-edit.component.css']
})
export class OpEditComponent implements OnInit {
  planId: string = '';
  plan: OperationPlan | null = null;

  message = '';
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OperationPlanService
  ) {}

  ngOnInit() {
    this.planId = this.route.snapshot.paramMap.get('id') || '';
    if (this.planId) this.loadPlan();
  }

  loadPlan() {

    this.service.getAll().subscribe({
      next: (plans) => {
        this.plan = plans.find(p => p.id === this.planId) || null;
        if (!this.plan) this.message = 'Plano não encontrado.';
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (!this.plan) return;

    const dto: UpdateOperationPlanDto = {
      id: this.plan.id,
      status: this.plan.status,
      date: this.plan.date,
      operations: this.plan.operations
    };

    this.service.update(this.plan.id, dto).subscribe({
      next: () => {
        this.message = 'Plano atualizado com sucesso!';
        this.isError = false;
        setTimeout(() => this.router.navigate(['/operation-plans']), 1500);
      },
      error: () => {
        this.isError = true;
        this.message = 'Erro ao atualizar plano.';
      }
    });
  }
}
