/** Reject base64 data URLs (huge payloads); expect HTTPS URLs from Media Library or CDN. */
export function sanitizeGuestImageField(raw: unknown):
  | { ok: true; value: string | null }
  | { ok: false; error: string } {
  if (raw === undefined || raw === null) {
    return { ok: true, value: null }
  }
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Photo URL must be text.' }
  }
  const t = raw.trim()
  if (!t) {
    return { ok: true, value: null }
  }
  if (t.startsWith('data:')) {
    return {
      ok: false,
      error:
        'Do not paste image files here. Upload the image in Admin → Media, then paste the HTTPS link.',
    }
  }
  const max = 2048
  if (t.length > max) {
    return { ok: false, error: `Photo URL must be at most ${max} characters.` }
  }
  return { ok: true, value: t }
}
