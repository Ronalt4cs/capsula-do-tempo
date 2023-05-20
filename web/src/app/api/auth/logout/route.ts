import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectUrl = new URL('/', request.url)

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'set-cookie': `token=; path=/; max-age=0`,
    },
  })
}
