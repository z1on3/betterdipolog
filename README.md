# BetterDipolog.org 🌊

**BetterDipolog.org** is a volunteer-driven, open-source initiative to modernize and simplify access to government services, public data, and local resources for **Dipolog City**, the capital of Zamboanga del Norte, Philippines — the "Gateway to Western Mindanao".

We are building a community-run digital portal for Dipolognons, by Dipolognons. BetterDipolog is **not** an official website of the City Government of Dipolog; for official information visit [dipologcity.gov.ph](https://dipologcity.gov.ph/).

## 🙏 Credits

BetterDipolog is a fork of **[BetterIligan](https://github.com/KishonShrill/BetterIligan)** by Chriscent Louis June Pingol and contributors, released under the MIT License. The original project powers [betteriligancity.org](https://betteriligancity.org). Huge thanks to the BetterIligan team for building and open-sourcing the foundation this site runs on. The original copyright notice is preserved in [LICENSE.md](LICENSE.md).

## 💡 Why This Was Made

Navigating local government procedures and finding reliable public information can feel like being lost in a digital bureaucracy. Information is often fragmented across different social media pages, outdated websites, or physical bulletin boards.

BetterDipolog provides a single, clean, and accessible hub. We believe that accessing public services, discovering local heritage, and staying informed should be straightforward, fast, and user-friendly.

## 🎯 What We Want to Do (Our Goals)

- **Centralize Services:** A searchable directory of government services, requirements (like birth certificates and business permits), and procedures.
- **Promote Dipolog:** Highlight our 21 barangays, history, festivals, and attractions.
- **Digitize Resources:** Centralized forms and localized guides to save citizens unnecessary trips to City Hall.
- **Foster Transparency:** Easy-to-read pages for bids and procurement, budget documents, and disaster or weather updates.
- **Be Ready for Emergencies:** The Disaster Preparedness Hub and the Bangon Dipolog relief command center.
- **Ensure Accessibility:** Localization (Cebuano/Bisaya and Tagalog) so every Dipolognon can use the platform.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router), built with vinext (`@vinext/cloudflare`)
- **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite) — database `betterdipolog-bangon`
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/)

## 🚀 Local Development

```bash
npm install
npm run dev        # applies local D1 migrations, then starts the dev server on :3000
```

See [CLAUDE.md](CLAUDE.md) for the full command list and architecture notes, and [docs/STRUCTURE.md](docs/STRUCTURE.md) for the folder layout.

## ☁️ Deployment

Pushing to `main` auto-deploys via **Cloudflare Workers Builds** (git integration configured in the Cloudflare dashboard):

- **Build command:** `npm run build`
- **Deploy command:** `npm run deploy` (applies pending D1 migrations to the remote database, then deploys `dist/server/wrangler.json`)

The Workers Builds API token needs D1 edit permission for the migration step. The Worker name in the dashboard must match `name` in `wrangler.jsonc` (`betterdipolog`).

### Production secrets

Set these on the Worker (Settings → Variables and Secrets, or `npx wrangler secret put <NAME>`):

- `RECAPTCHA_SECRET_KEY`: required. Public forms reject submissions without it.
- `DISCORD_WEBHOOK_URL`: where contribution and report forms are delivered.
- `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`: Bangon Dipolog moderator login.
- `INGEST_SECRET`: guards the Bangon feed ingester.

`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is read at build time, so add it under the Workers Builds **build** variables.

## 🤝 How to Help

BetterDipolog is a community effort, and we welcome contributions from developers, designers, researchers, and writers!

- **Want to write code, design interfaces, or fix bugs?** Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding standards, and how to submit a Pull Request.
- **Spotted wrong or outdated information?** Use the "Report an issue" form on the site or email [reports@betterdipolog.org](mailto:reports@betterdipolog.org).

## 📜 License

This project is open-source and available under the [MIT License](LICENSE.md).
