import { getCsrfToken } from "next-auth/react";
import LoginComponent from "./loginPage";
import type { GetServerSidePropsContext } from "next";
async function LoginPage(context: GetServerSidePropsContext) {
  return (
    <LoginComponent csrfToken={await getCsrfToken(context)}></LoginComponent>
  );
}

export default LoginPage;
