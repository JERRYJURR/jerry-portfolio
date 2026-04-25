# site.config.json

Single source of truth for personal contact info the website reads at build time. Edit `site.config.json` directly — never commit secrets, but email/LinkedIn/resume link aren't secrets.

## Fields

- **email** — your real email. The "Click to copy" button on the site reads this and copies it to clipboard.
- **resumeUrl** — where the Resume button points. Two options:
  - **Local PDF** (recommended): drop your PDF at `public/resume.pdf` once the build is set up, then set `"resumeUrl": "/resume.pdf"`.
  - **Google Drive / Dropbox**: paste the public share link. Make sure permissions are "Anyone with the link". Use the direct download URL if possible (for Drive: `https://drive.google.com/uc?export=download&id=FILE_ID`).
- **bookingUrl** — your booking link (Google Calendar appointment schedule, Cal.com, etc). Used by the "Book a call" button in the hero, navbar, and footer.
- **linkedinUrl** — your LinkedIn profile URL.
- **location** — short city name shown next to the Canadian flag.

## My take on resume hosting

Local PDF in `public/` is simpler and faster — a designer's resume is usually <500KB and the deploy is trivial. Use Google Drive only if you want to update the resume without redeploying. Either way, the only thing that changes is `resumeUrl` in this file.
