export interface StorageAreaDto {
  id: string;
  type: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  maximumCapacity: number;
  currentOccupancy: number;
  docks: string[];
}

export interface CreatingStorageAreaDto {
  type: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  maximumCapacity: number;
  currentOccupancy: number;
  docks?: string[];
}

export interface UpdateStorageAreaDto {
  type: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  maximumCapacity: number;
  currentOccupancy: number;
  docks?: string[];
}

export interface DockDto {
  id: string;
  name: string;
}