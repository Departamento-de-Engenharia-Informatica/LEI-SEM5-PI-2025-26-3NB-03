import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Api } from '../../core/services/api';
import { ShippingAgentOrganizationDto, CreatingShippingAgentOrganizationDto, UpdateShippingAgentOrganizationDto } from '../../core/models/shippingagentorganization';
import { RepresentativeDto } from '../../core/models/representative';

type OrgFormModel = ShippingAgentOrganizationDto | (CreatingShippingAgentOrganizationDto & {});

@Component({
  selector: 'app-shippingagentorganization',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './shippingagentorganization.html',
  styleUrl: './shippingagentorganization.css',
})
export class ShippingAgentOrganization implements OnInit {
  private readonly endpoint = 'ShippingAgentOrganizations';
  private readonly repEndpoint = 'Representatives';

  organizations: ShippingAgentOrganizationDto[] = [];
  representatives: RepresentativeDto[] = [];

  selectedOrganization: ShippingAgentOrganizationDto | null = null;
  currentFormMode: 'view' | 'create' | 'update' = 'view';

  isLoading = false;
  isSubmitting = false;

  formModel: OrgFormModel = {} as OrgFormModel;

  repToAddId: string | null = null;
  selectedRepInOrg: string | null = null;

  feedbackMessage = { type: null as 'success' | 'error' | null, text: null as string | null };

  constructor(private api: Api, private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadOrganizations();
    this.loadRepresentatives();
  }

  clearFeedback() {
    this.feedbackMessage = { type: null, text: null };
  }

  loadRepresentatives() {
    this.api.getAll<RepresentativeDto>(this.repEndpoint).subscribe({
      next: data => this.representatives = data,
      error: err => console.error('Error loading Representatives', err)
    });
  }

  loadOrganizations() {
    this.isLoading = true;
    this.api.getAll<ShippingAgentOrganizationDto>(this.endpoint).subscribe({
      next: data => {
        this.organizations = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading Shipping Agent Organizations', err);
        this.isLoading = false;
      }
    });
  }

  getRepName(id: string): string {
    const rep = this.representatives.find(r => r.id === id);
    return rep ? rep.name : `ID: ${id}`;
  }

  startCreate() {
    this.clearFeedback();
    this.selectedOrganization = null;
    this.currentFormMode = 'create';

    this.formModel = {
      legalName: '',
      altName: '',
      address: '',
      taxNumber: 0,
      representatives: []
    };
  }

  selectOrganization(org: ShippingAgentOrganizationDto) {
    this.clearFeedback();
    this.selectedOrganization = org;
    this.currentFormMode = 'update';

    this.formModel = {
      ...org,
      representatives: [...org.representatives]
    };
  }

  get representativesForAdd() {
    return this.representatives.filter(r => 
      !(this.formModel.representatives || []).includes(r.id)
    );
  }

  addRepresentative() {
    if (this.currentFormMode === 'view' || !this.repToAddId) return;

    const reps = this.formModel.representatives;

    if (!reps.includes(this.repToAddId)) {
      reps.push(this.repToAddId);
      this.repToAddId = null;
    } else {
      this.feedbackMessage = { 
        type: 'error',
        text: 'Representative already added.'
      };
    }
  }

  removeRepresentative() {
    if (!this.selectedRepInOrg) return;

    const reps: string[] = this.formModel.representatives;
    const index = reps.indexOf(this.selectedRepInOrg);
    if (index > -1) {
      reps.splice(index, 1);
      this.selectedRepInOrg = null;
      this.clearFeedback();
    }
  }

  save() {
    this.isSubmitting = true;
    this.clearFeedback();

    if (this.currentFormMode === 'create') {
      this.api.create<ShippingAgentOrganizationDto>(this.endpoint, this.formModel).subscribe({
        next: created => {
          this.feedbackMessage = {
            type: 'success',
            text: 'Organization created successfully.'
          };
          this.loadOrganizations();
          this.selectedOrganization = created;
          this.currentFormMode = 'update';
        },
        error: err => {
          this.feedbackMessage = {
            type: 'error',
            text: err.error?.Message || 'Error creating organization'
          };
        }
      }).add(() => this.isSubmitting = false);
    }

    else if (this.currentFormMode === 'update') {
      this.api.update<ShippingAgentOrganizationDto>(this.endpoint, this.selectedOrganization!.id, this.formModel).subscribe({
        next: updated => {
          this.feedbackMessage = {
            type: 'success',
            text: 'Organization updated successfully.'
          };
          this.loadOrganizations();
          this.selectedOrganization = updated;
        },
        error: err => {
          this.feedbackMessage = {
            type: 'error',
            text: err.error?.Message || 'Error updating organization'
          };
        }
      }).add(() => this.isSubmitting = false);
    }
  }
}
