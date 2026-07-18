import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { registerSchema } from '@/constants/forms'
import { NETWORK_TIMEOUT } from '@/constants/error-messages'
import { getUsername, isNonRetryable, normalizeFullName } from '@/lib/utils'
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
    const parsed = registerSchema.parse(body)
    const { email, password } = parsed

    // Get proper full name and username
    let { "full-name": fullName } = parsed
    fullName = normalizeFullName(fullName)
    const username = getUsername(fullName)

    // Sign up and authenticate user alongside creating new data for them
    return await pRetry(async () => {
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

      if (!authError) {
        revalidatePath('/(site)', 'layout')
        return NextResponse.json({
          success: true,
          message: "Account successfully created!"
        }, {
          status: 201
        })
      }

      if (isNonRetryable(authError.status)) {
        throw new AbortError(authError);
      }
      throw authError
    }, { retries: 5 });
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
