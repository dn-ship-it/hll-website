# HLL × Cornerstone — UI + API effort estimate

Interactive estimate for building the **HLL <> Cornerstone India** website UI and the APIs behind it, using the existing LightFX animation components and Cursor.

**Recommended slice: 23–33 working days** (186–260 hours) for one engineer using Cursor. Plan on the likely **33 days / 260 hours** unless the Figma Pages cluster is only a handful of templates.

- UI only (Figma + existing shaders, mock data): **12–17 days**
- UI + content APIs (recommended): **23–33 days**
- Full HLL Lifecare RFP (bilingual GIGW CMS, chatbot, STQC, migration): **55–75 days** for two people — the official tender allows 90 calendar days

The animation kit already covers HLLButton, outline button, heading reveal, full-page / bottom shaders, ripples, and tags. Rebuilding those shaders would add 3–4 weeks.

## Run locally

```bash
npm install
npm run dev -- --port 43141
```

Open [http://127.0.0.1:43141](http://127.0.0.1:43141).

## What this is based on

| Source | What we could use |
| --- | --- |
| [Figma](https://www.figma.com/design/m08lOU9DrNl1YNI4kfFvl5/HLL-%3C%3E-Cornerstone-India?node-id=16-3) | File loaded. Node `16:3` is the project board (Cover / Pages / Status / Tags). Export is restricted; Dev Mode needs login. Site IA is inferred from the animation kit, not a full frame inventory. |
| [Animation docs](https://hok-sdf-lensblur-lyart.vercel.app/docs.html) | Eight production components + LightFX Studio + SDF lens blur. |
| `github.com/buildwithteky/HLL-UI-Demo` | Private (404). Local zips were not available in this environment. |
| [lifecarehll.com](https://www.lifecarehll.com) + HLL website RFP | ~60 public URLs and CMS modules (pages, tenders, careers, media, contact). |

## Stack of this repo

Next.js, TypeScript, Tailwind, shadcn/ui. The app is the estimate itself — it is not the HLL website.
