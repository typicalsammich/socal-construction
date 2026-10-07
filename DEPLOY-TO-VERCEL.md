# So-Cal Construction: GitHub + Vercel

This is a standard Next.js website. It includes the cinematic entrance, outline bear/skyline logo, 12 service pages, 25 location pages, before/after transitions, branded desktop cursor, mobile navigation and sticky call button, project gallery, contact form, and reviews.

## Deploy the website

1. Extract this ZIP.
2. Upload the CONTENTS of the extracted folder to the root of your GitHub repository. `package.json`, `app`, `public`, and `next.config.ts` belong at the top level. Do not upload the ZIP itself.
3. In Vercel, import that GitHub repository.
4. Framework Preset: **Next.js**.
5. Build Command: **npm run build**. Install Command: **npm install** (or leave the defaults).
6. Output Directory: leave the override OFF. Do not enter `dist`, `out`, or `.next`.
7. Deploy. The main website builds without review database keys.
8. Add your final domain and set `NEXT_PUBLIC_SITE_URL` to that full URL, such as `https://example.com`. Redeploy after setting it. This controls canonical tags, structured data, robots.txt and sitemap.xml.

If `NEXT_PUBLIC_SITE_URL` is blank, Vercel's production project URL is used automatically. Remove the example domain value before deploying if you have not chosen the domain yet.

## Enable review submissions and approvals

Persistent reviews need a database outside Vercel's temporary function filesystem. This export includes a Supabase REST adapter and database schema. It does not rely on ChatGPT or Cloudflare.

1. Create a Supabase project.
2. In the SQL Editor, run `supabase/reviews.sql` once.
3. Find the project URL and a **secret** API key (`sb_secret_...`) in the Supabase dashboard. Keep the secret key on the server.
4. In Vercel > Settings > Environment Variables add:
   - `SUPABASE_URL`: your Supabase project URL.
   - `SUPABASE_SECRET_KEY`: the server secret API key.
   - `REVIEW_ADMIN_PASSWORD`: a long, unique random password of at least 24 characters. Use a password manager to generate it.
5. Redeploy.
6. Go to `/review-admin` and sign in with that password to approve or unpublish reviews.

Until the database is connected, the review page shows no published reviews and submission returns an honest message asking the customer to email feedback. The rest of the website works. No submissions are saved to an ephemeral local file. Do not publish a real database secret or owner password to GitHub.

Existing reviews on the ChatGPT-hosted preview are not copied into the Vercel database. New Vercel submissions use your Supabase project.

The project inquiry form opens the visitor's email app with the information prepared. It sends the inquiry only when the visitor sends that email. Both phone numbers are click-to-call links, with the main and alternate lines clearly distinguished.

## Local development

Node.js 22 or later:

```sh
npm install
npm run dev
```

For local review testing, copy `.env.example` to `.env.local` and set the variables. To check the production build:

```sh
npm run build
npm start
```

## Edit the site

- Business details, services, locations, and project captions: `app/data.ts`.
- Layout and interactions: `app/components/site.tsx`.
- Site styles and animation: `app/globals.css`.
- Image files: `public/images`.
- Review approval interface: `app/components/review-admin.tsx`.

The outline logo retains the original bear, skyline, California outline/star, and palm. The original transparent logo is also included as `public/images/logo.png`. The earlier SC-only variation is included as an unused asset for reference.

Actual years of experience are not claimed numerically because the available wording was incomplete. About-page wording is editable; no personal history or testimonial has been invented.

## Checks performed

TypeScript check and real Next.js production build. Browser visual testing was unavailable in the authoring session. Test your final production domain, mobile layout, map, phone links and review configuration after deploying.

References: https://vercel.com/docs/frameworks/full-stack/nextjs and https://supabase.com/docs/guides/getting-started/api-keys
