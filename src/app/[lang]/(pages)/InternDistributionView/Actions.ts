"use server";
import "server-only";
import DBclient from "@/knex/config/DBClient";

export async function getInternDistribution(
  page: int = 1,
  limit: int = 10,
  sortedBy: string = "",
  direction = "asc",
  status: string = ""
) {
  if (page < 1) {
    page = 1;
  }
  if (limit < 1) {
    limit = 10;
  }
  if (
    !["name", "startDate", "endDate", "internship_field"].includes(sortedBy)
  ) {
    sortedBy = "name";
  }
  if (!["Diskuteres", "Godkjent", "Avslått"].includes(status)) {
    status = "";
  }

  const query = await DBclient.select()
    .from("internshipAgreements")
    .innerJoin(
      "internships",
      "internshipAgreements.internship_id",
      "=",
      "internships.id"
    );
  console.log(query);
  const response = query.slice((page - 1) * limit, page * limit);

  return (
    response.map((agreement) => {
      return {
        name: agreement.name,
        id: agreement.id,
        status: agreement.status,
        startDate: agreement.startDate.toDateString(),
        endDate: agreement.endDate.toISOString(),
        internship_field: agreement.internship_field,
      };
    }) || []
  );
}
