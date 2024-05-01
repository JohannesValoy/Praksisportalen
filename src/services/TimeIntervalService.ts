"use server";

import DBclient from "@/knex/config/DBClient";
import "server-only";

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
/**
 * Fetches a time interval by its id
 * @param id the id of the time interval
 * @returns the time interval
 * @throws an error if no time interval is found with the given id
 */
async function fetchTimeIntervalByID(id: number): Promise<TimeInterval> {
  const timeInterval = (await fetchTimeIntervalByIDList(new Set([id]))).get(id);
  if (timeInterval == undefined) {
    throw new Error(`No time interval found with id: ${id}`);
  }
  return new TimeInterval(id, timeInterval.start, timeInterval.end);
}
/**
 * This function fetches a list of time intervals by their ids
 * @param idList a list of ids to fetch
 * @returns a map of time intervals with the id as key. The map will only contain the time intervals that were found
 */
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
/**
 * Deletes a time interval by its id
 * @param id the id of the time interval to delete
 */
async function deleteTimeIntervalByID(id: number): Promise<void> {
  await DBclient("time_intervals").where("id", id).del();
}

export {
  fetchTimeIntervalByID,
  fetchTimeIntervalByIDList,
  deleteTimeIntervalByID,
};
