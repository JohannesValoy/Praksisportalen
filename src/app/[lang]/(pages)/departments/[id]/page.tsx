import { getDepartmentObjectByID } from "@/services/DepartmentService";
import { notFound } from "next/navigation";
import DepartmentPage from "./department";
import { Department } from "@/app/_models/Department";
import { getUser } from "@/lib/auth";

/**
 * The Page component fetches a department object by ID and renders the DepartmentPage component.
 * @param params The parameters of the page.
 */
export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  let department: Department = null;

  try {
    department = await getDepartmentObjectByID(Number(params.id));
  } catch (error) {
    console.error("Failed to fetch Department", error);
    notFound();
  }

  return (
    <DepartmentPage
      department={department}
      wordbook={null}
      user={await getUser()}
    />
  );
}
