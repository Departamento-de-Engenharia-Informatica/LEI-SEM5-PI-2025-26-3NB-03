import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VisitExecutionService } from '../../core/services/visit-execution.service';
import { AuditLogService } from '../../core/services/audit-log.service';

import { VisitExecution, UpdateVisitExecutionDto, AuditLogDto } from '../../core/models/visit-execution';

@Component({
  selector: 'app-vve-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vve-management.html',
  styleUrls: ['./vve-management.css']
})
export class VveManagementComponent implements OnInit {
  visits: VisitExecution[] = [];
  logs: AuditLogDto[] = [];

  selectedId = '';
  selected?: VisitExecution;

  form = {
    status: 'IN_PROGRESS' as 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED',
    arrivalTime: '' 
  };

  message = '';
  isError = false;

  loadingVisits = false;
  loadingLogs = false;

  search = '';
  statusFilter: '' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' = '';
  openLogIndex: number | null = null;
  loadingUpdate = false;


  constructor(
    private vveService: VisitExecutionService,
    private auditService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.loadingVisits = true;
    this.vveService.getAll().subscribe({
      next: (res) => {
        this.visits = res;
        this.loadingVisits = false;
      },
      error: (err) => {
        this.loadingVisits = false;
        this.isError = true;
        this.message = 'Erro ao carregar VVEs: ' + (err.error?.message || err.message || 'Erro desconhecido');
      }
    });
  }

  onSelectChange(): void {
    this.message = '';
    this.isError = false;

    const v = this.visits.find(x => x.id === this.selectedId);
    this.selected = v;

    if (!v) {
      this.logs = [];
      return;
    }

    this.form.status = v.status as 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
    this.form.arrivalTime = this.toDatetimeLocal(v.arrivalTime);

    this.loadLogs(v.id);
  }

  updateSelected(): void {
    if (!this.selected) return;

    const dto: UpdateVisitExecutionDto = {
      status: this.form.status,
      arrivalTime: new Date(this.form.arrivalTime).toISOString()
    };

    this.loadingUpdate = true;

    this.vveService.update(this.selected.id, dto).subscribe({
      next: (updated) => {
        this.loadingUpdate = false;

        this.message = 'Atualização efetuada com sucesso!';
        this.isError = false;

        const idx = this.visits.findIndex(x => x.id === updated.id);
        if (idx >= 0) this.visits[idx] = updated;

        this.selected = updated;
        this.form.status = updated.status as 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
        this.form.arrivalTime = this.toDatetimeLocal(updated.arrivalTime);

        this.loadLogs(updated.id);
      },
      error: (err) => {
        this.loadingUpdate = false;

        this.isError = true;
        this.message = 'Erro ao atualizar: ' + (err.error?.message || err.message || 'Erro desconhecido');
      }
    });
  }

  loadLogs(entityId: string): void {
    this.loadingLogs = true;
    this.auditService.getByEntityId(entityId).subscribe({
      next: (res) => {
        this.logs = res;
        this.loadingLogs = false;
      },
      error: (err) => {
        this.loadingLogs = false;
        this.logs = [];
        this.isError = true;
        this.message = 'Erro ao carregar logs: ' + (err.error?.message || err.message || 'Erro desconhecido');
      }
    });
  }

  formatDetails(details: any): string {
    try {
      return details ? JSON.stringify(details, null, 2) : '';
    } catch {
      return '';
    }
  }

  private toDatetimeLocal(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

    filteredVisits(): VisitExecution[] {
    const q = this.search.trim().toLowerCase();

    return this.visits.filter(v => {
      const matchesText =
        !q ||
        v.vvnId.toLowerCase().includes(q) ||
        v.vesselId.toLowerCase().includes(q) ||
        (v.status ?? '').toLowerCase().includes(q);

      const matchesStatus = !this.statusFilter || v.status === this.statusFilter;

      return matchesText && matchesStatus;
    });
  }

  formatDate(isoOrDate: string): string {
    const d = new Date(isoOrDate);
    if (isNaN(d.getTime())) return isoOrDate;
    return d.toLocaleString('pt-PT');
  }

  statusClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'chip completed';
      case 'DELAYED': return 'chip delayed';
      default: return 'chip progress';
    }
  }

  toggleLog(i: number): void {
    this.openLogIndex = (this.openLogIndex === i) ? null : i;
  }


  
}
