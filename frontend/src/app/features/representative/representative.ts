import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; 
import { RepresentativeDto, CreatingRepresentativeDto, UpdateRepresentativeDto } from '../../core/models/representative';
import { ShippingAgentOrganizationDto } from '../../core/models/shippingagentorganization';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-representative',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './representative.html',
  styleUrl: './representative.css',
})
export class Representative implements OnInit {
  private readonly endpoint = 'Representatives';
  errorField: string[] = [];
  representatives: RepresentativeDto[] = [];
  selectedRepresentative: RepresentativeDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;
  
  formModel: RepresentativeDto | CreatingRepresentativeDto | UpdateRepresentativeDto = {} as RepresentativeDto;
  organizationNames: { [id: string]: string } = {};

  constructor( private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadRepresentatives();
  }

  clearFeedback(): void {
    this.feedbackMessage = { type: null, text: null };
    this.errorField = [];
  }

  loadRepresentatives(): void {
    this.isLoading = true;
    this.api.getAll<RepresentativeDto>(this.endpoint).subscribe({
      next: (data) => {
        this.representatives = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar representantes', err);
        this.isLoading = false;
      }
    });
  }

  selectRepresentative(representative: RepresentativeDto): void {
    this.clearFeedback();

    this.selectedRepresentative = representative;
    this.formModel = { ...representative };

    this.loadOrganizationName(representative.shippingAgentOrganizationId);
    
    this.currentFormMode = representative.active ? 'update' : 'view';
  }

  startCreate(): void {
    this.clearFeedback();
    
    this.selectedRepresentative = null;
    this.currentFormMode = 'create';
    this.formModel = {} as CreatingRepresentativeDto;
  }

  saveRepresentative(): void {
    this.clearFeedback();
    this.isSubmitting = true;

    if (this.currentFormMode === 'create') {
      this.createRepresentative(this.formModel as CreatingRepresentativeDto);
    } else if (this.currentFormMode === 'update') {
      this.updateRepresentative(this.selectedRepresentative!.id, this.formModel as UpdateRepresentativeDto);
    }
  }

  createRepresentative(dto: CreatingRepresentativeDto): void {
    this.api.create<RepresentativeDto>(this.endpoint, dto).subscribe({
      next: (newRepresentative) => {
        this.loadRepresentatives();
        
        this.selectedRepresentative = { 
          ...newRepresentative,
          active: true 
        };
        this.currentFormMode = 'update';
        this.formModel = { ...newRepresentative };
        
        this.feedbackMessage = { 
          type: 'success', 
          text: this.translate.instant('REPRESENTATIVE.CREATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('REPRESENTATIVE.CREATE_FAILURE')

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

  updateRepresentative(id: string, dto: UpdateRepresentativeDto): void {
    this.api.update<RepresentativeDto>(this.endpoint, id, dto).subscribe({
      next: (updatedRepresentative) => {
        this.loadRepresentatives();
        
        this.selectedRepresentative = updatedRepresentative;
        this.formModel = { ...updatedRepresentative };
        
        this.feedbackMessage = { 
          type: 'success', 
          text: this.translate.instant('REPRESENTATIVE.UPDATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('REPRESENTATIVE.UPDATE_FAILURE')

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

  deactivation(): void {
    if (this.selectedRepresentative && this.selectedRepresentative.active) {
      if (!confirm(`${this.translate.instant('CONFIRM.ACTION', { action: 'Desativar' })}`)) {
        return;
      }
      
      this.api.delete(this.endpoint, this.selectedRepresentative.id).subscribe({
        next: () => {
          this.loadRepresentatives();
          this.currentFormMode = 'view';
          this.selectedRepresentative = null;
        },
        error: (err) => {
          console.error(`Erro ao desativar`, err);
        }
      });
    }
  }

  loadOrganizationName(id: string): void {
    if (!id) return;

    if (this.organizationNames[id]) return;

    this.api.getById<ShippingAgentOrganizationDto>('ShippingAgentOrganizations', id).subscribe({
      next: org => {
        this.organizationNames[id] = org.legalName;
      },
      error: err => {
        console.error('Erro ao carregar organização', err);
        this.organizationNames[id] = this.translate.instant('COMMON.NO_DATA');
      }
    });
  }

  getOrganizationName(id?: string): string {
    if (!id) return '';
    return this.organizationNames[id] || this.translate.instant('COMMON.LOADING');
  }

  private handleErrorMessage(errorMessage: string) {
    const errorMap: Record<string, { field: string, translateKey: string }> = {
      "Citizen ID is required.": {
        field: "citizenId",
        translateKey: "REPRESENTATIVE.ID_REQUIRED"
      },
      "Name is required.": {
        field: "name",
        translateKey: "REPRESENTATIVE.NAME_REQUIRED"
      },
      "E-mail is required.": {
        field: "email",
        translateKey: "REPRESENTATIVE.EMAIL_REQUIRED"
      },
      "Invalid E-mail format.": {
        field: "email",
        translateKey: "REPRESENTATIVE.EMAIL_INVALID_FORMAT"
      },
      "Nationality is required.": {
        field: "nationality",
        translateKey: "REPRESENTATIVE.NATIONALITY_REQUIRED"
      },
      "Phone number must be a positive integer.": {
        field: "phoneNumber",
        translateKey: "REPRESENTATIVE.PHONE_NUMBER_INVALID"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'phoneNumber'": {
        field: "phoneNumber",
        translateKey: "REPRESENTATIVE.PHONE_NUMBER_REQUIRED"
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
}
