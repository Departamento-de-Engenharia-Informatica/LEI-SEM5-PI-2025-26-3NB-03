import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UpdateBerthDockDTO, VisitExecution } from '../../../../core/models/visit-execution';
import { DockDto } from '../../../../core/models/dock';
import { VisitExecutionService } from '../../../../core/services/visit-execution.service';
import { Api } from '../../../../core/services/api';
type VVEFormModel = VisitExecution | UpdateBerthDockDTO;

@Component({
  selector: 'app-update-berth-dock',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './update-berth-dock.html',
  styleUrl: './update-berth-dock.css',
})
export class UpdateBerthDock implements OnInit {
  private readonly endpoint = 'visit-executions';
  private readonly docksEndpoint = 'Docks';
  errorField: string[] = [];

  VVEs: VisitExecution[] = [];

  availableDocks: DockDto[] = [];
  selectedVVE: VisitExecution | null = null;
  currentFormMode: 'view' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;

  formModel: VVEFormModel = {} as VVEFormModel;

  constructor( private oemApi: VisitExecutionService, private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadVVEs();
    this.loadDocks();
  }

  clearFeedback(): void {
    this.feedbackMessage = { type: null, text: null };
    this.errorField = [];
  }

  loadDocks(): void {
    this.api.getAll<DockDto>(this.docksEndpoint).subscribe({
      next: (data) => {
        this.availableDocks = data;
      },
      error: (err) => {
        console.error('Erro ao carregar Docks', err);
      }
    });
  }

  loadVVEs(): void {
    this.isLoading = true;
    this.oemApi.getAll().subscribe({
      next: (data) => {
        this.VVEs = data.filter(vve => vve.status === 'IN_PROGRESS');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar VVEs', err);
        this.isLoading = false;
      }
    });
  }

  selectVVE(VVE: VisitExecution): void {
    this.clearFeedback();

    this.selectedVVE = VVE;
    this.formModel = {
      ...VVE,
      arrivalTime: this.toDatetimeLocal(VVE.arrivalTime)
    };

    this.currentFormMode = 'update';
  }

  saveVVE(): void {
    this.clearFeedback();
    this.isSubmitting = true;

    if (!this.selectedVVE) return;

    const updateDto: UpdateBerthDockDTO = {
      arrivalTime: this.formModel.arrivalTime,
      dockId: this.formModel.dockId
    };

    this.updateVVE(this.selectedVVE.id, updateDto);
  }

  updateVVE(id: string, dto: UpdateBerthDockDTO): void {
    this.oemApi.updateBerthAndDock(id, dto).subscribe({
      next: (updatedVVE) => {
        this.loadVVEs();

        const index = this.VVEs.findIndex(vve => vve.id === updatedVVE.id);
        if (index !== -1) {
          this.VVEs[index] = updatedVVE;
        }

        this.selectedVVE = updatedVVE;

        this.feedbackMessage = {
          type: 'success',
          text: this.translate.instant('VVE.UPDATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('VVE.UPDATE_FAILURE');

        if (err.error?.message) {
          text = err.error.message;
        } else if (err.error?.errors) {
          const allErrors = Object.values(err.error.errors).flat();
          text = allErrors.join(' ');
        }
        this.handleErrorMessage(text);
      }
    }).add(() => this.isSubmitting = false);
  }

  private handleErrorMessage(errorMessage: string) {
    const errorMap: Record<string, { field: string, translateKey: string }> = {
      "child \"arrivalTime\" fails because [\"arrivalTime\" is not allowed to be empty]": {
        field: "berth",
        translateKey: "VVE.BERTH_REQUIRED"
      },
      "child \"dockId\" fails because [\"dockId\" must be a string]": {
        field: "dock",
        translateKey: "VVE.DOCK_REQUIRED"
      }
    };

    const foundTranslations: string[] = [];
    Object.keys(errorMap).forEach(key => {
      if (errorMessage.includes(key)) {
        const mapped = errorMap[key];
        this.errorField.push(mapped.field);

        foundTranslations.push(this.translate.instant(mapped.translateKey));
      }
    });

    if (foundTranslations.length > 0) {
      this.feedbackMessage = {
        type: "error",
        text: foundTranslations.join('<br>')
      };
    } else {
      this.feedbackMessage = {
        type: "error",
        text: errorMessage
      };
    }
  }

  private toDatetimeLocal(dateIso: string | undefined): string | undefined {
    if (!dateIso) return undefined;

    const date = new Date(dateIso);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  formatArrivalDayMonth(arrivalTime?: string): string {
    if (!arrivalTime) return '--/--';

    const date = new Date(arrivalTime);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${day}/${month}`;
  }
}
