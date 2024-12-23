import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Next store",
  description: "Nifty store built",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            <Navbar />
            <Container className="py-20">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
