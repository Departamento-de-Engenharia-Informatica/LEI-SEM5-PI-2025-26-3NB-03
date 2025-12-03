export interface VesselTypeDto {
  id: string;
  name: string;
  description: string;
  capacity: number;
  maxRows: number;
  maxBays: number;
  maxTiers: number;
}

export interface UpdateVesselTypeDto {
  id?: string;
  name: string;
  description: string;
  capacity: number;
  maxRows: number;
  maxBays: number;
  maxTiers: number;
}

export interface CreatingVesselTypeDto {
  id: string;
  name: string;
  description: string;
  capacity: number;
  maxRows: number;
  maxBays: number;
  maxTiers: number;
}