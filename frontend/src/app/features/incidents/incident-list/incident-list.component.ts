import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IncidentService } from '../../../core/services/incident.service';
import { Incident } from '../../../core/models/incident';
import {TranslatePipe} from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];

  constructor(
    private incidentService: IncidentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(status?: string) {
    const filters = status ? { status } : {};
    this.incidentService.getAll(filters).subscribe(data => {
      this.incidents = data;
    });
  }

  filterStatus(event: any) {
    this.loadIncidents(event.target.value);
  }

  resolveIncident(inc: Incident) {
    console.log('Botão clicado para o incidente:', inc);


    const incidentId = inc.id || (inc as any).domainId;

    if (!incidentId) {
      alert('ERRO: O ID do incidente está indefinido! Verifica o modelo de dados.');
      console.error('Objeto sem ID:', inc);
      return;
    }

    const endTime = new Date().toISOString();

    if(confirm('Tens a certeza que queres marcar este incidente como RESOLVIDO?')) {

      this.incidentService.resolve(incidentId, endTime).subscribe({
        next: (res) => {
          console.log('Sucesso:', res);
          alert('Incidente resolvido com sucesso!');
          this.loadIncidents();
        },
        error: (err) => {
          console.error('Erro no Backend:', err);

          alert('Ocorreu um erro ao resolver: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  openCreateModal() {
    this.router.navigate(['/incidents/create']);
  }
}
