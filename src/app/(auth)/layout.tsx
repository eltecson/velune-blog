import type { Metadata } from "next";
import { Google_Sans_Flex, Inter } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import pRetry from "p-retry";
import { redirect } from "next/navigation";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Velune — Write Ideas That Last.",
    template: "%s | Velune",
  },
  description: "A full-stack blog application featuring post creation, editing, deletion, and dynamic rendering — built as a demo project to explore modern web development workflows.",
};

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  // If user is already authenticated, redirect to dashboard
  const user = await pRetry(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return { user };
  }, { retries: 2 })
  if (user) {
    redirect("/dashboard")
  }

  return (
    <html
      lang="en"
      className={`${googleSansFlex.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
