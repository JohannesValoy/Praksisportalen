"use server";

import { redirect } from "next/navigation";
/**
 * Action to navigate to a new page
 * @param url the url to navigate to
 */
export async function navigate(url: string) {
  redirect(`/${url}`);
}
