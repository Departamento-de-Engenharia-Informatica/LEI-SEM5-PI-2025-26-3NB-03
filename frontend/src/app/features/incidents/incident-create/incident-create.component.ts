import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidentService } from '../../../core/services/incident.service';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-incident-create',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, TranslateModule],
  templateUrl: './incident-create.component.html',
  styleUrls: ['./incident-create.component.css']
})
export class IncidentCreateComponent {
  incident = {
    title: '',
    description: '',
    incidentType: 'Mechanical',
    severity: 'MINOR',
    affectedVVEs: '',
    startTime: new Date().toISOString().slice(0, 16),
    createdBy: 'Admin'
  };

  constructor(private incidentService: IncidentService, private router: Router) {}

  onSubmit() {

    const payload = {
      ...this.incident,
      affectedVVEs: this.incident.affectedVVEs.split(',').map(id => id.trim()).filter(id => id)
    };

    this.incidentService.create(payload).subscribe({
      next: () => {
        alert('Incidente registado com sucesso!');
        this.router.navigate(['/incidents']);
      },
      error: (err) => alert('Erro: ' + err.message)
    });
  }
}
