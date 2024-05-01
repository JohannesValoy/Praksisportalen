import { getDictionary } from "@/app/[lang]/dictionaries";
import LoginComponent from "./loginComponent";
interface URLParameters {
  lang: string;
}
/**
 * Nexjs page component for the login page
 * @param param root props from the url
 * @param param.params the parameters from the url
 * @returns A react component
 */
export default async function LoginPage({
  params,
}: Readonly<{
  params: URLParameters;
}>) {
  const words = (await getDictionary(params.lang)).login;

  return <LoginComponent />;
}
