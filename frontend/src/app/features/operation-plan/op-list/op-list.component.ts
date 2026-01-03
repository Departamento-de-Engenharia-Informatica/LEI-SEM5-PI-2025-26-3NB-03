import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { OperationPlanService } from '../../../core/services/operation-plan.service';
import { OperationPlan } from '../../../core/models/operation-plan';

@Component({
  selector: 'app-op-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
  templateUrl: './op-list.component.html',
  styleUrls: ['./op-list.component.css']
})
export class OpListComponent implements OnInit {
  plans: OperationPlan[] = [];
  filterVesselId = '';
  filterDate = '';

  constructor(private service: OperationPlanService) {}

  ngOnInit(): void { this.loadPlans(); }

  loadPlans() {
    this.service.getAll(this.filterVesselId, this.filterDate).subscribe({
      next: (data) => this.plans = data,
      error: (err) => console.error(err)
    });
  }

  getOperationCount(plan: OperationPlan): number {
    return plan.operations ? plan.operations.length : 0;
  }

  deletePlan(plan: OperationPlan) {
    if (confirm('Tem a certeza que quer eliminar este plano?')) {
      this.service.delete(plan.id).subscribe({
        next: () => {

          this.loadPlans();
        },
        error: (err) => alert('Erro ao eliminar: ' + err.message)
      });
    }
  }
}
