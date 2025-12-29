import { Result } from "../../core/logic/Result";
import { IComplementaryTaskCategoryDTO, ICreateComplementaryTaskCategoryDTO } from "../../dto/IComplementaryTaskCategoryDTO";

export default interface IComplementaryTaskCategoryService {
    createCategory(categoryDTO: ICreateComplementaryTaskCategoryDTO): Promise<Result<IComplementaryTaskCategoryDTO>>;
    getAllCategories(): Promise<Result<IComplementaryTaskCategoryDTO[]>>;
}