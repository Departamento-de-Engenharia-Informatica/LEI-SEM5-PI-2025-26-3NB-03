export interface QualificationDto {
  id: string;
  code: string;
  name: string;
}

export interface CreateQualificationDto {
  code: string;
  name: string;
}

export interface UpdateQualificationDto {
  name: string;
}
