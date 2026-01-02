import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { VisitExecutionService } from '../../../core/services/visit-execution.service';
import { CreateVisitExecutionDto } from '../../../core/models/visit-execution';

@Component({
  selector: 'app-vve-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
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

  message: string = '';
  isError: boolean = false;

  constructor(private service: VisitExecutionService) {}

  onSubmit() {
    this.message = '';


    if (this.formData.arrivalTime) {
      this.formData.arrivalTime = new Date(this.formData.arrivalTime).toISOString();
    }

    this.service.create(this.formData).subscribe({
      next: (res) => {
        this.message = 'VVE criada com sucesso! (In Progress)';
        this.isError = false;

        this.formData = {
          vvnId: '',
          vesselId: '',
          arrivalTime: '',
          creatorId: 'operador_logistico_01'
        };
      },
      error: (err) => {
        this.isError = true;
        this.message = 'Erro ao criar VVE: ' + (err.error?.message || err.message || 'Erro desconhecido');
        console.error(err);
      }
    });
  }
}
