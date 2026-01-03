import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface OperationStepProps {
    operationId: string;
    type: string;
    containerNumber: string;
    resourceId: string;
    startTime: Date;
    endTime: Date;
}

interface OperationPlanProps {
    vvnId: string;
    vesselId: string;
    date: Date;
    operations: OperationStepProps[];
    status: string;
}

export class OperationPlan extends AggregateRoot<OperationPlanProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get vvnId(): string { return this.props.vvnId; }
    get vesselId(): string { return this.props.vesselId; }
    get date(): Date { return this.props.date; }
    get operations(): OperationStepProps[] { return this.props.operations; }
    get status(): string { return this.props.status; }

    // Setters para Update
    public updateDate(date: Date): void {
        this.props.date = date;
    }

    public updateVessel(vesselId: string): void {
        this.props.vesselId = vesselId;
    }

    public updateStatus(status: string): void {
        this.props.status = status;
    }

    public updateOperations(ops: OperationStepProps[]): void {
        this.props.operations = ops;
    }

    private constructor(props: OperationPlanProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: OperationPlanProps, id?: UniqueEntityID): Result<OperationPlan> {
        const guardedProps = [
            { argument: props.vvnId, argumentName: 'vvnId' },
            { argument: props.vesselId, argumentName: 'vesselId' },
            { argument: props.date, argumentName: 'date' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<OperationPlan>(guardResult.message);
        }

        if (!props.status) props.status = "PLANNED";
        if (!props.operations) props.operations = [];

        const plan = new OperationPlan({ ...props }, id);
        return Result.ok<OperationPlan>(plan);
    }
}