export interface VesselDto {
  id: string;
  imoNumber: string;
  name: string; 
  vesselType: string;
  operator: string;

}

export interface UpdateVesselDto {
  id?: string;
  imoNumber: string;
  name: string; 
  vesseltype: string;
  operator: string;
}

export interface CreatingVesselDto {
  id?: string;
  imoNumber: string;
  name: string; 
  vesselType: string;
  operator: string;
}
