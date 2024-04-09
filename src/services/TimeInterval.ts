/** @format */

import TimeIntervalObject, {
  TimeIntervalPageRequest,
} from "@/app/_models/TimeInterval";
import DBclient from "@/knex/config/DBClient";

async function fetchTimeIntervalByID(id: number): Promise<TimeIntervalObject> {
  const timeInterval = (await fetchTimeIntervalByIDList(new Set([id]))).get(id);
  if (timeInterval == undefined) {
    throw new Error(`No time interval found with id: ${id}`);
  }
  return new TimeIntervalObject(timeInterval);
}

async function fetchTimeIntervalByIDList(
  idList: Set<number>
): Promise<Map<number, TimeIntervalObject>> {
  const query = await DBclient.select()
    .from("timeIntervals")
    .whereIn("id", Array.from(idList));
  const timeIntervals: Map<number, TimeIntervalObject> = new Map();
  for (const timeInterval of query) {
    timeIntervals.set(timeInterval.id, new TimeIntervalObject(timeInterval));
  }
  return timeIntervals;
}

async function fetchTimeIntervalsByInternshipID(
  internShipID: number[]
): Promise<Map<number, TimeIntervalObject[]>> {
  debugger;
  console.log("internShipID", internShipID);
  const query = await DBclient.select()

    .from("timeIntervals")
    .join(
      "internshipAgreements",
      "timeIntervals.internshipAgreement_id",
      "internshipAgreements.internship_id"
    )
    .whereIn("internship_id", internShipID)
    .orderBy("timeIntervals.startDate", "asc");
  debugger;
  const timeIntervals: Map<number, TimeIntervalObject[]> = new Map();
  for (const timeInterval of query) {
    if (!timeIntervals.has(timeInterval.internship_id)) {
      timeIntervals.set(timeInterval.internship_id, []);
    }
    timeIntervals
      .get(timeInterval.internship_id)
      .push(new TimeIntervalObject(timeInterval));
  }
  return timeIntervals;
}

export {
  fetchTimeIntervalByID,
  fetchTimeIntervalByIDList,
  fetchTimeIntervalsByInternshipID,
};
