import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { StorageAreaDto, CreatingStorageAreaDto, UpdateStorageAreaDto, DockDto } from '../../core/models/storagearea';
import { Api } from '../../core/services/api';

type StorageAreaFormModel = StorageAreaDto | (CreatingStorageAreaDto & { docks: string[] });

@Component({
  selector: 'app-storagearea',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './storagearea.html',
  styleUrl: './storagearea.css',
})
export class StorageArea implements OnInit {
  private readonly endpoint = 'StorageAreas';
  private readonly docksEndpoint = 'Docks';
  errorField: string[] = [];

  storageAreas: StorageAreaDto[] = [];
  availableDocks: DockDto[] = [];
  selectedStorageArea: StorageAreaDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;

  formModel: StorageAreaFormModel = {} as StorageAreaFormModel;

  dockToAddId: string | null = null;
  selectedDockIdInArea: string | null = null;

  constructor( private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadStorageAreas();
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

  loadStorageAreas(): void {
    this.isLoading = true;
    this.api.getAll<StorageAreaDto>(this.endpoint).subscribe({
      next: (data) => {
        this.storageAreas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Storage Areas', err);
        this.isLoading = false;
      }
    });
  }

  selectStorageArea(storageArea: StorageAreaDto): void {
    this.clearFeedback();
    this.selectedDockIdInArea = null;
    this.dockToAddId = null;

    this.selectedStorageArea = storageArea;
    this.formModel = { ...storageArea, docks: [...(storageArea.docks || [])] } as StorageAreaFormModel;

    this.currentFormMode = 'update';
  }

  startCreate(): void {
    this.clearFeedback();
    this.selectedDockIdInArea = null;
    this.dockToAddId = null;

    this.selectedStorageArea = null;
    this.currentFormMode = 'create';
    this.formModel = {
        type: '', 
        locationX: 0, 
        locationZ: 0, 
        locationOrientation: 0, 
        maximumCapacity: 0, 
        currentOccupancy: 0, 
        docks: []
    } as StorageAreaFormModel;
  }

  getDockName(id: string): string {
    const dock = this.availableDocks.find(d => d.id === id);
    return dock ? dock.name : 'ID: ${id}';
  }

  addDock(): void {
    if (this.currentFormMode !== 'view' && this.dockToAddId) {
      const docks = (this.formModel as StorageAreaFormModel).docks;

      if (!docks.includes(this.dockToAddId)) {
        docks.push(this.dockToAddId);
        this.dockToAddId = null;
        this.clearFeedback();
      } else {
        this.feedbackMessage = {
          type: 'error', 
          text: this.translate.instant('STORAGE_AREA.DOCK_ALREADY_ADDED')
        };
      }
    }
  }

  removeSelectedDock(): void {
    if (this.currentFormMode !== 'view' && this.selectedDockIdInArea) {
      const docks: string[] = (this.formModel as StorageAreaFormModel).docks;

      const index = docks.indexOf(this.selectedDockIdInArea);
      if (index > -1) {
        docks.splice(index, 1);
        this.selectedDockIdInArea = null;
        this.clearFeedback();
      }
    }
  }

  get availableDocksForAdd(): DockDto[] {
    const associatedDocks = (this.formModel as StorageAreaFormModel).docks || [];
    return this.availableDocks.filter(dock => !associatedDocks.includes(dock.id));
  }

  saveStorageArea(): void {
    this.clearFeedback();
    this.isSubmitting = true;

    const { id, ...dtoBase } = this.formModel as StorageAreaDto;

    if (this.currentFormMode === 'create') {
      const creatingDto: CreatingStorageAreaDto = {
        ...dtoBase, 
        docks: (this.formModel as StorageAreaFormModel).docks
      };
      this.createStorageArea(creatingDto);
    } else if (this.currentFormMode === 'update') {
      const updateDto: UpdateStorageAreaDto = {
        ...dtoBase, 
        docks: (this.formModel as StorageAreaFormModel).docks
      };
      this.updateStorageArea(this.selectedStorageArea!.id, updateDto);
    }
  }

  createStorageArea(dto: CreatingStorageAreaDto): void {
    this.api.create<StorageAreaDto>(this.endpoint, dto).subscribe({
      next: (newStorageArea) => {
        this.loadStorageAreas();
        
        this.selectedStorageArea = newStorageArea;

        this.feedbackMessage = {
          type: 'success', 
          text: this.translate.instant('STORAGE_AREA.CREATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('STORAGE_AREA.CREATE_FAILURE');

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

  updateStorageArea(id: string, dto: UpdateStorageAreaDto): void {
    this.api.update<StorageAreaDto>(this.endpoint, id, dto).subscribe({
      next: (updatedStorageArea) => {
        this.loadStorageAreas();

        const index = this.storageAreas.findIndex(sa => sa.id === updatedStorageArea.id);
        if (index !== -1) {
          this.storageAreas[index] = updatedStorageArea;
        }

        this.selectedStorageArea = updatedStorageArea;

        this.feedbackMessage = {
          type: 'success', 
          text: this.translate.instant('STORAGE_AREA.UPDATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('STORAGE_AREA.UPDATE_FAILURE');

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
      "The Type field is required.": {
        field: "type", 
        translateKey: "STORAGE_AREA.TYPE_REQUIRED"
      },
      "Error converting value {null} to type 'System.Single'. Path 'locationX'": {
        field: "locationX", 
        translateKey: "STORAGE_AREA.LOCATION_X_REQUIRED"
      },
      "Error converting value {null} to type 'System.Single'. Path 'locationZ'": {
        field: "locationZ", 
        translateKey: "STORAGE_AREA.LOCATION_Z_REQUIRED"
      },
      "Error converting value {null} to type 'System.Single'. Path 'locationOrientation'": {
        field: "locationOrientation", 
        translateKey: "STORAGE_AREA.LOCATION_ORIENTATION_REQUIRED"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'maximumCapacity'": {
        field: "maximumCapacity", 
        translateKey: "STORAGE_AREA.MAXIMUM_CAPACITY_REQUIRED"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'currentOccupancy'": {
        field: "currentOccupancy", 
        translateKey: "STORAGE_AREA.CURRENT_OCCUPANCY_REQUIRED"
      },
      "is too large or small for an Int32. Path 'maximumCapacity'": {
        field: "maximumCapacity", 
        translateKey: "STORAGE_AREA.MAXIMUM_CAPACITY_INVALID"
      },
      "is too large or small for an Int32. Path 'currentOccupancy'": {
        field: "currentOccupancy", 
        translateKey: "STORAGE_AREA.CURRENT_OCCUPANCY_INVALID"
      },
      "is not a valid integer. Path 'maximumCapacity'": {
        field: "maximumCapacity", 
        translateKey: "STORAGE_AREA.MAXIMUM_CAPACITY_INVALID"
      },
      "is not a valid integer. Path 'currentOccupancy'": {
        field: "currentOccupancy", 
        translateKey: "STORAGE_AREA.CURRENT_OCCUPANCY_INVALID"
      },
      "The field MaximumCapacity must be between 1 and 2147483647.": {
        field: "maximumCapacity", 
        translateKey: "STORAGE_AREA.MAXIMUM_CAPACITY_INVALID"
      },
      "Current occupancy cannot exceed maximum capacity.": {
        field: "currentOccupancy", 
        translateKey: "STORAGE_AREA.OCCUPANCY_EXCEEDS_CAPACITY"
      },
      "Maximum capacity must be greater than zero.": {
        field: "maximumCapacity", 
        translateKey: "STORAGE_AREA.MAXIMUM_CAPACITY_INVALID"
      },
      "Current occupancy cannot be negative.": {
        field: "currentOccupancy", 
        translateKey: "STORAGE_AREA.CURRENT_OCCUPANCY_INVALID"
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
