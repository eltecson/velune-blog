import { LoginForm } from "@/components/Forms";
import { LoginIllustration } from "@/components/ui/icons";
import Link from "@/components/ui/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in"
}

export default function Login() {
  return (
    <main className="flex items-center justify-center font-sans min-h-screen bg-background">
      <div className="hidden lg:block flex flex-col justify-center items-center hidden lg:flex-1">
        <LoginIllustration className="w-full h-auto" />
      </div>
      <div className="flex flex-col gap-[50px] px-[20px] md:px-[80px] pt-[50px] pb-[100px] lg:flex-1">
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="font-display text-2xl font-medium text-center">Welcome Back</h1>
          <h2 className="font-sans text-base leading-tight text-center">
            Enter your email or username, and password to access your account.
          </h2>
        </div>
        <div className="flex flex-col gap-[20px]">
          <LoginForm />
          <p className="text-base text-foreground/80 leading-tight text-center">
            By logging in, you agree to our <Link href="/terms" className="underline underline-offset-4 font-medium">
            Terms & Conditions</Link> and <Link href="/privacy-policy" className="underline underline-offset-4 font-medium">
            Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
