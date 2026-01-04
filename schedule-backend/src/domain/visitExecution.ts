import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface VisitExecutionProps {
    vvnId: string;
    vesselId: string;
    arrivalTime: Date;
    status: string;
    creatorId: string;
}

//console.log("LOADED visitExecution.ts WITH UPDATE MARKER");

export class VisitExecution extends AggregateRoot<VisitExecutionProps> {
    get id(): UniqueEntityID { return this._id; }
    get vvnId(): string { return this.props.vvnId; }
    get vesselId(): string { return this.props.vesselId; }
    get arrivalTime(): Date { return this.props.arrivalTime; }
    get status(): string { return this.props.status; }

    private constructor(props: VisitExecutionProps, id?: UniqueEntityID) {
        super(props, id);
    }



    public static create(props: { vvnId: string; vesselId: string; arrivalTime: string; creatorId: string }, id?: UniqueEntityID): Result<VisitExecution> {
        const guardedProps = [
            { argument: props.vvnId, argumentName: 'vvnId' },
            { argument: props.vesselId, argumentName: 'vesselId' },
            { argument: props.arrivalTime, argumentName: 'arrivalTime' },
            { argument: props.creatorId, argumentName: 'creatorId' }
        ];


        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<VisitExecution>(guardResult.message);
        }


        if (props.vvnId.trim().length === 0) {
            return Result.fail<VisitExecution>("VVN ID cannot be empty.");
        }
        if (props.vesselId.trim().length === 0) {
            return Result.fail<VisitExecution>("Vessel ID cannot be empty.");
        }

        const arrival = new Date(props.arrivalTime);


        if (isNaN(arrival.getTime())) {
            return Result.fail<VisitExecution>("Invalid Arrival Time.");
        }

        const visitExecution = new VisitExecution({
            vvnId: props.vvnId,
            vesselId: props.vesselId,
            arrivalTime: arrival,
            status: "IN_PROGRESS",
            creatorId: props.creatorId
        }, id);

        return Result.ok<VisitExecution>(visitExecution);
    }

    public update(props: { arrivalTime?: string; status?: string }): Result<void> {
      //console.log(">>> VisitExecution.update CALLED");

  if (props.arrivalTime !== undefined) {
    const arrival = new Date(props.arrivalTime);

    if (isNaN(arrival.getTime())) {
      return Result.fail<void>("Invalid arrivalTime.");
    }

    this.props.arrivalTime = arrival;
  }

  if (props.status !== undefined) {
    const allowedStatuses = ["IN_PROGRESS", "COMPLETED", "DELAYED"];

    if (!allowedStatuses.includes(props.status)) {
      return Result.fail<void>("Invalid status.");
    }

    this.props.status = props.status;
  }

  return Result.ok<void>();
}

}