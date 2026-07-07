"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerForm } from "@/constants/forms";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "@/components/ui/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="flex flex-col gap-[20px]">
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
              className="placeholder:text-foreground/50 text-base leading-tight tracking-normal"
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
      <div className="flex flex-col gap-[20px]">
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
        <Link href="/forgot-password" className="text-base font-medium font-sans active:underline underline-offset-4 text-foreground">
          Forgot Password
        </Link>
        <p className="text-base">
          Already have an account? <Link href="/login" className="font-medium underline underline-offset-4">Sign in</Link>
        </p>
        <Button
          type="submit"
          className="bg-[var(--good-clr)] text-base text-complementary font-sans font-medium normal-case tracking-normal text-center py-[24px]"
        >
          Create Account
        </Button>
      </div>
    </form>
  )
}
