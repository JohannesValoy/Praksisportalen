import DBclient from "@/knex/config/DBClient";

class TimeInterval {
    private _id: number;
    private _start: Date;
    private _end: Date;

    constructor(id : number, start: Date, end: Date) {
        this._id = id;
        this._start = start;
        this._end = end;
    }

    get start(): Date {
        return this._start;
    }

    get end(): Date {
        return this._end;
    }
    
    public get id(): number {
        return this._id;
    }
    
    public set id(value: number) {
        this._id = value;
    }
    
    toJSON() {
        return {
            id: this._id,
            start: this._start,
            end: this._end
        };
    }
}

async function fetchTimeIntervalByID(id : number): Promise<TimeInterval> {
    const timeInterval = (await fetchTimeIntervalByIDList(new Set([id]))).get(id);
    if (timeInterval == undefined) {
        throw new Error(`No time interval found with id: ${id}`);
    }
    return new TimeInterval(id,timeInterval.start, timeInterval.end);
}

async function fetchTimeIntervalByIDList(idList : Set<number>): Promise<Map<number, TimeInterval>> {
    const query = await DBclient.select().from("time_intervals").whereIn("id", Array.from(idList));
    const timeIntervals : Map<number, TimeInterval> = new Map();
    for (const timeInterval of query) {
        timeIntervals.set(timeInterval.id, new TimeInterval(timeInterval.id, timeInterval.start, timeInterval.end));
    }
    return timeIntervals;
}

export { TimeInterval, fetchTimeIntervalByID, fetchTimeIntervalByIDList };