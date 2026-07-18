import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { loginSchema } from '@/constants/forms'
import { NETWORK_TIMEOUT } from '@/constants/error-messages'
import { isEmail, isNonRetryable, isPostgrestError, statusFromPostgrestError } from '@/lib/utils'
import { AuthError } from '@supabase/supabase-js'
import { ZodError } from 'zod'
import pRetry, { AbortError } from 'p-retry'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Initialize main variables
    const supabase = await createClient()
    const body = await req.json()

    // Validate form
    const parsed = loginSchema.parse(body)
    const { "username-email": usernameEmail, password } = parsed

    const { success } = isEmail.safeParse(usernameEmail)

    if (success) { // No need to get email so...
      return await pRetry(async () => {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: usernameEmail,
          password
        })

        // Success
        if (!authError) {
          revalidatePath('/(site)', 'layout')
          return NextResponse.json({
            success: true,
            message: "Successfully signed in!"
          }, {
            status: 200
          })
        }

        // Stop retrying or continue retrying
        if (isNonRetryable(authError.status)) {
          throw new AbortError(authError)
        }
        throw authError
      }, { retries: 5 })
    } else { // Need to get email first
      const email = await pRetry(async () => {
        const { data: email, error: lookupError } = await supabase
          .rpc("get_email_by_username", {
            p_username: usernameEmail,
          });

        // Success
        if (!lookupError) {
          return email
        }

        // Stop or continue retryig
        if (isNonRetryable(lookupError)) {
          throw new AbortError(lookupError)
        }
        throw lookupError
      }, { retries: 5 })

      // Finally you can sign in
      return await pRetry(async () => {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        // Success
        if (!authError) {
          revalidatePath('/(site)', 'layout')
          return NextResponse.json({
            success: true,
            message: "Successfully signed in!"
          }, {
            status: 200
          })
        }

        // Stop retrying or continue retrying
        if (isNonRetryable(authError.status)) {
          throw new AbortError(authError)
        }
        throw authError
      }, { retries: 5 })
    }
  } catch (error) {
    if (error instanceof AuthError) {
      if (isNonRetryable(error.status)) {
        return NextResponse.json({
          success: false,
          message: error.message
        }, {
          status: error.status
        })
      } else {
        return NextResponse.json({
          success: false,
          message: NETWORK_TIMEOUT
        }, {
          status: 504
        })
      }
    } else if (isPostgrestError(error)) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, {
        status: statusFromPostgrestError(error)
      })
    } else if (error instanceof ZodError) {
      return NextResponse.json({
        success: false,
        message: `${error.issues[0].message} at ${String(error.issues[0].path[0])}`
      }, {
        status: 400
      })
    } else {
      return NextResponse.json({
        success: false,
        message: NETWORK_TIMEOUT
      }, {
        status: 408
      })
    }
  }
}
