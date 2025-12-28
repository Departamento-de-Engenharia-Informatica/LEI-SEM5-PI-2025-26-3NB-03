export interface ComplementaryTask {
  id?: string;
  name: string;
  description: string;
  categoryId: string;
  active: boolean;
}

export interface CreateComplementaryTaskDto {
  name: string;
  description: string;
  categoryId: string;
  active: boolean;
}
