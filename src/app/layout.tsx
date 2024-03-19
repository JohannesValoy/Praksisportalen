import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <header
          className="flex justify-between p-4"
          style={{
            backgroundColor: "rgb(var(--accent-color))",
            color: "rgb(var(--accent-text-color))",
          }}
        >
          <div>Logo</div>
          <div className="flex space-x-6">
            <Link href="/">Home</Link>
            <Link href="/coordinator/administerStudents">
              Administer Students
            </Link>
          </div>
        </header>
        <div className="p-4 overflow-y-scroll w-full h-full">{children}</div>
      </body>
    </html>
  );
}
