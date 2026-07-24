"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerForm } from "@/constants/forms";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import { SubmitEvent, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "@/components/ui/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerInProgress = useRef(false)

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerInProgress.current) return
    registerInProgress.current = true

    const formData = new FormData(e.currentTarget)
    const data = {
      "full-name": formData.get("full-name"),
      email: formData.get("email"),
      password: formData.get("password"),
      "confirm-password": formData.get("confirm-password"),
      "remember-me": formData.get("remember-me"),
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const { message } = await res.json()

    if (res.ok) {
      toast.success(message, { position: "bottom-center" })
      redirect('/dashboard')
    } else {
      toast.error(message, { position: "bottom-center" })
    }

    registerInProgress.current = false
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
      {registerForm.map(field => (
        <Field
          key={field.id}
          className="font-sans gap-[10px]"
        >
          <FieldLabel htmlFor={field.id} className="normal-case text-base font-medium leading-tight tracking-normal">
            {field.label} <span className="text-[var(--bad-clr)]">(required)</span>
          </FieldLabel>
          <div className="px-[16px] py-[8px] bg-foreground/5 flex justify-between items-center">
            <Input
              id={field.id}
              name={field.id}
              type={showPassword && field.type === "password" ? "text" : field.type}
              placeholder={field.placeholder}
              className="placeholder:text-foreground/50 font-sans text-base leading-tight tracking-normal"
              required
            />
            {field.type === "password" && (
              <Button
                size="icon-sm"
                onClick={() => setShowPassword(!showPassword)}
                className=""
                type="button"
              >
                {showPassword ? (
                  <RiEyeLine className="size-5" />
                ) : (
                  <RiEyeCloseLine className="size-5" />
                )}
              </Button>
            )}
          </div>
        </Field>
      ))}
      <Field orientation="horizontal" className="gap-2">
        <Checkbox
          id="remember-me"
          name="remember-me"
          defaultChecked
          className="size-5 data-checked:bg-foreground data-checked:text-background data-checked:border-foreground border-foreground/80 rounded-[4px]"
        />
        <FieldLabel
          htmlFor="remember-me"
          className="tracking-normal normal-case text-base font-medium leading-tight"
        >
          Remember me for faster sign-in
        </FieldLabel>
      </Field>
      <p className="text-base leading-tight font-sans">
        Already have an account? <Link href="/login" className="font-medium underline underline-offset-4">Sign in</Link>
      </p>
      <Button
        type="submit"
        className="bg-[var(--good-clr)] text-base text-complementary font-sans font-medium normal-case tracking-normal text-center py-[24px]"
      >
        Create Account
      </Button>
    </form>
  )
}
