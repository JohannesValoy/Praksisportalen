/** @format */

import DBclient from "@/knex/config/DBClient";
import { getSectionObjectByID } from "@/services/SectionService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const section = await getSectionObjectByID(parseInt(params.id));

  if (section) {
    return Response.json(section);
  }
  return Response.json({ message: "Section not found" }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const section = await DBclient("sections").where({ id: params.id }).delete();
  return Response.json({ success: true });
}
