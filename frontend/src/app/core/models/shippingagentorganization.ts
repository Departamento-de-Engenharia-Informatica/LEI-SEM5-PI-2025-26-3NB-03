export interface ShippingAgentOrganizationDto {
  id: string;
  legalName: string;
  altName: string;
  address: string;
  taxNumber: number;
  representatives: string[];
}

export interface CreatingShippingAgentOrganizationDto {
  legalName: string;
  altName: string;
  address: string;
  taxNumber: number;
  representatives: string[];
}

export interface UpdateShippingAgentOrganizationDto {
  id: string;
  legalName: string;
  altName: string;
  address: string;
  taxNumber: number;
  representatives: string[];
}