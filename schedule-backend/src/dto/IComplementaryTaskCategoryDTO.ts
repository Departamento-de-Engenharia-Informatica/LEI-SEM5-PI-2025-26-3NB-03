export interface IComplementaryTaskCategoryDTO {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

export interface ICreateComplementaryTaskCategoryDTO {
    name: string;
    description: string;
}