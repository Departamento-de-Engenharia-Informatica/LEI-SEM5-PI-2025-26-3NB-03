export interface StorageAreaDTO {
  id: string;
  type: string;
  locationX: number;
  locationZ: number;
  locationOrientation: number;
  maximumCapacity: number;
  currentOccupancy: number;
}