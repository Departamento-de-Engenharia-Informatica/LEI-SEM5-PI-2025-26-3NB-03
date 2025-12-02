import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PhysicalResourceDto, CreatingPhysicalResourceDto, UpdatingPhysicalResourceDto, QualificationDto, DockDto } from '../../core/models/physicalresource';
import { Api } from '../../core/services/api';

type PhysicalResourceFormModel = PhysicalResourceDto | (CreatingPhysicalResourceDto & { qualifications: string[] });

@Component({
  selector: 'app-physicalresource',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './physicalresource.html',
  styleUrl: './physicalresource.css',
})
export class PhysicalResource implements OnInit {
  private readonly endpoint = 'PhysicalResources';
  private readonly qualificationsEndpoint = 'Qualifications';
  private readonly docksEndpoint = 'Docks';
  errorField: string[] = [];

  physicalResources: PhysicalResourceDto[] = [];
  filter = {
    code: '',
    type: '',
    description: '',
    status: ''
  };
  filteredPhysicalResources: PhysicalResourceDto[] = [];

  availableQualifications: QualificationDto[] = [];
  availableDocks: DockDto[] = [];
  selectedPhysicalResource: PhysicalResourceDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';
  isLoading: boolean = false;
  feedbackMessage: { type: 'success' | 'error' | null, text: string | null } = { type: null, text: null };
  isSubmitting: boolean = false;

  formModel: PhysicalResourceFormModel = {} as PhysicalResourceFormModel;

  qualificationToAddId: string | null = null;
  selectedQualificationIdInResource: string | null = null;

  constructor( private api: Api, private translate: TranslateService ) {}

  ngOnInit(): void {
    this.loadPhysicalResources();
    this.filteredPhysicalResources = this.physicalResources;
    this.loadQualifications();
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

  loadQualifications(): void {
    this.api.getAll<QualificationDto>(this.qualificationsEndpoint).subscribe({
      next: (data) => {
        this.availableQualifications = data;
      },
      error: (err) => {
        console.error('Erro ao carregar Qualifications', err);
      }
    });
  }

  loadPhysicalResources(): void {
    this.isLoading = true;
    this.api.getAll<PhysicalResourceDto>(this.endpoint).subscribe({
      next: (data) => {
        this.physicalResources = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Physical Resources', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    this.filteredPhysicalResources = this.physicalResources.filter(pr =>
      (!this.filter.code || pr.code.toLowerCase().includes(this.filter.code.toLowerCase()))
      && (!this.filter.description || pr.description.toLowerCase().includes(this.filter.description.toLowerCase()))
      && (!this.filter.type || pr.type === this.filter.type)
      && (!this.filter.status || pr.availabilityStatus === this.filter.status)
    );
  }

  selectPhysicalResource(physicalResource: PhysicalResourceDto): void {
    this.clearFeedback();
    this.selectedQualificationIdInResource = null; 
    this.qualificationToAddId = null; 

    this.selectedPhysicalResource = physicalResource;
    this.formModel = { ...physicalResource, qualifications: [...(physicalResource.qualifications || [])] } as PhysicalResourceFormModel;

    this.currentFormMode = 'update';
  }

  startCreate(): void {
    this.clearFeedback();
    this.selectedQualificationIdInResource = null;
    this.qualificationToAddId = null;

    this.selectedPhysicalResource = null;
    this.currentFormMode = 'create';
    this.formModel = {
      code: '',
      type: '',
      description: '',
      weekdayStart: '',
      weekdayFinish: '',
      weekendStart: '',
      weekendFinish: '',
      containerCapacity: 0,
      setupTime: 0,
      qualifications: [],
      dock: ''
    } as PhysicalResourceFormModel;
  }

  getQualificationName(code: string): string {
    const qualification = this.availableQualifications.find(q => q.code === code);
    return qualification ? qualification.name : 'Code: ${code}';
  }

  addQualification(): void {
    if (this.currentFormMode !== 'view' && this.qualificationToAddId) {
      const qualifications = (this.formModel as PhysicalResourceFormModel).qualifications;

      if (!qualifications.includes(this.qualificationToAddId)) {
        qualifications.push(this.qualificationToAddId);
        this.qualificationToAddId = null;
        this.clearFeedback();
      } else {
        this.feedbackMessage = { 
          type: 'error', 
          text: this.translate.instant('PHYSICAL_RESOURCE.QUALIFICATION_ALREADY_ADDED')
        };
      }
    }
  }

  removeSelectedQualification(): void {
    if (this.currentFormMode !== 'view' && this.selectedQualificationIdInResource) {
      const qualifications: string[] = (this.formModel as PhysicalResourceFormModel).qualifications;

      const index = qualifications.indexOf(this.selectedQualificationIdInResource);
      if (index > -1) {
        qualifications.splice(index, 1);
        this.selectedQualificationIdInResource = null;
        this.clearFeedback();
      }
    }
  }

  get availableQualificationsForAdd(): QualificationDto[] {
    const associatedQualifications = (this.formModel as PhysicalResourceFormModel).qualifications || [];
    return this.availableQualifications.filter(qualification => !associatedQualifications.includes(qualification.code));
  }

  deactivatePhysicalResource(): void {
    if (this.selectedPhysicalResource && this.selectedPhysicalResource.availabilityStatus != "Inactive") {
      if (!confirm(`${this.translate.instant('PHYSICAL_RESOURCE.DEACTIVATE', { action: 'Desativar' })}`)) {
        return;
      }
      
      this.api.delete(this.endpoint, this.selectedPhysicalResource.id).subscribe({
        next: () => {
          this.loadPhysicalResources();
          this.currentFormMode = 'view';
          this.selectedPhysicalResource = null;
        },
        error: (err) => {
          console.error('Erro ao desativar', err);
        }
      });
    }
  }

  savePhysicalResource(): void {
    this.clearFeedback();
    this.isSubmitting = true;

    const { id, ...dtoBase } = this.formModel as PhysicalResourceDto;

    if (this.currentFormMode === 'create') {
      const creatingDto: CreatingPhysicalResourceDto = {
        ...dtoBase,
        qualifications: (this.formModel as PhysicalResourceFormModel).qualifications
      };
      this.createPhysicalResource(creatingDto);
    } else if (this.currentFormMode === 'update') {
      const updateDto: UpdatingPhysicalResourceDto = {
        ...dtoBase,
        qualifications: (this.formModel as PhysicalResourceFormModel).qualifications
      };
      this.updatePhysicalResource(this.selectedPhysicalResource!.id, updateDto);
    }
  }

  createPhysicalResource(dto: CreatingPhysicalResourceDto): void {
    this.api.create<PhysicalResourceDto>(this.endpoint, dto).subscribe({
      next: (newPhysicalResource) => {
        this.loadPhysicalResources();
        
        this.selectedPhysicalResource = newPhysicalResource;

        this.feedbackMessage = {
          type: 'success',
          text: this.translate.instant('PHYSICAL_RESOURCE.CREATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('PHYSICAL_RESOURCE.CREATE_FAILURE');

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

  updatePhysicalResource(id: string, dto: UpdatingPhysicalResourceDto): void {
    this.api.update<PhysicalResourceDto>(this.endpoint, id, dto).subscribe({
      next: (updatedPhysicalResource) => {
        this.loadPhysicalResources();

        const index = this.physicalResources.findIndex(sa => sa.id === updatedPhysicalResource.id);
        if (index !== -1) {
          this.physicalResources[index] = updatedPhysicalResource;
        }

        this.selectedPhysicalResource = updatedPhysicalResource;

        this.feedbackMessage = {
          type: 'success',
          text: this.translate.instant('PHYSICAL_RESOURCE.UPDATE_SUCCESS')
        };
      },
      error: (err) => {
        let text = this.translate.instant('PHYSICAL_RESOURCE.UPDATE_FAILURE');

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
      "The Code field is required.": {
        field: "code",
        translateKey: "PHYSICAL_RESOURCE.CODE_REQUIRED"
      },
      "A Physical Resource with Code": {
        field: "code",
        translateKey: "PHYSICAL_RESOURCE.CODE_ALREADY_EXISTS"
      },
      "The Type field is required.": {
        field: "type",
        translateKey: "PHYSICAL_RESOURCE.TYPE_REQUIRED"
      },
      "The Description field is required.": {
        field: "description",
        translateKey: "PHYSICAL_RESOURCE.DESCRIPTION_REQUIRED"
      },
      "The field Qualifications must be a string or array type with a minimum length of '1'.": {
        field: "qualifications",
        translateKey: "PHYSICAL_RESOURCE.QUALIFICATION_REQUIRED"
      },
      "At least one operational window must be defined.": {
        field: "operationalWindow",
        translateKey: "PHYSICAL_RESOURCE.OPERATIONAL_WINDOW_REQUIRED"
      },
      "Container Capacity has to be higher than 1.": {
        field: "containerCapacity",
        translateKey: "PHYSICAL_RESOURCE.CONTAINER_CAPACITY_HIGHER_THAN_ONE"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'containerCapacity'": {
        field: "containerCapacity",
        translateKey: "PHYSICAL_RESOURCE.CONTAINER_CAPACITY_REQUIRED"
      },
      "is not a valid integer. Path 'containerCapacity'": {
        field: "containerCapacity",
        translateKey: "PHYSICAL_RESOURCE.CONTAINER_CAPACITY_INVALID"
      },
      "is too large or small for an Int32. Path 'containerCapacity'": {
        field: "containerCapacity",
        translateKey: "PHYSICAL_RESOURCE.CONTAINER_CAPACITY_INVALID"
      },
      "A Truck must have an Average Speed of at least 1.": {
        field: "averageSpeed",
        translateKey: "PHYSICAL_RESOURCE.AVERAGE_SPEED_HIGHER_THAN_ONE"
      },
      "Only Trucks can have an Average Speed.": {
        field: "averageSpeed",
        translateKey: "PHYSICAL_RESOURCE.ONLY_TRUCK_AVERAGE_SPEED"
      },
      "is too large or small for an Int32. Path 'averageSpeed'": {
        field: "averageSpeed",
        translateKey: "PHYSICAL_RESOURCE.AVERAGE_SPEED_INVALID"
      },
      "is not a valid integer. Path 'averageSpeed'": {
        field: "averageSpeed",
        translateKey: "PHYSICAL_RESOURCE.AVERAGE_SPEED_INVALID"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'setupTime'": {
        field: "setupTime",
        translateKey: "PHYSICAL_RESOURCE.SETUP_TIME_INVALID"
      },
      "The field SetupTime must be between 0 and 2147483647.": {
        field: "setupTime",
        translateKey: "PHYSICAL_RESOURCE.SETUP_TIME_POSITIVE"
      },
      "is too large or small for an Int32. Path 'setupTime'": {
        field: "setupTime",
        translateKey: "PHYSICAL_RESOURCE.SETUP_TIME_INVALID"
      },
      "is not a valid integer. Path 'setupTime'": {
        field: "setupTime",
        translateKey: "PHYSICAL_RESOURCE.SETUP_TIME_INVALID"
      },
      "Setup Time cannot be negative.": {
        field: "setupTime",
        translateKey: "PHYSICAL_RESOURCE.SETUP_TIME_POSITIVE"
      },
      "Only Fixed Cranes can be assigned to docks.": {
        field: "dock",
        translateKey: "PHYSICAL_RESOURCE.ONLY_STS_DOCK"
      },
      "A Fixed Crane needs to be assigned to a dock.": {
        field: "dock",
        translateKey: "PHYSICAL_RESOURCE.STS_DOCK_REQUIRED"
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
