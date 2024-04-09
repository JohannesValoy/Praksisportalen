/** @format */

import DBclient from "@/knex/config/DBClient";
import StudyProgramJson from "../StudyProgramView";
import { NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const studyProgram = await DBclient("studyPrograms")
    .where({ id: params.id })
    .first();
  if (studyProgram) {
    return Response.json(new StudyProgramJson(studyProgram));
  }
  return Response.json({ message: "Study Program not found" }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const studyProgram = await DBclient("studyPrograms")
    .where({ id: params.id })
    .delete();
  return Response.json({ success: true });
}
