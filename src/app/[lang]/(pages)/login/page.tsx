import LoginComponent from "./loginComponent";
import Image from "next/image";
import HappyDoctors from "@/../public/helsemr-home-page-image.webp";
/**
 * Nexjs page component for the login page
 * @returns A react component
 */
export default async function LoginPage() {
  return (
    <>
      <div className="flex flex-row flex-wrap w-full justify-center items-center text-center mb-10">
        <Image
          src={HappyDoctors}
          alt="Healthcare Team"
          width={300}
          height={300}
          className=" mask mask-circle"
          objectPosition="center"
        />
        <div>
          <h1 className="font-bold text-secoundary">
            Velkommen til{" "}
            <span className="text-accent">Praksisportalen HMR</span>
          </h1>
        </div>
      </div>
      <LoginComponent />
    </>
  );
}
