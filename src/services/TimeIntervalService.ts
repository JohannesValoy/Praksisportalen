/** @format */

import DBclient from "@/knex/config/DBClient";

class TimeInterval {
  private ID: number;
  private _start: Date;
  private _end: Date;

  constructor(id: number, start: Date, end: Date) {
    this.ID = id;
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
    return this.ID;
  }

  public set id(value: number) {
    this.ID = value;
  }

  toJSON() {
    return {
      id: this.ID,
      start: this._start,
      end: this._end,
    };
  }
}

async function fetchTimeIntervalByID(id: number): Promise<TimeInterval> {
  const timeInterval = (await fetchTimeIntervalByIDList(new Set([id]))).get(id);
  if (timeInterval == undefined) {
    throw new Error(`No time interval found with id: ${id}`);
  }
  return new TimeInterval(id, timeInterval.start, timeInterval.end);
}

async function fetchTimeIntervalByIDList(
  idList: Set<number>
): Promise<Map<number, TimeInterval>> {
  const query = await DBclient.select()
    .from("time_intervals")
    .whereIn("id", Array.from(idList));
  const timeIntervals: Map<number, TimeInterval> = new Map();
  for (const timeInterval of query) {
    timeIntervals.set(
      timeInterval.id,
      new TimeInterval(timeInterval.id, timeInterval.start, timeInterval.end)
    );
  }
  return timeIntervals;
}

async function deleteTimeIntervalByID(id: number): Promise<void> {
  await DBclient("time_intervals").where("id", id).del();
}

export {
  fetchTimeIntervalByID,
  fetchTimeIntervalByIDList,
  deleteTimeIntervalByID,
};
