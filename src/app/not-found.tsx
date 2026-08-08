import { NotFoundIllustration } from "@/components/ui/icons";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Link from "@/components/ui/link";
import RedirectButtons from "@/components/ui/redirect-buttons";

export const metadata: Metadata = {
  title: "404 Error"
};

export default function NotFound() {
  return (
    <body className="min-h-full flex flex-col bg-background text-foreground">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex flex-col flex-1 items-center justify-center font-sans bg-background px-[20px] lg:px-[80px]">
          <NotFoundIllustration className="hidden md:block w-full h-auto max-w-[500px]" />
          <div className="flex flex-col items-center justify-center md:hidden">
            <h1 className="text-7xl font-bold tracking-tight">404</h1>

            <h2 className="mt-4 text-2xl font-semibold">
              Page Not Found
            </h2>

            <p className="mt-2 max-w-md text-muted-foreground text-center">
              Sorry, the page you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          <RedirectButtons />
        </main>
      </div>
      <Footer />
      <Toaster />
    </body>
  );
}
