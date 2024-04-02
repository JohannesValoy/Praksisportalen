/** @format */

import DBclient from "@/knex/config/DBClient";
import SectionView from "../SectionView";
import { getSectionObjectByID } from "@/services/Section";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const section = await getSectionObjectByID(parseInt(params.id));

  if (section) {
    return Response.json(section);
  }
  return Response.json({ message: "Internship not found" }, { status: 404 });
}