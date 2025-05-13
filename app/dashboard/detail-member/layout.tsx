import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Member - Manage Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
