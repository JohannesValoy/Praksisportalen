import { getDictionary } from "@/app/[lang]/dictionaries";
import LoginComponent from "./loginComponent";

export default async function LoginPage({ params }: { params: { lang: string } }) {
  const words = (await getDictionary(params.lang)).login

  return <LoginComponent />;
}
