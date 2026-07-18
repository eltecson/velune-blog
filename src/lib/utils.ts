import { PostgrestError } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeFullName(input: string): string {
  return input
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(
      word =>
        word.charAt(0).toLocaleUpperCase() +
        word.slice(1).toLocaleLowerCase(),
    )
    .join(" ");
}

export function getUsername(fullName: string): string {
  const words = fullName.split(" ");

  if (words.length === 1) {
    return words[0].toLowerCase().slice(0, 20);
  }

  const first = words[0].toLowerCase();
  const last = words.at(-1)!.toLowerCase();

  const maxFirstLength = Math.max(1, 20 - last.length - 1);

  return `${first.slice(0, maxFirstLength)}.${last}`.slice(0, 20);
}

export function isNonRetryable(
  error: number | PostgrestError | undefined
): boolean {
  if (error == null) {
    return false;
  }

  if (typeof error === "number") {
    return error >= 400 && error < 500 && error !== 429;
  }

  if (isPostgrestError(error)) {
    switch (error.code) {
      // Retryable PostgreSQL errors
      case "40001": // serialization_failure
      case "40P01": // deadlock_detected
      case "55P03": // lock_not_available
        return false;

      default:
        return true;
    }
  }
  return false
}

export function isPostgrestError(value: unknown): value is PostgrestError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

export const isEmail = z.email().max(256, "Email too long!")

export function statusFromPostgrestError(error: PostgrestError): number {
  switch (error.code) {
    case "23505":
    case "23503":
      return 409;

    case "23502":
    case "22P02":
      return 400;

    case "42501":
      return 403;

    case "PGRST116":
      return 404;

    case "40001":
    case "40P01":
    case "55P03":
      return 503;

    default:
      return 500;
  }
}
