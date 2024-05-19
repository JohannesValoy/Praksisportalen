import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "./_components/LogoutButton";
import Logo from "../../public/Icons/logo-helse-mr";
import { getServerSession } from "next-auth";
import ClientThemeWrapper from "@/context/ClientThemeWrapper";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeSwap from "./_components/ThemeChanger";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

const inter = Inter({ subsets: ["latin"] });

/**
 * The metadata of the application.
 */
export const metadata: Metadata = {
  title: "Praksisportalen HMR",
  description: "Praksisportalen for Helse Møre og Romsdal",
};

/**
 * The RootLayout component is the layout of the application.
 * @param root The root of the layout.
 * @param root.children The children of the layout.
 * @returns The layout of the application.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col bg-base-100 text-base-content`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <ClientThemeWrapper>
            <header className="flex justify-between bg-neutral text-neutral-content p-4 items-center ">
              <Link href={"/"}>
                <div className="h-10">
                  <Logo />
                </div>
              </Link>
              <div className="flex space-x-6 items-center">
                <div className="dropdown dropdown-end">
                  <button
                    type="button"
                    className="btn btn-ghost m-1"
                    aria-label="Settings"
                  >
                    <Cog6ToothIcon className="h-6 w-6" />
                  </button>
                  <ul className="dropdown-content z-[1] menu p-4 shadow bg-base-300 text-base-content rounded-box w-52">
                    <li className="gap-4">
                      <ThemeSwap />
                      {(await getServerSession())?.user && (
                        <>
                          <Link
                            href={"/profile"}
                            className="btn btn-primary text-primary-content"
                          >
                            Profile
                          </Link>
                          <LogoutButton />
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </header>
            <main className="flex flex-col items-center py-4 h-full bg-base-100 text-base-content overflow-y-scroll scrollbar-hide">
              {children}
            </main>
          </ClientThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
