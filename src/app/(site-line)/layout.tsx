import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function SiteLineLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex flex-col bg-background text-foreground">
      <Navbar verticalLine />
      {children}
      <Footer />
      <Toaster />
    </body>
  );
}
