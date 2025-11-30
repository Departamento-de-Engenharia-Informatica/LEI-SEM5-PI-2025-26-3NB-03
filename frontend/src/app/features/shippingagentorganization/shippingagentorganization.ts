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
  errorField: string[] = [];

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
    this.errorField = [];
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
          let text = 'Error creating organization.';

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
          let text = 'Error updating organization.';

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
  }

  private handleErrorMessage(errorMessage: string) {
    const errorMap: Record<string, { field: string, translateKey: string }> = {
      "The LegalName field is required.": {
        field: "legalName",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.LEGAL_NAME_REQUIRED"
      },
      "The AltName field is required.": {
        field: "altName",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.ALT_NAME_REQUIRED"
      },
      "The Address field is required.": {
        field: "address",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.ADDRESS_REQUIRED"
      },
      "Error converting value {null} to type 'System.Int32'. Path 'taxNumber'": {
        field: "taxNumber",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.TAX_NUMBER_REQUIRED"
      },
      "is too large or small for an Int32. Path 'taxNumber'": {
        field: "taxNumber",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.TAX_NUMBER_INVALID"
      },
      "is not a valid integer. Path 'taxNumber'": {
        field: "taxNumber",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.TAX_NUMBER_INVALID"
      },
      "Tax number must be a positive integer.": {
        field: "taxNumber",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.TAX_NUMBER_INVALID"
      },
      "A Shipping Agent Organization needs at least one Representative.": {
        field: "representatives",
        translateKey: "SHIPPING_AGENT_ORGANIZATION.REPRESENTATIVE_REQUIRED"
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
