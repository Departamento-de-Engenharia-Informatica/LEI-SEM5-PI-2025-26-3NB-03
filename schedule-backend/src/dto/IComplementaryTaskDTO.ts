export interface IComplementaryTaskDTO {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    active: boolean;
}

export interface ICreateComplementaryTaskDTO {
    name: string;
    description: string;
    categoryId: string;
}