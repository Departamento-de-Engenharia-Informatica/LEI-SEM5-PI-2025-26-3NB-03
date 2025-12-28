export interface TaskCategory {
  id?: string;
  name: string;
  description: string;
}

export interface CreateTaskCategoryDto {
  name: string;
  description: string;
}
