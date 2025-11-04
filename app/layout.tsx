import type { Metadata } from "next";
import { Providers } from "./Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Art Generator",
  description: "Generate amazing AI art with text prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
