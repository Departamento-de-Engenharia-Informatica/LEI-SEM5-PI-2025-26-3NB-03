import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface ComplementaryTaskCategoryProps {
    name: string;
    description: string;
    active: boolean;
}

export class ComplementaryTaskCategory extends AggregateRoot<ComplementaryTaskCategoryProps> {
    get id(): UniqueEntityID { return this._id; }
    get name(): string { return this.props.name; }
    get description(): string { return this.props.description; }
    get isActive(): boolean { return this.props.active; }

    private constructor(props: ComplementaryTaskCategoryProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: { name: string; description: string; active?: boolean }, id?: UniqueEntityID): Result<ComplementaryTaskCategory> {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'description' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<ComplementaryTaskCategory>(guardResult.message);
        }

        const category = new ComplementaryTaskCategory({
            ...props,
            active: props.active ?? true
        }, id);

        return Result.ok<ComplementaryTaskCategory>(category);
    }
}