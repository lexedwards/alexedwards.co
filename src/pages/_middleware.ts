import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const MAINTENANCE_MODE = process.env.MAINTENANCE === 'true'
const STATIC_FILES = ['.png', '.jpg', '.txt', '.xml', '.ico']

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl
  // === MAINTENANCE RULES ALL ===
  if (MAINTENANCE_MODE) {
    // Any other logic for maintenance can be inserted here
    // Skip over static image assets / robot / sitemap
    if (
      pathname !== '/brb' &&
      !STATIC_FILES.some(str => pathname.endsWith(str))
    ) {
      const url = req.nextUrl.clone()
      url.pathname = '/brb'
      return NextResponse.redirect(url, 307)
    }
  } else {
    // Ensure maintenance pages are kept out of normal scope
    if (pathname === '/brb') {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url, 307)
    }
  }
  return NextResponse.next()
}
