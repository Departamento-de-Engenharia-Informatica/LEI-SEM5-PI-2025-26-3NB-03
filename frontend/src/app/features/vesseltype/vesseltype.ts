import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; 
import { VesselTypeDto, CreatingVesselTypeDto, UpdateVesselTypeDto } from '../../core/models/vesseltype';
import { Api } from '../../core/services/api';

@Component({
  selector: 'app-vesseltype',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './vesseltype.html',
  styleUrl: './vesseltype.css',
})
export class VesselType implements OnInit {
  private readonly endpoint = 'vesseltype';
  vesseltypes: VesselTypeDto[] = [];
  selectedVesselType: VesselTypeDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;
  
  formModel: VesselTypeDto | CreatingVesselTypeDto | UpdateVesselTypeDto = {} as VesselTypeDto;

  constructor( private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadVesselTypes();
  }

  clearFeedback(): void {
    this.feedbackMessage = { type: null, text: null };
  }

  loadVesselTypes(): void {
    this.isLoading = true;
    this.api.getAll<VesselTypeDto>(this.endpoint).subscribe({
      next: (data) => {
        this.vesseltypes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Tipos de Embarcação', err);
        this.isLoading = false;
      }
    });
  }

  selectVesselType(vesseltype: VesselTypeDto): void {
    this.clearFeedback();

    this.selectedVesselType = vesseltype;
    this.formModel = { ...vesseltype };
    this.currentFormMode = 'update';
    
       }

  startCreate(): void {
    this.clearFeedback();
    
    this.selectedVesselType = null;
    this.currentFormMode = 'create';
    this.formModel = {} as CreatingVesselTypeDto;
  }

  saveVesselType(): void {
    this.clearFeedback();
    this.isSubmitting = true;

    if (this.currentFormMode === 'create') {
      this.createVesselType(this.formModel as CreatingVesselTypeDto);
    } else if (this.currentFormMode === 'update') {
      this.updateVesselType(this.selectedVesselType!.id, this.formModel as UpdateVesselTypeDto);
    }
  }

  createVesselType(dto: CreatingVesselTypeDto): void {
    this.api.create<VesselTypeDto>(this.endpoint, dto).subscribe({
      next: (newVesselType) => {
        this.loadVesselTypes();
        
        this.selectedVesselType = { 
          ...newVesselType
        };
        this.currentFormMode = 'update';
        this.formModel = { ...newVesselType };
        
        this.feedbackMessage = { 
          type: 'success', 
          text: this.translate.instant('MESSAGE.CREATE_SUCCESS', { name: newVesselType.name })
        };
      },
      error: (err) => {
        console.error('Erro ao criar tipo de embarcação', err);
        this.feedbackMessage = { 
          type: 'error', 
          text: this.extractErrorMessage(err)
        };
      }
    }).add(() => this.isSubmitting = false);
  }

  updateVesselType(id: string, dto: UpdateVesselTypeDto): void {
    this.api.update<VesselTypeDto>(this.endpoint, id, dto).subscribe({
      next: (updatedVesselType) => {
        this.loadVesselTypes();
        
        this.selectedVesselType = updatedVesselType;
        this.formModel = { ...updatedVesselType };
        
        this.feedbackMessage = { 
          type: 'success', 
          text: this.translate.instant('MESSAGE.UPDATE_SUCCESS', { name: updatedVesselType.name })
        };
      },
      error: (err) => {
        console.error('Erro ao atualizar tipo de embarcação', err);
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

  
}
