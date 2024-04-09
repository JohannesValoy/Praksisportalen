/** @format */
import DBclient from "@/knex/config/DBClient";
import { getInternshipPositionObjectByID } from "@/services/InternshipPosition";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const internship = await getInternshipPositionObjectByID(
      parseInt(params.id),
    );
    return Response.json(internship);
  } catch (error) {
    console.log("Error fetching internship data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch internship data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const Internship = await DBclient("internships")
    .where({ id: params.id })
    .delete();
  console.log(Internship);
  return Response.json({ success: true });
}
