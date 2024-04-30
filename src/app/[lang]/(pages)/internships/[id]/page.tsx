import { Internship } from "@/app/_models/InternshipPosition";
import { getUser } from "@/lib/auth";
import { getInternshipPositionObjectByID } from "@/services/InternshipPositionService";
import { notFound } from "next/navigation";
import InternshipPage from "./internship";

export default async function Page({
  params,
}: Readonly<{ params: { id: string } }>) {
  let internship: Internship = null;
  try {
    internship = await getInternshipPositionObjectByID(Number(params.id));
  } catch (error) {
    console.error("Failed to fetch Internship", error);
    notFound();
  }
  return (
    <InternshipPage
      internship={internship}
      wordbook={null}
      user={await getUser()}
    />
  );
}
