import z from "zod"

export const registerForm = [
  {
    id: "full-name",
    type: "text",
    placeholder: "Enter your full name",
    label: "Full Name",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email address",
    label: "Email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
  {
    id: "confirm-password",
    type: "password",
    placeholder: "Enter your password again",
    label: "Confirm Password",
  },
]

export const loginForm = [
  {
    id: "username-email",
    type: "text",
    placeholder: "Enter your username or email address",
    label: "Username/Email",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
]

export const registerSchema = z
  .object({
    "full-name": z.string().max(50, "Name too long"),
    email: z.email().max(256, "Email too long"),
    password: z.string().min(8, "Password too short").max(50, "Password too long"),
    "confirm-password": z.string().min(8, "Confirm Password too short").max(50, "Confirm Password too long"),
    "remember-me": z.enum(["on", "off"], "Invalid remember-me value"),
  })
  .refine(
    (data) => data.password === data["confirm-password"],
    {
      message: "Passwords do not match",
      path: ["confirm-password"]
    }
  )

export const loginSchema = z
  .object({
    "username-email": z.union([
      z.email().max(256, "Email too long"),
      z.string().max(50, "Name too long"),
    ]),
    password: z.string().min(8, "Password too short").max(50, "Password too long"),
    "remember-me": z.enum(["on", "off"], "Invalid remember-me value"),
  })
