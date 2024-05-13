import LoginComponent from "./loginComponent";
import Image from "next/image";
import HappyDoctors from "@/../public/helsemr-home-page-image.webp"
/**
 * Nexjs page component for the login page
 * @returns A react component
 */
export default async function LoginPage() {
  return <>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-2 md:gap-16 md:p-5 items-center w-full">
        <div className="flex justify-center items-center rounded-full w-80 md:w-96 bg-slate-600 overflow-hidden h-80 md:h-96">
          <Image
            src={HappyDoctors}
            alt="Healthcare Team"
            width={500}
            height={500}
            className="w-auto h-full max-w-none"
            objectPosition="center"
          />
        </div>
        <div className="md:w-3/5">
          <h1 className="font-bold md:text-5xl text-2xl lg:text-7xl  text-teal-950">
            Velkommen til
          </h1>
          <h1 className="font-bold md:text-5xl lg:text-7xl text-2xl text-teal-900">
            Praksisportalen HMR
          </h1>
          <p className="stroke-gray-500 text-2xl">
            På lag med deg for helsa di
          </p>
        </div>
      </div>
      <LoginComponent />
  </>;
}
