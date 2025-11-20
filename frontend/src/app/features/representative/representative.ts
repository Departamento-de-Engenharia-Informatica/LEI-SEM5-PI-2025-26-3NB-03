import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; 
import { RepresentativeDto, CreatingRepresentativeDto, UpdateRepresentativeDto } from '../../core/models/representative';
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
  representatives: RepresentativeDto[] = [];
  selectedRepresentative: RepresentativeDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;
  
  formModel: RepresentativeDto | CreatingRepresentativeDto | UpdateRepresentativeDto = {} as RepresentativeDto;

  constructor( private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadRepresentatives();
  }

  clearFeedback(): void {
    this.feedbackMessage = { type: null, text: null };
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
    
    if (representative.active) {
      this.currentFormMode = 'update';
    } else {
      this.currentFormMode = 'view';
    }
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
          text: this.translate.instant('MESSAGE.CREATE_SUCCESS', { name: newRepresentative.name })
        };
      },
      error: (err) => {
        console.error('Erro ao criar representante', err);
        this.feedbackMessage = { 
          type: 'error', 
          text: this.extractErrorMessage(err)
        };
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
          text: this.translate.instant('MESSAGE.UPDATE_SUCCESS', { name: updatedRepresentative.name })
        };
      },
      error: (err) => {
        console.error('Erro ao atualizar representante', err);
        this.feedbackMessage = { 
          type: 'error', 
          text: this.extractErrorMessage(err)
        };
      }
    }).add(() => this.isSubmitting = false);
  }

  extractErrorMessage(error: any): string {
    if (error?.error?.Message) {
      return error.error.Message;
    }
    if (error?.error?.errors) {
      const modelErrors = error.error.errors;
      let messages: string[] = [];
      for (const key in modelErrors) {
        if (modelErrors.hasOwnProperty(key)) {
          messages = messages.concat(modelErrors[key]);
        }
      }
      return messages.join('; ');
    }
    
    return this.translate.instant('MESSAGE.GENERIC_ERROR');
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
}
