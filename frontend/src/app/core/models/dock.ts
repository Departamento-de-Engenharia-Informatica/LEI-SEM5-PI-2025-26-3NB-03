export interface DockDto {
  id: string;
  name: string; 
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  length: number;
  depth: number;
  maxDraft: number;
  capacity: number; 
  vesselTypeIds: string[];

}

export interface UpdateDockDto {
  id?: string;
  name: string; 
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  length: number;
  depth: number;
  maxDraft: number;
  capacity: number; 
  vesselTypeIds: string[];
}

export interface CreatingDockDto {
  id?: string;
  name: string; 
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  length: number;
  depth: number;
  maxDraft: number;
  capacity: number; 
  vesselTypeIds: string[];
}

export interface VesselTypeDto {
  id: string;
  name: string;
}