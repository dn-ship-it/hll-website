# Deploying to Vercel (staging)

The app is a single Next.js project with Payload CMS mounted inside it, so
Vercel's Next.js preset handles it with no `vercel.json` needed. What it does
need is the right environment, because two of the local defaults cannot work on
a serverless host.

## The two things that must change from local

**SQLite will not work.** `src/payload.config.ts` picks its database adapter
from `DATABASE_URI`: a `postgres://` string uses Postgres, anything else falls
back to SQLite at `file:./payload.db`. Vercel's filesystem is read-only apart
from an ephemeral `/tmp`, so the SQLite path cannot function there. Staging
needs a real Postgres instance — Vercel Postgres, Neon, Supabase or RDS all
work.

**Local disk media will not persist.** Without `S3_BUCKET`, Payload writes
uploads next to the app. On Vercel those vanish on the next deploy or cold
start. Point it at S3 or an S3-compatible bucket.

Neither failure is loud on its own, which is the trap worth knowing about: every
marketing page wraps its CMS query in `try`/`catch` and falls back to the static
data in `src/data/`. A staging deploy with a broken database therefore renders a
complete-looking site with no CMS content behind it, and only `/admin` returning
500. The config logs a warning at boot for both cases — check the Vercel
function logs after the first deploy.

## Required environment variables

Set these on the Vercel project, scoped to the environment you are deploying
(Preview for staging, or a dedicated staging environment).

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URI` | Yes | Must start with `postgres://`. Include `?sslmode=require` for most managed providers. |
| `PAYLOAD_SECRET` | Yes | Long random string. Generate with `openssl rand -hex 32`. Do not reuse the production value. |
| `NEXT_PUBLIC_SERVER_URL` | Recommended | The deployment's own URL, used for admin preview links. |
| `S3_BUCKET` | For uploads | Omit only if nothing will be uploaded through the admin. |
| `S3_REGION` | With S3 | Defaults to `ap-south-1`. |
| `S3_ACCESS_KEY_ID` | With S3 | |
| `S3_SECRET_ACCESS_KEY` | With S3 | |
| `S3_ENDPOINT` | Optional | Only for S3-compatible storage such as MinIO; forces path-style addressing. |

## First deploy

```bash
npm i -g vercel
vercel login                 # use the HLL account
vercel link                  # select the HLL team and project
vercel env add DATABASE_URI preview
vercel env add PAYLOAD_SECRET preview
# ...and the rest of the table above

vercel deploy                # staging / preview deployment
vercel deploy --prod         # production, when you are ready
```

`vercel deploy` without `--prod` produces a preview deployment, which is what
"staging" means here unless a dedicated staging environment is configured on the
project.

## After the first deploy

Payload's `onInit` hook in `src/payload.config.ts` seeds baseline content when a
collection is empty, so the first boot against an empty database creates the
site settings, the HLL Foundation service and the other starter documents. It is
guarded on `totalDocs === 0`, so redeploys will not duplicate anything, but note
that it does run its checks on every cold start.

Create the first admin user by visiting `/admin` on the deployment — Payload
prompts for it when the users collection is empty.

## Local production smoke test

To check a production build locally before deploying:

```bash
DATABASE_URI='postgres://...' PAYLOAD_SECRET="$(openssl rand -hex 32)" npm run build
npm run start
```

Note that `npm run start` binds to `127.0.0.1:43141`. Vercel ignores the `start`
script entirely and uses its own serverless adapter, so that binding only
affects local runs.
