# Compliance & Security Map

No PHI/PCI data handled — public marketing site. "Healthcare" is an industry vertical only (no FHIR, no patient data). HIPAA not applicable.

| Area | Status | Location |
|---|---|---|
| CMS auth | Payload `users` auth collection, roles admin/editor | `collections/Users.ts` |
| Role enforcement | ⚠ `role` field exists but no collection uses it in access rules | collections/* |
| Public read | Drafts hidden from anon via `_status=published` | Pages, Services, Industries, Posts |
| Secrets | `PAYLOAD_SECRET` from env; defaults to `""` if unset | `payload.config.ts` |
| Prod DB/storage | Warns (not fails) if SQLite / no S3 in production | `payload.config.ts` |
| `htmlEmbed` block / service demo HTML | ⚠ raw HTML rendered from CMS — editor-trust only (XSS if editor compromised) | `blocks/index.ts`, `service-demo-window.tsx` |
| Contact form | Client validation only; no backend, no rate limit, no CAPTCHA yet | `contact/contact-form.tsx` |
| Email | No adapter configured | – |
| Dependencies | `npm audit`: 19 vulns (2 high) at scan time | package-lock.json |
| Localization | en + hi (Hindi) supported in CMS | `payload.config.ts` |
| Accessibility | reduced-motion respected; aria on forms | globals.css, contact-form |
