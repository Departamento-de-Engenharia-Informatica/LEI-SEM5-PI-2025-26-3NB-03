import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface ComplementaryTaskProps {
    name: string;
    description: string;
    categoryId: string;
    active: boolean;
}

export class ComplementaryTask extends AggregateRoot<ComplementaryTaskProps> {
    get id(): UniqueEntityID { return this._id; }
    get name(): string { return this.props.name; }
    get description(): string { return this.props.description; }
    get categoryId(): string { return this.props.categoryId; }
    get isActive(): boolean { return this.props.active; }

    private constructor(props: ComplementaryTaskProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: { name: string; description: string; categoryId: string; active?: boolean }, id?: UniqueEntityID): Result<ComplementaryTask> {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.description, argumentName: 'description' },
            { argument: props.categoryId, argumentName: 'categoryId' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<ComplementaryTask>(guardResult.message);
        }

        const task = new ComplementaryTask({
            name: props.name,
            description: props.description,
            categoryId: props.categoryId,
            active: props.active ? props.active : true
        }, id);

        return Result.ok<ComplementaryTask>(task);
    }
}