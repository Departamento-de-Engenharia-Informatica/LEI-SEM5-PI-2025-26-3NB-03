export interface PhysicalResourceDto {
  id: string;
  code: string;
  type: string;
  description: string;
  weekdayStart?: string;
  weekdayFinish?: string;
  weekendStart?: string;
  weekendFinish?: string;
  containerCapacity: number;
  averageSpeed?: number;
  availabilityStatus: string;
  setupTime: number;
  qualifications: string[];
  dock?: string;
}

export interface CreatingPhysicalResourceDto {
  code: string;
  type: string;
  description: string;
  weekdayStart?: string;
  weekdayFinish?: string;
  weekendStart?: string;
  weekendFinish?: string;
  containerCapacity: number;
  averageSpeed?: number;
  setupTime: number;
  qualifications: string[];
  dock?: string;
}

export interface UpdatingPhysicalResourceDto {
  code?: string;
  type?: string;
  description?: string;
  weekdayStart?: string;
  weekdayFinish?: string;
  weekendStart?: string;
  weekendFinish?: string;
  containerCapacity?: number;
  averageSpeed?: number;
  setupTime?: number;
  qualifications?: string[];
  dock?: string;
}

export interface QualificationDto {
  code: string;
  name: string;
}

export interface DockDto {
  id: string;
  name: string;
}
