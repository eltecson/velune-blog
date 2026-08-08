import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex flex-col bg-background text-foreground">
      {children}
      <Footer />
      <Toaster />
    </body>
  );
}
