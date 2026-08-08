import Navbar from "@/components/Navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body data-theme="landing" className="min-h-full flex flex-col bg-background text-foreground">
      <Navbar />
      {children}
    </body>
  );
}
