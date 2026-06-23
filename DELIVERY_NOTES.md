# SBS 3-Door Funnel — Delivery Notes

The four-page static funnel has been implemented from the uploaded **Dark Frontier** specification using the selected design philosophy, **Dark Editorial Institutionalism**. The build uses a restrained near-black visual system, Cormorant Garamond headlines, Inter body/UI copy, IBM Plex Mono route and pricing labels, 0.5px hairline borders, quiet hover states, and a premium editorial funnel structure.

| Page | Route | Purpose |
|---|---|---|
| Portal | `/` | Main three-door selection page for `selfbuiltsystem.com`. |
| Door I | `/sbs-io` | Self-build catalogue for the $17, $150, and $300 products. |
| Door II | `/sbs-ai` | Primary done-for-you Frontier OS application funnel. |
| Door III | `/frontier-co` | Inner Circle membership and Frontier Council upsell page. |

## Implemented Features

The site includes the full page architecture requested in the prompt, including portal navigation, VSL blocks, category reframing copy, three door cards, product cards with premium mockups, Door II fit/not-fit positioning, 60-day deployment timeline, three Frontier OS tiers without line-item pricing, Inner Circle asset cards, pricing blocks, Council upsell, risk reversals, legal-only footer, mobile stacking, and static SEO metadata.

Meta Pixel event calls are wired defensively through a placeholder. Once `META_PIXEL_ID` is replaced in `client/index.html`, the script will initialize automatically. In-app events are also dispatched as `sbs:funnel-event` browser events for easier future integration.

## Placeholder Values To Replace

| Placeholder | Location | Replace With |
|---|---|---|
| `META_PIXEL_ID` | `client/index.html` | Real Meta Pixel ID. |
| `#STRIPE_LINK_VAULT_17` | `client/src/pages/Home.tsx` | Master Prompt Vault checkout URL. |
| `#STRIPE_LINK_PLAYBOOK_150` | `client/src/pages/Home.tsx` | 30-Day Self-Build Playbook checkout URL. |
| `#STRIPE_LINK_TEMPLATES_300` | `client/src/pages/Home.tsx` | Templates + Agent Stack checkout URL. |
| `#APPLICATION_FORM_URL` | `client/src/pages/Home.tsx` | Door II application form URL. |
| `#SKOOL_LINK_MONTHLY` | `client/src/pages/Home.tsx` | Monthly Skool checkout or join URL. |
| `#SKOOL_LINK_ANNUAL` | `client/src/pages/Home.tsx` | Annual Skool checkout or join URL. |
| `#COUNCIL_APPLICATION_URL` | `client/src/pages/Home.tsx` | Frontier Council application URL. |
| `[CREDIBILITY_ANCHOR]` | Door II hero copy | Real credibility anchor. |
| Proof placeholders | Proof-strip sections | Real partner logos, client work, or testimonial assets. |
| VSL placeholder frame | All VSL blocks | Real Jean VSL poster frames or embedded videos. |

## Validation

The project passes TypeScript validation and the production build completes successfully with Vite. A preview screenshot was captured after implementation and health checks reported no TypeScript or language-service errors.

## Notes On Assets

The specification requires real Jean footage and prohibits artificially generated people. To respect that constraint, the current build uses a non-human dark editorial portal visual as the temporary VSL poster background and explicitly labels the frame as pending real Jean footage. The product mockups are non-human premium renders prepared for the Door I catalogue.
