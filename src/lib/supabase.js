import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const createServerClient = (cookies) => {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name) {
          return cookies.get(name)?.value
        },
        set(name, value, options) {
          cookies.set(name, value, options)
        },
        remove(name, options) {
          cookies.set(name, '', { ...options, maxAge: 0 })
        },
      },
    }
  )
}