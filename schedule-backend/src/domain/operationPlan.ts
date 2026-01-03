import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface OperationPlanProps {
    vvnId: string;
    vesselId: string;
    date: Date;
    operationType: string;
    status: string;
}

export class OperationPlan extends AggregateRoot<OperationPlanProps> {
    get id(): UniqueEntityID { return this._id; }
    get vvnId(): string { return this.props.vvnId; }
    get vesselId(): string { return this.props.vesselId; }
    get date(): Date { return this.props.date; }
    get operationType(): string { return this.props.operationType; }
    get status(): string { return this.props.status; }

    private constructor(props: OperationPlanProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: { vvnId: string; vesselId: string; date: string; operationType: string; status?: string }, id?: UniqueEntityID): Result<OperationPlan> {
        const guardedProps = [
            { argument: props.vvnId, argumentName: 'vvnId' },
            { argument: props.vesselId, argumentName: 'vesselId' },
            { argument: props.date, argumentName: 'date' },
            { argument: props.operationType, argumentName: 'operationType' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<OperationPlan>(guardResult.message);
        }

        const planDate = new Date(props.date);

        const operationPlan = new OperationPlan({
            vvnId: props.vvnId,
            vesselId: props.vesselId,
            date: planDate,
            operationType: props.operationType,
            status: props.status || "PLANNED"
        }, id);

        return Result.ok<OperationPlan>(operationPlan);
    }

    public updateDate(date: Date): void {
        this.props.date = date;
    }

    public updateVessel(vesselId: string): void {
        this.props.vesselId = vesselId;
    }

    public updateStatus(status: string): void {
        this.props.status = status;
    }
}