import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; 
import { DockDto, CreatingDockDto, UpdateDockDto, VesselTypeDto } from '../../core/models/dock';
//import { VesselTypeDto } from '../../core/models/vesseltype';
import { Api } from '../../core/services/api';
//import { VesselType } from '../vesseltype/vesseltype';

//type DockFormModel = DockDto | (CreatingDockDto & { vesselTypeIds: string[] });
type DockFormModel = DockDto | CreatingDockDto | UpdateDockDto;

@Component({
  selector: 'app-dock',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './dock.html',
  styleUrl: './dock.css',
})
export class Dock implements OnInit {
  private readonly endpoint = 'Docks';
  private readonly vesselTypesEndpoint = "VesselTypes"
  errorField: string[] = [];

  docks: DockDto[] = [];
  availableVesselTypes: VesselTypeDto[] = [];
  selectedDock: DockDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;
  
  formModel: DockFormModel = {} as DockFormModel;

  vesselTypeToAddId: string | null = null;
  selectedVesselType: string | null = null;


  constructor( private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadDocks();
    this.loadVesseTypes();
  }

  clearFeedback(): void {
    this.feedbackMessage = { type: null, text: null };
    this.errorField = [];
  }

  loadVesseTypes(): void {
      this.api.getAll<VesselTypeDto>(this.vesselTypesEndpoint).subscribe({
        next: (data) => {
          this.availableVesselTypes = data;
        },
        error: (err) => {
          console.error('Erro ao carregar Vessel Types', err);
        }
      });
    }

  loadDocks(): void {
    this.isLoading = true;
    this.api.getAll<DockDto>(this.endpoint).subscribe({
      next: (data) => {
        this.docks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar docas', err);
        this.isLoading = false;
      }
    });
  }

  selectDock(dock: DockDto): void {
    this.clearFeedback();

    this.selectedVesselType = null;
    this.vesselTypeToAddId = null;
    this.selectedDock = dock;
    this.formModel = { ...dock, vesselTypeIds: [...(dock.vesselTypeIds || [] )]  } as DockFormModel;

    this.currentFormMode = 'update';
  }

  startCreate(): void {
    this.clearFeedback();
    this.selectedVesselType = null;
    this.vesselTypeToAddId = null;
    
    this.selectedDock = null;
    this.currentFormMode = 'create';
    this.formModel = {
        name: '', 
        locationX: 0, 
        locationZ: 0, 
        locationOrientation: 0, 
        length: 0, 
        depth: 0, 
        maxDraft: 0,
        capacity: 0,
        vesselTypeIds: []
    } as DockFormModel;
  }


  getVesselTypeName(id: string): string {
    const vt = this.availableVesselTypes.find(v => v.id === id);
    return vt ? vt.name : 'ID: ${id}';
  }

addVesselType(): void {
    if (this.currentFormMode !== 'view' && this.vesselTypeToAddId) {
      const vesseltypes = (this.formModel as DockFormModel).vesselTypeIds;

      if (!vesseltypes.includes(this.vesselTypeToAddId)) {
        vesseltypes.push(this.vesselTypeToAddId);
        this.vesselTypeToAddId = null;
        this.clearFeedback();
      } else {
        this.feedbackMessage = {
          type: 'error', 
          text: this.translate.instant('DOCK.VESSELTYPE_ALREADY_ADDED')
        };
      }
    }
  }


removeSelectedVesselType(): void {
    if (this.currentFormMode !== 'view' && this.selectedVesselType) {
      const vesseltypes: string[] = (this.formModel as DockFormModel).vesselTypeIds;

      const index = vesseltypes.indexOf(this.selectedVesselType);
      if (index > -1) {
        vesseltypes.splice(index, 1);
        this.selectedVesselType = null;
        this.clearFeedback();
      }
    }
  }


get availableVesselTypesForAdd(): VesselTypeDto[] {
    const associatedVesselTypes = (this.formModel as DockFormModel).vesselTypeIds || [];
    return this.availableVesselTypes.filter(vesseltype => !associatedVesselTypes.includes(vesseltype.id));
  }

  saveDock(): void {
    this.clearFeedback();
    this.isSubmitting = true;

    const { id, ...dtoBase } = this.formModel as DockDto;

    if (this.currentFormMode === 'create') {
      const creatingDto: CreatingDockDto = {
        ...dtoBase, 
        vesselTypeIds: (this.formModel as DockFormModel).vesselTypeIds
      };
      this.createDock(creatingDto);
    } else if (this.currentFormMode === 'update') {
      const updateDto: UpdateDockDto = {
        ...dtoBase, 
        vesselTypeIds: (this.formModel as DockFormModel).vesselTypeIds
      };
      this.updateDock(this.selectedDock!.id, updateDto);
    }
  
  }

  createDock(dto: CreatingDockDto): void {
    this.api.create<DockDto>(this.endpoint, dto).subscribe({
      next: (newDock) => {
        this.loadDocks();
        
        this.selectedDock = newDock;

        this.currentFormMode = 'update';
        this.formModel = { ...newDock };
        
        this.feedbackMessage = {
          type: 'success', 
          text: this.translate.instant('DOCK.CREATE_SUCCESS')
        };
        
      },
      error: (err) => {
        let text = this.translate.instant('DOCK.CREATE_FAILURE');

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

  updateDock(id: string, dto: UpdateDockDto): void {
    this.api.update<DockDto>(this.endpoint, id, dto).subscribe({
      next: (updatedDock) => {
        this.loadDocks();

       const index = this.docks.findIndex(vt => vt.id === updatedDock.id);
        if (index !== -1) {
          this.docks[index] = updatedDock;
        }

        this.selectedDock = updatedDock;

        this.feedbackMessage = {
          type: 'success', 
          text: this.translate.instant('DOCK.UPDATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('DOCK.UPDATE_FAILURE');

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
        translateKey: "DOCK.NAME_REQUIRED"
      },
      "Error converting value {null} to type 'System.Single'. Path 'locationX'": {
        field: "locationX", 
        translateKey: "DOCK.LOCATION_X_REQUIRED"
      },
      "Error converting value {null} to type 'System.Single'. Path 'locationZ'": {
        field: "locationZ", 
        translateKey: "DOCK.LOCATION_Z_REQUIRED"
      },
      "Error converting value {null} to type 'System.Single'. Path 'locationOrientation'": {
        field: "locationOrientation", 
        translateKey: "DOCK.LOCATION_ORIENTATION_REQUIRED"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'length'": {
        field: "length", 
        translateKey: "DOCK.LENGTH_REQUIRED"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'depth'": {
        field: "depth", 
        translateKey: "DOCK.DEPTH_REQUIRED"
      },
      "is too large or small for an Int32. Path 'maxDraft'": {
        field: "maxDraft", 
        translateKey: "DOCK.MAXDRAFT_INVALID"
      },
      "is not a valid integer. Path 'capacity'": {
        field: "capacity", 
        translateKey: "DOCK.CAPACITY_INVALID"
      },
     
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
