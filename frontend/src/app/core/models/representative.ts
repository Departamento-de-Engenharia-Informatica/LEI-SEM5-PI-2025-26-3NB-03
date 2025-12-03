export interface RepresentativeDto {
  id: string;
  name: string;
  nationality: string;
  email: string;
  phoneNumber: number;
  shippingAgentOrganizationId: string;
  active: boolean;
}

export interface UpdateRepresentativeDto {
  id?: string;
  name: string;
  nationality: string;
  email: string;
  phoneNumber: number;
  shippingAgentOrganizationId?: string;
}

export interface CreatingRepresentativeDto {
  id: string;
  name: string;
  nationality: string;
  email: string;
  phoneNumber: number;
  shippingAgentOrganizationId: string;
}