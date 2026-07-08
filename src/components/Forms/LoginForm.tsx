"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginForm } from "@/constants/forms";
import { RiEyeCloseLine, RiEyeLine } from "@remixicon/react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "@/components/ui/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="flex flex-col gap-[20px]">
      {loginForm.map(field => (
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
      <div className="flex flex-col gap-[20px] md:flex-row md:justify-between md:items-center">
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
        <Link href="/forgot-password" className="text-base leading-tight font-medium font-sans active:underline hover:underline underline-offset-4 text-foreground md:shrink-0 md:text-end">
          Forgot Password
        </Link>
      </div>
      <p className="text-base leading-tight">
        Don't have an account? <Link href="/register" className="font-medium underline underline-offset-4">Create one</Link>
      </p>
      <Button
        type="submit"
        className="bg-[var(--good-clr)] text-base text-complementary font-sans font-medium normal-case tracking-normal text-center py-[24px]"
      >
        Sign In
      </Button>
    </form>
  )
}
