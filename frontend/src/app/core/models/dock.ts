export interface DockDto {
  id: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  length: number;
  depth: number;
  maxDraft: number;
  capacity: number; 
  vesselTypes: string[];

}

export interface UpdateDockDto {
  id?: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  length: number;
  depth: number;
  maxDraft: number;
  capacity: number; 
  vesselTypes: string[];
}

export interface CreatingDockDto {
  id?: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  length: number;
  depth: number;
  maxDraft: number;
  capacity: number; 
  vesselTypes: string[];
}