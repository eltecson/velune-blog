import { RegisterForm } from "@/components/Forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started"
}

export default function Register() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center font-sans min-h-screen bg-background">
      <div className="flex flex-col gap-[50px] px-[20px] py-[100px]">
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="font-display text-2xl font-medium text-center">Join Velune.</h1>
          <h2 className="font-sans text-base leading-tight text-center">
            Enter your full name, email, and password to create your account.
          </h2>
        </div>
        <div className="">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
