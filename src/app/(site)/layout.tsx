import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex flex-col bg-background text-foreground">
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </body>
  );
}
