import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet | Dashboard",
  description: "Carteira Digital",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
