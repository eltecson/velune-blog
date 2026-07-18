'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { registerSchema } from '@/constants/forms'
import { toast } from 'sonner'
import { NETWORK_TIMEOUT } from '@/constants/error-messages'
import { getUsername, isNonRetryable, normalizeFullName } from '@/lib/utils'
import { AuthError } from '@supabase/supabase-js'
import { ZodError } from 'zod'
import pRetry, { AbortError } from 'p-retry'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const parsed = registerSchema.safeParse(formData)
  if (!parsed.success) {
    const { error } = parsed
    toast.error(error.issues[0].message)
    return
  }
  const { data } = parsed

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  })
  if (error) {
    toast.error(NETWORK_TIMEOUT)
    return
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  try {
    const supabase = await createClient()

    // Validate form
    const parsed = registerSchema.parse(formData)
    const { email, password } = parsed

    // Get proper full name and username
    let { "full-name": fullName } = parsed
    fullName = normalizeFullName(fullName)
    const username = getUsername(fullName)

    // Sign up and authenticate user alongside creating new data for them
    await pRetry(async () => {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            "full_name": fullName,
            username
          }
        }
      })

      if (!authError) return

      if (authError?.status && isNonRetryable(authError.status)) {
        throw new AbortError(authError);
      }
      throw authError
    }, { retries: 5 });

    revalidatePath('/(site)', 'layout')
    redirect('/dashboard')
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      if (error.status === 400) {
        toast(error.message)
      } else {
        toast(NETWORK_TIMEOUT)
      }
    } else if (error instanceof ZodError) {
      toast(error.issues[0].message)
    } else {
      toast(NETWORK_TIMEOUT)
    }
  }
}
