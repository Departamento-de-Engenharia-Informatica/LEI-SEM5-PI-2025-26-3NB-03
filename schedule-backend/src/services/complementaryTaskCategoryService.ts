import { Service, Inject } from 'typedi';
import config from '../../config';
import { IComplementaryTaskCategoryDTO, ICreateComplementaryTaskCategoryDTO } from '../dto/IComplementaryTaskCategoryDTO';
import { ComplementaryTaskCategory } from "../domain/complementaryTaskCategory";
import IComplementaryTaskCategoryRepo from './IRepos/IComplementaryTaskCategoryRepo';
import IComplementaryTaskCategoryService from './IServices/IComplementaryTaskCategoryService';
import { Result } from "../core/logic/Result";
import { ComplementaryTaskCategoryMap } from "../mappers/ComplementaryTaskCategoryMap";

@Service()
export default class ComplementaryTaskCategoryService implements IComplementaryTaskCategoryService {
    constructor(
        @Inject(config.repos.complementaryTaskCategory.name) private categoryRepo : IComplementaryTaskCategoryRepo
    ) {}

    public async createCategory(categoryDTO: ICreateComplementaryTaskCategoryDTO): Promise<Result<IComplementaryTaskCategoryDTO>> {
        try {

            const existingCategory = await this.categoryRepo.findByName(categoryDTO.name);

            if (existingCategory != null) {

                return Result.fail<IComplementaryTaskCategoryDTO>("Category with this name already exists.");
            }

            const categoryOrError = ComplementaryTaskCategory.create({
                name: categoryDTO.name,
                description: categoryDTO.description
            });

            if (categoryOrError.isFailure) {
                return Result.fail<IComplementaryTaskCategoryDTO>(categoryOrError.errorValue());
            }

            const categoryResult = categoryOrError.getValue();
            await this.categoryRepo.save(categoryResult);

            const categoryDTOResult = ComplementaryTaskCategoryMap.toDTO(categoryResult) as IComplementaryTaskCategoryDTO;
            return Result.ok<IComplementaryTaskCategoryDTO>(categoryDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getAllCategories(): Promise<Result<IComplementaryTaskCategoryDTO[]>> {
        try {
            const categories = await this.categoryRepo.findAll();
            const categoriesDTO = categories.map(cat => ComplementaryTaskCategoryMap.toDTO(cat));
            return Result.ok<IComplementaryTaskCategoryDTO[]>(categoriesDTO);
        } catch (e) {
            throw e;
        }
    }
}