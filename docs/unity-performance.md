# Unity WebGL Performance & Deployment Notes

Short checklist and recommended steps for serving Unity WebGL builds efficiently in this site.

1. Directory layout

- Put builds under: `public/unity/<gameId>/Build/` or `public/unity/<gameId>/` so the assets are reachable at `/unity/<gameId>/...`.

2. Compression (important)

- Unity WebGL outputs large files (`.data`, `.wasm`, `.js`, etc.). Compress them with gzip and Brotli. Unity can output `.unityweb` assets when using compression in the build — prefer that.
- Pre-compress files during your build pipeline and upload the compressed files to CDN or static host. Serve the precompressed file and set the `Content-Encoding` header on the server (or let the CDN detect and serve the best encoding).

Example scripts (macOS / Linux) to generate gzip & brotli alongside the original files:

```bash
# run from repo root
find public/unity -type f \( -name "*.data" -o -name "*.wasm" -o -name "*.js" -o -name "*.mem" -o -name "*.unityweb" \) -print0 \
  | xargs -0 -n1 -P4 -I{} sh -c 'gzip -k -9 "{}" && brotli -f -q 11 -o "{}.br" "{}"'
```

3. HTTP headers

- Set `Cache-Control: public, max-age=31536000, immutable` for static build assets (we add a Next.js header rule for `/unity/:path*`).
- Do NOT set `Content-Encoding` in the app unless you are serving precompressed assets (CDN or server should set it when returning the `.gz`/`.br` file).

4. CDN / Hosting

- Use a CDN (Vercel, Cloudflare, Netlify, S3+CloudFront, etc.) that can serve pre-compressed assets or perform on-the-fly compression. Prefer serving precompressed files to avoid CPU cost on every request.

5. Browser memory and runtime

- Unity WebGL can use significant memory; test on low-end devices and provide a fallback message if memory allocation fails.
- Avoid rendering more than one active Unity instance at a time on a page.

6. Client-side optimizations

- Lazy-load the Unity player only when the user is likely to play: use an IntersectionObserver or require an explicit Play button. (A `LazyUnity` component is included in the repo.)
- Use `dynamic()` client-only imports (SSR disabled) to avoid shipping Unity loader code to the server-rendered HTML.

7. Debugging tips

- If seeing long load times, check network waterfall for `.unityweb`, `.data`, `.wasm` files and confirm `Content-Encoding` and `Cache-Control` headers.
- Test with throttled network (Chrome DevTools) and inspect memory usage.

If you'd like, I can add a small build script / npm task that precompresses files and a short CI job to upload them to a CDN with correct headers.
