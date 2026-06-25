/*
Design reminder: Dark Editorial Institutionalism.
Restrained near-black surfaces, 0.5px hairline borders, Cormorant editorial headlines,
Inter utility copy, IBM Plex Mono route/price labels, quiet motion, no hype, no em dashes,
no invented proof, no artificial humans. No Silla references anywhere.
Luxury reverse-psychology: application gates, no prices in heroes, scarcity signals,
"Apply" as primary CTA, no FAQ, no comparison tables, no testimonials section.
Value ladder: beginner operator (Door I) -> serious builder (Door II) -> Syndicate room (Door III) -> Capital Desk whisper.
*/
import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useLocation } from "wouter";

const portalVisual =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663150514473/fSXWzfJRKK5zBdpq8WL4xd/sbs-dark-frontier-portal-3wbox52kx6gLLzAfZZHYZ9.webp";

const productAssets = {
  vault: "/manus-storage/master-prompt-vault-mockup-transparent_cba99e5c_c3bf8dd1.png",
  playbook: "/manus-storage/self-build-playbook-mockup-transparent_9ad47f20_633808b1.png",
  stack: "/manus-storage/operator-funnel-stack-mockup-transparent_500ae9b4_00e3e55c.png",
};

const checkoutProducts: Record<
  string,
  { name: string; price: string; pitch: string; image: string; gumroadHref: string; nextStep: string }
> = {
  vault: {
    name: "Master Prompt Vault",
    price: "$17",
    pitch:
      "A practical entry point into the intelligence layer. Prompts, operating language, and thinking patterns for SMB operators who want to move with frontier discipline.",
    image: productAssets.vault,
    // TODO: Replace with Gumroad product link — Master Prompt Vault $17 — automated PDF delivery + onboarding email via Gumroad (gumroad.com)
    gumroadHref: "#GUMROAD_LINK_VAULT_17",
    nextStep: "Your download link will arrive in your inbox from Gumroad within 60 seconds. Check spam if it does not appear.",
  },
  playbook: {
    name: "The 30-Day Self-Build Playbook",
    price: "$150",
    pitch:
      "A month-long operating sequence for turning scattered AI tools into a closed-loop system your team can actually use, refine, and compound.",
    image: productAssets.playbook,
    // TODO: Replace with Gumroad product link — 30-Day Self-Build Playbook $150 — PDF not yet created, build from existing SOPs/playbooks
    gumroadHref: "#GUMROAD_LINK_PLAYBOOK_150",
    nextStep: "Your download link will arrive in your inbox from Gumroad within 60 seconds. Check spam if it does not appear.",
  },
  templates: {
    name: "Operator Funnel Templates + Agent Stack",
    price: "$300",
    pitch:
      "Funnel templates and agent workflows designed to give smaller teams the psychology, proof structure, and conversion leverage of a larger systems firm.",
    image: productAssets.stack,
    // TODO: Replace with Gumroad product link — Operator Funnel Templates + Agent Stack $300
    gumroadHref: "#GUMROAD_LINK_TEMPLATES_300",
    nextStep: "Your download link will arrive in your inbox from Gumroad within 60 seconds. Check spam if it does not appear.",
  },
};

const links = {
  // TODO: Replace with Gumroad product link — Master Prompt Vault $17 — automated PDF delivery + onboarding email via Gumroad (gumroad.com)
  stripeVault: "#GUMROAD_LINK_VAULT_17",
  // TODO: Replace with Gumroad product link — 30-Day Self-Build Playbook $150 — PDF not yet created, build from existing SOPs/playbooks
  stripePlaybook: "#GUMROAD_LINK_PLAYBOOK_150",
  // TODO: Replace with Gumroad product link — Operator Funnel Templates + Agent Stack $300
  stripeTemplates: "#GUMROAD_LINK_TEMPLATES_300",
  // TODO: Wire to backend / Typeform / Airtable qualification form endpoint
  application: "#APPLICATION_FORM_URL",
  // TODO: Replace with Skool or Circle community monthly link
  syndicateMonthly: "#syndicate-apply",
  // TODO: Replace with Skool or Circle community annual link
  syndicateAnnual: "#syndicate-apply",
  // TODO: Replace with real Telegram channel invite link (e.g. https://t.me/frontiersignal)
  syndicateSignal: "https://t.me/frontiersignal",
  // Council application scrolls to inline form
  council: "#syndicate-apply",
};

function track(event: string, payload: Record<string, string | number> = {}) {
  if (typeof window !== "undefined") {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", event, payload);
    window.dispatchEvent(new CustomEvent("sbs:funnel-event", { detail: { event, payload } }));
  }
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const set = (sel: string, attr: string, val: string) => {
      const el = document.querySelector(sel) ?? document.createElement("meta");
      el.setAttribute(attr, val);
      if (!document.querySelector(sel)) document.head.appendChild(el);
    };
    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:image"]', "content", portalVisual);
  }, [title, description]);
}

const doors = [
  {
    numeral: "I",
    path: "/sbs-io",
    domain: "selfbuiltsystems.com/sbs-io",
    title: "The Operator Self-Build Stack",
    qualifier:
      "The operating language of the room, compressed into assets you can deploy today. Prompts, playbooks, and agent workflows built from the same logic Selfbuiltsystems uses at the enterprise level.",
    event: "door_1",
  },
  {
    numeral: "II",
    path: "/sbs-ai",
    domain: "selfbuiltsystems.com/sbs-ai",
    title: "Frontier OS Built With You",
    qualifier:
      "Full-stack AI infrastructure designed, deployed, and capitalised with you directly. Access is by application. Not every team qualifies.",
    primary: true,
    event: "door_2",
  },
  {
    numeral: "III",
    path: "/frontier-co",
    domain: "frontiersystems.co",
    title: "The Frontier Syndicate",
    qualifier:
      "The room around the Frontier Systems Firm. Operators, allocators, and builders working across intelligence, bits, electrons, atoms, capital, and institutions. Membership is by application.",
    event: "door_3",
  },
];

const products = [
  {
    name: "Master Prompt Vault",
    price: "$17",
    pitch:
      "The operating language of the room. Prompts, frameworks, and thinking patterns distilled from Selfbuiltsystems enterprise deployments. The first key into the intelligence layer.",
    image: productAssets.vault,
    href: "/checkout/vault",
  },
  {
    name: "The 30-Day Self-Build Playbook",
    price: "$150",
    pitch:
      "A 30-day operating sequence that closes the loop. Scattered AI tools become a compounding system. Built from the same deployment discipline Selfbuiltsystems uses with the firms in the logo marquee.",
    image: productAssets.playbook,
    href: "/checkout/playbook",
  },
  {
    name: "Operator Funnel Templates + Agent Stack",
    price: "$300",
    pitch:
      "The conversion architecture of a frontier-grade firm, compressed for the self-build operator. Funnel templates and agent workflows that give your team the psychology, proof structure, and leverage of a firm ten times your size.",
    image: productAssets.stack,
    href: "/checkout/templates",
  },
];

const stackLayers: [string, string][] = [
  [
    "INTELLIGENCE",
    "Sovereign AI, proprietary data, model deployment, intelligence products, and advisory systems for governments, enterprises, and founder-led firms.",
  ],
  [
    "BITS",
    "New-media institutions, software, platform IP, AI-native content systems, audience intelligence, and the front-end systems clients actually experience.",
  ],
  [
    "ELECTRONS",
    "Generation, storage, transmission, distribution, charging networks, and the energy layer that powers every transition we build.",
  ],
  [
    "ATOMS",
    "Minerals, mobility, data centre shells, industrial parks, and the physical infrastructure the next cycle is built from.",
  ],
  [
    "CAPITAL",
    "Patient mission-aligned capital, institutional fund architecture, strategic LP relationships, co-investment vehicles, and sovereign-adjacent formation.",
  ],
  [
    "INSTITUTIONS",
    "The regulatory, governance, and trust architecture that holds intelligence, bits, electrons, atoms, and capital together over time.",
  ],
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--compact" : ""}`}>
      <Link href="/" className="wordmark" onClick={() => track("PageView", { route: "portal" })}>
        SELFBUILTSYSTEMS
      </Link>
      <nav aria-label="Primary navigation" className="nav-links">
        <a href="#manifesto">Manifesto</a>
        <a href="#stack">Stack</a>
        <a href="#doors">Doors</a>
        <Link href="/frontier-co">Syndicate</Link>
      </nav>
      <Link href={location === "/" ? "#doors" : "/"} className="nav-cta">
        Enter
      </Link>
    </header>
  );
}

function Footer({ crossSell }: { crossSell?: React.ReactNode }) {
  return (
    <footer className="footer">
      {crossSell ? <div className="cross-sell">{crossSell}</div> : null}
      <div className="footer-powered">
        <span>
          Powered by{" "}
          <a href="https://selfbuiltsystems.com" target="_blank" rel="noopener noreferrer">Selfbuiltsystems</a>
          {" "}&amp;{" "}
          <a href="https://frontier.m1c.vc" target="_blank" rel="noopener noreferrer">LNCLOT Intelligence</a>
        </span>
      </div>
      <div className="footer-legal">
        <span>© 2026 Selfbuiltsystems</span>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </div>
    </footer>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function VslBlock({
  caption,
  duration = "02:18",
  longForm = false,
}: {
  caption: string;
  duration?: string;
  longForm?: boolean;
}) {
  return (
    <div
      className={`vsl-shell ${longForm ? "vsl-shell--wide" : ""}`}
      onClick={() => track("ViewContent", { content_name: caption })}
      role="button"
      tabIndex={0}
    >
      <div className="vsl-frame" aria-label={`${caption} video placeholder`}>
        <img src={portalVisual} alt="Dark editorial frontier systems visual" />
        <div className="vsl-overlay" />
        <div className="play-button" aria-hidden="true">
          &#9654;
        </div>
        <div className="poster-note">Real Jean-Jacques VSL frame pending</div>
        <button className="unmute-chip">Unmute</button>
      </div>
      <p className="caption">
        VSL · {caption} · {duration}
      </p>
    </div>
  );
}

function DoorCards() {
  return (
    <section className="doors" id="doors" aria-label="Choose a door">
      <p className="section-label">Choose a door</p>
      <div className="door-grid">
        {doors.map((door) => (
          <Link
            key={door.numeral}
            href={door.path}
            className={`door-card ${door.primary ? "door-card--primary" : ""}`}
            onClick={() => {
              track("door_chosen", { door_chosen: door.event });
              if (door.primary) track("Lead", { content_name: "Door II intent" });
            }}
          >
            <div className="door-kicker">
              <span>DOOR {door.numeral}</span>
              {door.primary ? <span className="primary-tag">primary</span> : null}
            </div>
            <p className="domain-label">{door.domain}</p>
            <h3>{door.title}</h3>
            <p>{door.qualifier}</p>
            <span className="door-enter">Enter Door {door.numeral}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const logoAssets = [
  { src: "/manus-storage/foton_15473a6b_57cf1735.svg",     alt: "Foton" },
  { src: "/manus-storage/wef_1976ab3d_07843249.svg",       alt: "World Economic Forum" },
  { src: "/manus-storage/worldbank_4b416240_fe69f497.svg", alt: "The World Bank" },
  { src: "/manus-storage/mufg_59398bb3_d1ec556c.svg",      alt: "MUFG" },
  { src: "/manus-storage/un_4f379338_2c285fdc.svg",        alt: "United Nations" },
  { src: "/manus-storage/byd_31bdfb65_a31394ea.svg",       alt: "BYD" },
  { src: "/manus-storage/huawei_aca3a3c3_c34d3342.svg",    alt: "Huawei" },
  { src: "/manus-storage/oreflo_681800c2_d09ae990.svg",    alt: "OreFlo.ai" },
  { src: "/manus-storage/dji_7d814277_b71329aa.svg",       alt: "DJI" },
  // TODO: Insert Cherry logo here once user uploads the SVG asset
  // TODO: Insert Google logo here once user uploads the SVG asset
];

function LogoMarquee({ label = "Operating alongside:" }: { label?: string }) {
  // Duplicate the set so the seamless loop works at any viewport width
  const set = useMemo(() => [...logoAssets, ...logoAssets], []);
  return (
    <section className="logo-marquee-section" aria-label={label}>
      <p className="marquee-label">{label}</p>
      <div className="marquee-viewport">
        <div className="marquee-track" aria-hidden="true">
          {set.map((logo, i) => (
            <div key={i} className="marquee-item">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofStrip({ label = "TRUSTED BY" }: { label?: string }) {
  return <LogoMarquee label={label} />;
}

function StackSection() {
  return (
    <section className="stack-section" id="stack" aria-label="Selfbuiltsystems full stack architecture">
      <div className="section-heading section-heading--stack">
        <div>
          <Eyebrow>THE STACK</Eyebrow>
          <h2>
            Intelligence, bits, electrons, atoms, capital, and the institutions that hold them
            together.
          </h2>
        </div>
        <p>
          We move across the layers because physically, economically, and politically, they are one
          system. The race is not for applications sitting on someone else's infrastructure. The race
          is for the infrastructure itself.
        </p>
      </div>
      <div className="stack-grid">
        {stackLayers.map(([layer, description]) => (
          <article key={layer}>
            <span>{layer}</span>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL PROOF DATA
───────────────────────────────────────────── */

// Founder authority photos — real CDN URLs wired in.
const founderPhotos = [
  {
    src: "/manus-storage/jean-g20-solo_cc296301_d9a42a6f.webp",
    caption: "G20 SOUTH AFRICA 2025 · TRADE FINANCE WORKING GROUP",
    context: "Jean-Jacques at the G20 South Africa 2025 Trade Finance Working Group. Invited alongside McKinsey, Bain, and World Economic Forum delegates. The infrastructure conversation happens at this level first.",
  },
  {
    src: "/manus-storage/jean-prince-eswatini_d1a16bcd_8d539e41.webp",
    caption: "C20 SOUTH AFRICA 2025 · WITH H.R.H. PRINCE MLUNGISI DLAMINI, ESWATINI",
    context: "Jean-Jacques with H.R.H. Prince Mlungisi Dlamini of Eswatini at the C20 South Africa 2025 summit. A business partner and sovereign infrastructure principal across the continent. Together they work on sovereign infrastructure deployments across Africa.",
  },
  {
    src: "/manus-storage/IMG_6858_d4d6cf62_cdaae4a4.webp",
    caption: "B20 · C20 WORKING GROUP SESSION · WORLD ECONOMIC FORUM DELEGATES",
    context: "Jean-Jacques in session at the B20 and C20 working groups, contributing alongside World Economic Forum think tank delegates on AI, critical minerals, and trade infrastructure.",
    objectPosition: "center 65%",
  },
  {
    src: "/manus-storage/g20-trade-finance-hall_5178a158_b5a4fbd7.webp",
    caption: "G20 AFRICA OUTREACH AND INVESTMENT CONFERENCE · TRADE FINANCE WORKING GROUP",
    context: "The G20 Africa Outreach and Investment Conference private plenary chamber. The delegates who shape sovereign capital flows across the continent. This is the room where the infrastructure & Investment conversation happens.",
    objectPosition: "center 40%",
  },
];

// TODO: Replace face photo URLs and fill in real client data when available.
// Each card: face photo, name, title, company, companyUrl, before, after, roi, quote
const caseStudies = [
  {
    face: "/manus-storage/IMG_2858_77765107_21e2c42d.jpg",
    name: "Timon Kriek",
    title: "Founder & Influencer",
    company: "GIIFTD",
    companyUrl: "#",
    before:
      "Building content manually. Monetisation was inconsistent and unpredictable. Audience was growing fast but there was no clear path from audience to revenue.",
    after:
      "Full content-to-revenue infrastructure deployed. Revenue system optimised and scaled. $40k MRR reached in under 4 months. Audience growth was already there. We built the engine that monetised it.",
    roi: "$40k MRR in under 4 months",
    quote:
      "The system Jean-Jacques built optimised our revenue cycle. We went from zero to $40k in recurring revenue in less than four months. The clarity of thinking and speed of execution was unlike anything I had experienced.",
  },
  {
    face: "/manus-storage/IMG_2857_91cfe064_a08eec32.jpg",
    name: "Jandre De Beer",
    title: "Founder & CEO",
    company: "V8-Media",
    companyUrl: "#",
    before:
      "Sales process was leaky. Growth had hit a ceiling. The balance between domestic and international clients needed to shift. Problems had been sitting in the process for months.",
    after:
      "Sales process rebuilt. Strategy reoriented toward international client acquisition. Sales team trained and closed alongside. AI-native workflows deployed. Record month in sales in under 30 days.",
    roi: "Record month in sales in under 30 days",
    quote:
      "Problems we had been sitting with in our sales process for months were solved in less than 30 days. The clarity and the speed of implementation was unlike anything I had experienced working with other firms before.",
  },
  {
    face: "/manus-storage/anas-benmeidoub_049a6362_7c5b125b.webp",
    name: "Anas Ben Meidoub",
    title: "Partner",
    company: "Ryad VC",
    companyUrl: "#",
    before:
      "Scaling a VC-backed operation across multiple geographies with no systematic approach to identifying emerging markets or managing expansion risk.",
    after:
      "Data-driven expansion strategy deployed. Three emerging markets identified. Key partnerships secured in target regions within four months. International revenue potential doubled.",
    roi: "2x international revenue potential in 4 months",
    quote:
      "Jean-Jacques is a great thinker and strategist. His strategic analysis was instrumental in our global expansion. His data-driven approach helped us identify three emerging markets and his ability to spot early-market opportunities while minimising expansion risks proved invaluable.",
  },
];

const founderReviews = [
  {
    face: "/manus-storage/francois-dewet_7d95693c_fdf5240a.jpg",
    name: "Francois De Wet",
    company: "CEO, Wamly.io",
    quote:
      "As the CEO of Wamly.io I have worked with many high-level people across business and sales. Jean-Jacques gave us a fresh perspective on how we could improve our overall sales process and systems in the competitive SaaS world. I want to recommend him and his team for any systems and sales-oriented work.",
    door: 1,
  },
  {
    face: "/manus-storage/edgars-podnieks_699eeeb5_2d5637bd.jpg",
    name: "Edgars Podnieks",
    company: "CEO, Daltyn Invest",
    quote:
      "Jean-Jacques is an extremely sharp operator. I have built many successful businesses all around the world in different industries and coming across someone with his skills and abilities is very rare. His insight into human behaviour and AI systems is what really stood out for me.",
    door: 1,
  },
  {
    face: "/manus-storage/thato-garekoe_9e22aa23_749a671c.webp",
    name: "Thato Garekoe",
    company: "Founder, Rekisa",
    quote:
      "Got funded by Google for Startups in 2022 and met Jean-Jacques and his team in 2023. He helped us clear traction for justifying product-market fit and allocate our resources to best use to make sure we scale with max capital efficiency.",
    door: 3,
  },
  {
    face: "/manus-storage/pietro-trebisonda_1c9fec4f_f6b8a958.webp",
    name: "Pietro Trebisonda",
    company: "Cybersecurity & Insurtech, ISO/IEC 27001 · Italy",
    quote:
      "Jay is a great thinker and strategist. His strategic analysis was instrumental in our global expansion from Italy to across the world. His data-driven approach helped us identify three emerging markets. Within 4 months of implementing his recommendations, we secured key partnerships in these regions and doubled our international revenue potential. His ability to spot early-market opportunities while minimising expansion risks proved invaluable.",
    door: 3,
  },
  {
    // Molemo Nthate Bogoshe Morgan — The Afri-Morgan Group — Door II review
    face: "/manus-storage/Screenshot2026-05-29at11.00.17_e0cf6571_e77a8856.png",
    name: "Molemo Nthate Bogoshe Morgan",
    company: "The Afri-Morgan Group",
    quote:
      "We have engaged Jean Jacques and his team at SelfBuiltSystems on several high-value mandates across our private equity and infrastructure portfolio — including the Green Corridor Project with Huawei Technologies, large-scale acquisitions and M&A, and the OreFlo.ai AI industrial stack build. They bring a rare combination of deep AI systems expertise and commercial deal intelligence, and have consistently operated at the level we require for complex, high-stakes engagements. Jean Jacques is one of the sharpest technology minds we have consulted with at the intersection of AI and private equity deal-making.",
    door: 2,
  },
  {
    // Dr. Kat Kesty — Moss Laser Surgeon — Door II review
    face: "/manus-storage/IMG_2849_96b438d7_97c2219f.jpg",
    name: "Dr. Kat Kesty",
    company: "Moss Laser Surgeon",
    quote:
      "Jean-Jacques has a rare ability to see the full picture of a business and identify exactly where the leverage is. Working with him gave us clarity on our positioning and a clear system for growth. His thinking is precise, his execution is fast, and the results speak for themselves.",
    door: 2,
  },
  {
    // Altaf Aslam — Director at P&G | IIM-A | NIT-C — Door II review
    face: "/manus-storage/IMG_2724_4aeca3d3_4b6834e7.jpg",
    name: "Altaf Aslam",
    company: "Director, Procter & Gamble | IIM-A | NIT-C",
    quote:
      "I have worked with many people across the globe on business and brand building activities and Jay is definitely someone who stands out. His thinking is unique and he has a detailed understanding of his area of work. He is exceptional in out-of-the-box thinking and systems design for complex business environments. He also knows a thing or two about applied behavioural science and AI systems. I definitely recommend Jay for any business building or scaling activity.",
    door: 2,
  },
  {
    // Buntu Majaja — SA Innovation Summit — Door II review
    face: "/manus-storage/IMG_2850_6c3e1077_9d0c5f7f.jpg",
    name: "Buntu Majaja",
    company: "SA Innovation Summit",
    quote:
      "Jean-Jacques brings a level of systems thinking and strategic clarity that is rare in the African startup and innovation ecosystem. His ability to connect the intelligence layer to real business outcomes is what sets him apart. Working with him sharpened our approach to how we position and scale the Summit.",
    door: 2,
  },
  {
    // Dean White — CEO, King Contractors Agency & Digital Mastery Limited — Door II review
    face: "/manus-storage/IMG_2725_c79c61ad_ab93ef33.jpg",
    name: "Dean White",
    company: "CEO, King Contractors Agency & Digital Mastery Limited",
    quote:
      "Been working with Jay and his team behind the scenes here at King Contractor Agency. Working with him and the team has been a breeze. He overdelivered and helped us move the needle. We already collected our first month over $100k in top line sales.",
    door: 2,
  },
];

/* ─────────────────────────────────────────────
   PROOF COMPONENTS
───────────────────────────────────────────── */

function FounderAuthorityStrip() {
  const hasRealPhotos = founderPhotos.some((p) => !p.src.startsWith("TODO"));
  return (
    <section className="founder-authority-strip" aria-label="Founder authority and proof">
      <div className="section-heading">
        <Eyebrow>THE OPERATOR BEHIND THE SYSTEM</Eyebrow>
        <h2>Jean-Jacques has been in the room.</h2>
      </div>
      <p className="founder-authority-prose">
        From G20 Trade Finance working groups and World Economic Forum think tank sessions, to B20 and C20 working groups alongside McKinsey, Bain, and WEF-invited delegates, to Huawei Enterprise Intelligence boardrooms and sovereign infrastructure deployments across continents. Selfbuiltsystems is not a firm that theorises about the frontier. It is a firm that has been operating there.
      </p>
      <div className="founder-photo-grid">
        {founderPhotos.map((photo, i) => (
          <figure key={i} className="founder-photo-card">
            {hasRealPhotos && !photo.src.startsWith("TODO") ? (
              <img src={photo.src} alt={photo.caption} loading="lazy" style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined} />
            ) : (
              <div className="founder-photo-placeholder" aria-label={photo.caption}>
                <span className="photo-placeholder-icon">&#9654;</span>
                <span className="photo-placeholder-label">Photo pending upload</span>
              </div>
            )}
            <figcaption>
              <span className="eyebrow">{photo.caption}</span>
              <p>{photo.context}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CaseStudySection() {
  return (
    <section className="case-study-section" aria-label="Proof of work">
      <div className="section-heading">
        <Eyebrow>PROOF OF WORK</Eyebrow>
        <h2>The firms that moved. The results they got.</h2>
      </div>
      <div className="case-study-grid">
        {caseStudies.map((cs, i) => (
          <article key={i} className="case-study-card">
            <div className="cs-header">
              <div className="cs-face">
                {!cs.face.startsWith("TODO") ? (
                  <img src={cs.face} alt={cs.name} />
                ) : (
                  <div className="cs-face-placeholder">{cs.name.charAt(1)}</div>
                )}
              </div>
              <div className="cs-identity">
                <strong>{cs.name}</strong>
                <span>{cs.title}</span>
                <a href={cs.companyUrl} target="_blank" rel="noopener noreferrer" className="cs-company-link">
                  {cs.company}
                </a>
              </div>
            </div>
            <div className="cs-states">
              <div className="cs-before">
                <span className="cs-state-label">BEFORE</span>
                <p>{cs.before}</p>
              </div>
              <div className="cs-arrow" aria-hidden="true">&#8594;</div>
              <div className="cs-after">
                <span className="cs-state-label">AFTER</span>
                <p>{cs.after}</p>
              </div>
            </div>
            <div className="cs-roi">{cs.roi}</div>
            <blockquote className="cs-quote">
              <p>{cs.quote}</p>
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewStrip({ doorFilter }: { doorFilter: 1 | 2 | 3 }) {
  const reviews = founderReviews.filter((r) => r.door === doorFilter);
  return (
    <section className="review-strip" aria-label="Founder reviews">
      <Eyebrow>DIRECT FROM THE OPERATORS</Eyebrow>
      <div className="review-grid">
        {reviews.map((r, i) => (
          <article key={i} className="review-card">
            <div className="review-face">
              {!r.face.startsWith("TODO") ? (
                <img src={r.face} alt={r.name} />
              ) : (
                <div className="review-face-placeholder">{r.name.charAt(1)}</div>
              )}
            </div>
            <blockquote>
              <p>{r.quote}</p>
            </blockquote>
            <footer>
              <strong>{r.name}</strong>
              <span>{r.company}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PORTAL PAGE
───────────────────────────────────────────── */
function PortalPage() {
  usePageMeta(
    "Selfbuiltsystems | Three Doors Into The Frontier",
    "Selfbuiltsystems designs, deploys, and capitalises full-stack architecture across intelligence, bits, electrons, atoms, capital, and institutions.",
  );

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--portal hero--stacked" id="manifesto">
          <div className="hero-copy reveal">
            <Eyebrow>A FRONTIER SYSTEMS COMPANY</Eyebrow>
            <h1>
              Three doors into <em>the frontier</em>. Choose yours.
            </h1>
            <p className="subhead">
              We build and operate next generation front-end systems with industry leaders. We operate
              from the intelligence layer to bits to electrons to atoms. Selfbuiltsystems designs, deploys and
              capitalises the full-stack architecture across intelligence, bits, electrons, atoms, and
              the institutions that hold them together. The firms that build the new rails own the next
              era. The firms that do not, rent from the ones that did.
            </p>
          </div>
          <VslBlock caption="Founder Brief" />
        </section>

        <section className="category-frame">
          <p>
            Every fifty to one hundred years, a new infrastructure cycle replaces the last one. The
            group that builds the new rails owns the next era. The group that does not, rents from
            the people who did. The cycle is already underway. The question is which side of it you
            are on.
          </p>
        </section>

        <section className="principles-frame">
          <article>
            <Eyebrow>FULL STACK, NOT APPLICATION LAYER</Eyebrow>
            <p>
              Frontier value is captured by companies that operate the chip, the compute, the model,
              the deployment, the data feedback loop, and the physical layer. We build the stack.
            </p>
          </article>
          <article>
            <Eyebrow>CLOSED-LOOP SYSTEMS</Eyebrow>
            <p>
              Every system we build is a closed loop. Deployment generates feedback, feedback
              retrains the system, and the system compounds.
            </p>
          </article>
          <article>
            <Eyebrow>MISSION ALIGNMENT</Eyebrow>
            <p>
              The hardest problem in this era is human alignment, mission alignment, and the
              incentive systems that hold both together over time.
            </p>
          </article>
        </section>

        <StackSection />
        <FounderAuthorityStrip />
        <DoorCards />
        <ProofStrip />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   DOOR I: SELF-BUILD
───────────────────────────────────────────── */
function SelfBuildPage() {
  usePageMeta(
    "Selfbuiltsystems Door I | Self-Build Catalogue",
    "Operator products that translate Selfbuiltsystems full-stack systems thinking into SMB-friendly prompts, playbooks, templates, and agent workflows.",
  );

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--narrow hero--solo">
          <div className="hero-copy reveal">
            <Eyebrow>DOOR I · SELFBUILTSYSTEMS.IO</Eyebrow>
            <h1>
              The operating system of the room,{" "}
              <em>compressed for the operator.</em>
            </h1>
            <p className="subhead">
              Door I is the entry point. You get the operating language, the deployment frameworks,
              and the conversion architecture that Selfbuiltsystems uses at the enterprise level, built into assets
              you can deploy yourself today. This is not a course. It is the first key.
            </p>
          </div>
        </section>

        <section className="category-frame category-frame--sharp">
          <p>
            The firms in the logo marquee below did not get there by running scattered tool
            experiments. They got there by operating with systems discipline at every layer. Door I
            gives you the same operating logic, compressed into formats you can deploy today. The
            $17 vault is the first key. The $300 stack is the full conversion architecture. Both are
            built from the same source.
          </p>
        </section>

        <section className="product-grid" aria-label="Self-build products">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-plate">
                <img src={product.image} alt={`${product.name} premium product mockup`} />
              </div>
              <div className="product-copy">
                <h2>{product.name}</h2>
                <p>{product.pitch}</p>
                <div className="product-bottom">
                  <span className="price">{product.price}</span>
                  <Link
                    href={product.href}
                    onClick={() => track("InitiateCheckout", { content_name: product.name })}
                  >
                    Acquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <ProofStrip label="TRUSTED BY" />

        <section className="guarantee-block">
          <Eyebrow>THE COMMITMENT</Eyebrow>
          <p>
            These are working assets, not theory. If you apply the system and it does not move the
            needle on your operating clarity, we will work with you until it does. We do not offer
            refunds on digital assets. We offer results. Buy it, use it, and hold us to the
            standard we set.
          </p>
        </section>

        <ReviewStrip doorFilter={1} />

        <section className="ladder-nudge">
          <Eyebrow>THE NEXT STEP</Eyebrow>
          <p>
            When the self-build assets have sharpened your operating model, the logical next move is
            to have the full system designed and deployed with you directly. That is Door II. Access
            is by application. Not every team qualifies.
          </p>
          <Link href="/sbs-ai" className="nudge-link">
            Apply for Frontier OS
          </Link>
        </section>
      </main>
      <Footer
        crossSell={
          <p>
            Ready for the full system?{" "}
            <Link href="/sbs-ai">Apply for Frontier OS (Door II)</Link>
          </p>
        }
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   QUALIFICATION FORM (Door II)
   Data routing: Airtable REST API (free tier, no backend required).
   HOW TO ACTIVATE:
     1. Create a free Airtable account at airtable.com
     2. Create a base called "Selfbuiltsystems Frontier OS Applications"
     3. Create a table called "Applications" with fields:
        Name, Company, Email, Phone, Revenue, Budget, StackLayers, Goal, Timeline, Source
     4. Generate a Personal Access Token at airtable.com/create/tokens
        (scope: data.records:write on your base)
     5. Find your Base ID in the URL: airtable.com/appXXXXXXXXXXXXXX/...
     6. Set these values in your Manus project Secrets panel:
        VITE_AIRTABLE_PAT=patXXXXXXXXXXXXXX
        VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
        VITE_AIRTABLE_D2_TABLE=Applications
   FALLBACK: If env vars are not set, form data is sent via mailto: pre-fill.
───────────────────────────────────────────── */

// Airtable config — set these in Manus Secrets panel
const AIRTABLE_PAT = import.meta.env.VITE_AIRTABLE_PAT ?? "";
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID ?? "";
const AIRTABLE_D2_TABLE = import.meta.env.VITE_AIRTABLE_D2_TABLE ?? "Applications";
const AIRTABLE_D3_TABLE = import.meta.env.VITE_AIRTABLE_D3_TABLE ?? "SyndicateApplications";

async function postToAirtable(
  table: string,
  fields: Record<string, string>
): Promise<{ ok: boolean; error?: string }> {
  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
    return { ok: false, error: "not_configured" };
  }
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
      }
    );
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: body };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

function QualificationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const stackOptions = [
    "Intelligence",
    "Bits",
    "Electrons",
    "Atoms",
    "Capital",
    "Institutions",
  ];

  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);

  function toggleLayer(layer: string) {
    setSelectedLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const form = formRef.current!;
    const data = new FormData(form);
    const fields: Record<string, string> = {
      Name: String(data.get("name") ?? ""),
      Company: String(data.get("company") ?? ""),
      Email: String(data.get("email") ?? ""),
      Phone: String(data.get("phone") ?? ""),
      Revenue: String(data.get("revenue") ?? ""),
      Budget: String(data.get("budget") ?? ""),
      StackLayers: selectedLayers.join(", "),
      Goal: String(data.get("goal") ?? ""),
      Timeline: String(data.get("timeline") ?? ""),
      Source: String(data.get("source") ?? ""),
    };

    track("Lead", { content_name: "Frontier OS qualification form submitted" });

    const result = await postToAirtable(AIRTABLE_D2_TABLE, fields);

    if (result.ok) {
      setSubmitted(true);
    } else if (result.error === "not_configured") {
      // Fallback: open mailto with pre-filled body so no submission is ever lost
      const body = Object.entries(fields)
        .map(([k, v]) => `${k}: ${v}`)
        .join("%0A");
      window.location.href = `mailto:hello@selfbuiltsystems.com?subject=Frontier%20OS%20Application%20%E2%80%94%20${encodeURIComponent(fields.Name)}&body=${body}`;
      setSubmitted(true);
    } else {
      setSubmitError("Submission failed. Please try again or email hello@selfbuiltsystems.com directly.");
    }

    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="qual-form-thankyou">
        <Eyebrow>APPLICATION RECEIVED</Eyebrow>
        <h3>Your application is under review.</h3>
        <p>
          We review applications within five business days. If your profile aligns with the current
          deployment cohort, a member of the Selfbuiltsystems team will reach out directly. The room is
          intentionally small.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="qual-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="qual-form-row">
        <div className="qual-field">
          <label htmlFor="qf-name">Full Name</label>
          <input id="qf-name" name="name" type="text" required placeholder="Jean Dupont" />
        </div>
        <div className="qual-field">
          <label htmlFor="qf-company">Company Name</label>
          <input id="qf-company" name="company" type="text" required placeholder="Acme Corp" />
        </div>
      </div>

      <div className="qual-form-row">
        <div className="qual-field">
          <label htmlFor="qf-email">Email Address</label>
          <input id="qf-email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="qual-field">
          <label htmlFor="qf-phone">Phone / WhatsApp</label>
          <input id="qf-phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
        </div>
      </div>

      <div className="qual-form-row">
        <div className="qual-field">
          <label htmlFor="qf-revenue">Current Annual Revenue</label>
          <select id="qf-revenue" name="revenue" required>
            <option value="" disabled>Select range</option>
            <option value="under-100k">Under $100K</option>
            <option value="100k-500k">$100K to $500K</option>
            <option value="500k-2m">$500K to $2M</option>
            <option value="2m-10m">$2M to $10M</option>
            <option value="10m-plus">$10M+</option>
          </select>
        </div>
        <div className="qual-field">
          <label htmlFor="qf-budget">Deployment Budget</label>
          <select id="qf-budget" name="budget" required>
            <option value="" disabled>Select range</option>
            <option value="under-5k">Under $5K</option>
            <option value="5k-25k">$5K to $25K</option>
            <option value="25k-100k">$25K to $100K</option>
            <option value="100k-plus">$100K+</option>
          </select>
        </div>
      </div>

      <div className="qual-field qual-field--full">
        <label>Stack Layer (select all that apply)</label>
        <div className="qual-layer-chips">
          {stackOptions.map((layer) => (
            <button
              key={layer}
              type="button"
              className={`qual-chip ${selectedLayers.includes(layer) ? "qual-chip--active" : ""}`}
              onClick={() => toggleLayer(layer)}
              aria-pressed={selectedLayers.includes(layer)}
            >
              {layer}
            </button>
          ))}
        </div>
        <input type="hidden" name="stack_layers" value={selectedLayers.join(", ")} />
      </div>

      <div className="qual-field qual-field--full">
        <label htmlFor="qf-goal">Primary Deployment Goal</label>
        <textarea
          id="qf-goal"
          name="goal"
          rows={3}
          required
          placeholder="Describe in 2 to 3 sentences what you are building and what you need to move first."
        />
      </div>

      <div className="qual-field qual-field--full">
        <label htmlFor="qf-timeline">Decision Timeline</label>
        <select id="qf-timeline" name="timeline" required>
          <option value="" disabled>Select timeline</option>
          <option value="immediately">Ready to start immediately</option>
          <option value="30-days">Within 30 days</option>
          <option value="90-days">Within 90 days</option>
          <option value="exploring">Still exploring</option>
        </select>
      </div>

      <div className="qual-field qual-field--full">
        <label htmlFor="qf-source">How did you find Selfbuiltsystems? (optional)</label>
        <input id="qf-source" name="source" type="text" placeholder="Referral, social, search, event..." />
      </div>

      <button type="submit" className="qual-submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
      {submitError && (
        <p className="qual-form-error">{submitError}</p>
      )}
      <p className="qual-form-note">
        Applications are reviewed within five business days. The room is intentionally small.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   DOOR II: DONE-FOR-YOU / FRONTIER OS
───────────────────────────────────────────── */
function DoneForYouPage() {
  usePageMeta(
    "Selfbuiltsystems Door II | Frontier OS Built With You",
    "Apply to design, deploy, and capitalise full-stack AI operating architecture across intelligence, bits, electrons, atoms, capital, and institutions.",
  );

  const phases: [string, string, string][] = [
    ["Phase 1", "Wk 1 to 2", "Frontier Audit"],
    ["Phase 2", "Wk 3 to 6", "System Build"],
    ["Phase 3", "Wk 7 to 8", "Deploy and Train"],
    ["Phase 4", "Mo 3 to 6", "Operate and Compound"],
  ];

  const tiers: [string, string, string, string][] = [
    [
      "Frontier Lite",
      "$6K",
      "Single-system deployment",
      "For a founder-led team that needs one high-leverage system installed across acquisition, operations, fulfillment, or reporting.",
    ],
    [
      "Frontier Core",
      "$25K",
      "Multi-system deployment",
      "For SMB and mid-market operators who need connected front-end systems, AI workflows, proof architecture, and decision loops.",
    ],
    [
      "Frontier Sovereign",
      "$100K+",
      "Full Frontier OS with operate phase",
      "For enterprise, institutional, or sovereign-adjacent partners building across intelligence, bits, electrons, atoms, and capital.",
    ],
  ];

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--primary hero--stacked" id="apply-anchor">
          <div className="hero-copy reveal">
            <Eyebrow>DOOR II · FRONTIER OS</Eyebrow>
            <h1>
              The operating system{" "}
              <em>beneath the next cycle.</em>
            </h1>
            <p className="subhead">
              Door II is the full-stack path. Selfbuiltsystems designs, deploys and capitalises the architecture
              across intelligence, bits, electrons, atoms, capital, and the institutions that hold
              them together. We work with the firms in the logo marquee below. Access is by
              application. Not every team qualifies.
            </p>
            <Link
              className="primary-action"
              href="/qualify"
              onClick={() => track("Lead", { content_name: "Frontier OS CTA clicked" })}
            >
              Book a Strategy Call
            </Link>
          </div>
          <VslBlock caption="Frontier OS Brief" duration="08:00 to 15:00" longForm />
        </section>

        <section className="category-frame category-frame--sharp">
          <p>
            Most firms operate inside the system. Selfbuiltsystems works with industry leaders to design, deploy,
            operate, and capitalise the systems other firms operate inside. The firms that stop
            hiring humans and start deploying systems are the ones that own the next decade. The
            firms that wait are the ones that rent from them.
          </p>
        </section>

        <section className="fit-grid">
          <article>
            <Eyebrow>FOR</Eyebrow>
            <h2>Founders, enterprises, and institutions ready to install leverage.</h2>
            <p>
              Best suited for teams with real distribution, operational complexity, deployment
              budget, and a leadership mandate to move beyond tool experiments into architecture.
            </p>
          </article>
          <article>
            <Eyebrow>NOT FOR</Eyebrow>
            <h2>Teams looking for scattered automations or surface-level AI theatre.</h2>
            <p>
              This is not a chatbot experiment, prompt pack, or cosmetic software setup. It is
              operating infrastructure with proof, feedback loops, and implementation discipline.
            </p>
          </article>
        </section>

        <StackSection />

        {/* Huawei proof strip — Jean-Jacques with Huawei Enterprise Intelligence team */}
        <section className="founder-authority-strip huawei-proof-strip" aria-label="Huawei Enterprise Intelligence proof">
          <div className="section-heading">
            <Eyebrow>INSIDE THE ROOM</Eyebrow>
            <h2>Jean-Jacques with the Huawei Enterprise Intelligence team.</h2>
          </div>
          <p className="founder-authority-prose">
            In December 2025, Jean-Jacques met with the Huawei Enterprise Intelligence leadership for a full technical briefing on sovereign AI architecture, AGI level frameworks, and enterprise deployment strategy. The systems Selfbuiltsystems builds are informed by conversations at this level.
          </p>
          <div className="founder-photo-grid huawei-photo-grid">
            <figure className="founder-photo-card">
              <img
                src="/manus-storage/jean-huawei-group_6d9fd09d_b929f676.jpg"
                alt="Jean-Jacques with the Huawei Enterprise Intelligence team, December 2025"
                loading="lazy"
              />
              <figcaption>
                <span className="eyebrow">HUAWEI ENTERPRISE INTELLIGENCE · DECEMBER 2025</span>
                <p>Jean-Jacques with the Huawei Enterprise Intelligence team at the Huawei Experience Centre. A working partnership across sovereign AI, enterprise deployment, and frontier infrastructure.</p>
              </figcaption>
            </figure>
            <figure className="founder-photo-card">
              <img
                src="/manus-storage/jean-huawei-boardroom_69893c92_ff27ce4a.jpg"
                alt="Jean-Jacques in the Huawei Enterprise Intelligence boardroom working session"
                loading="lazy"
              />
              <figcaption>
                <span className="eyebrow">HUAWEI AI STRATEGY SESSION · ENTERPRISE INTELLIGENCE BOARDROOM</span>
                <p>Jean-Jacques in session with the Huawei Enterprise Intelligence team. Architecture decisions at this level inform every system Selfbuiltsystems deploys.</p>
              </figcaption>
            </figure>
            <figure className="founder-photo-card">
              <img
                src="/manus-storage/jean-huawei-agi-session_13f48ae3_6c0a5a89.webp"
                alt="Huawei Cloud AGI architecture briefing with Jean-Jacques, showing OpenAI five-level AGI framework on dual screens"
                loading="lazy"
              />
              <figcaption>
                <span className="eyebrow">HUAWEI CLOUD · AGI ARCHITECTURE BRIEFING · TECHNICAL CHIEF SESSION</span>
                <p>The Huawei Cloud technical chief session on AGI level frameworks, DeepSeek, and sovereign model deployment. The intelligence layer briefing that informed the Selfbuiltsystems AI stack.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="timeline-section">
          <div className="section-heading">
            <Eyebrow>DEPLOYMENT ARCHITECTURE</Eyebrow>
            <h2>The 60-Day Deployment Architecture</h2>
          </div>
          <div className="timeline-grid">
            {phases.map(([phase, time, title]) => (
              <article key={phase}>
                <span>{phase}</span>
                <p className="domain-label">{time}</p>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="tier-grid" aria-label="Frontier OS tiers">
          {tiers.map(([name, price, summary, outcome]) => (
            <article key={name} className="tier-card">
              <h3>{name}</h3>
              <p className="tier-price">{price}</p>
              <p className="tier-summary">{summary}</p>
              <p>{outcome}</p>
            </article>
          ))}
        </section>

        <CaseStudySection />

        <ReviewStrip doorFilter={2} />

        <ProofStrip label="TRUSTED BY" />

        <section className="door2-cta-block" id="book-a-call" aria-label="Book a strategy call">
          <div className="door2-cta-inner">
            <Eyebrow>NEXT STEP</Eyebrow>
            <h2>Ready to install the system?</h2>
            <p className="door2-cta-prose">
              The next step is a 30-minute strategy call with the Selfbuiltsystems team. We will assess your current operating model, identify the highest-leverage deployment point, and determine whether Frontier OS is the right move for your business right now. Not every team qualifies. The ones that do move fast.
            </p>
            <Link
              className="primary-action door2-cta-btn"
              href="/qualify"
              onClick={() => track("Lead", { content_name: "Frontier OS bottom CTA" })}
            >
              Book a Strategy Call
            </Link>
            <p className="door2-cta-note">Takes 2 minutes. You will be asked 5 qualifying questions before booking.</p>
          </div>
        </section>
      </main>
      <Footer
        crossSell={
          <p>
            Application submitted? Invite qualified operators into{" "}
            <Link href="/frontier-co">The Frontier Syndicate</Link>
          </p>
        }
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SYNDICATE APPLICATION FORM (Door III)
   Same Airtable wiring pattern as Door II.
   HOW TO ACTIVATE:
     Set VITE_AIRTABLE_D3_TABLE=SyndicateApplications in Manus Secrets panel.
     (Uses same VITE_AIRTABLE_PAT and VITE_AIRTABLE_BASE_ID as Door II)
   FALLBACK: If env vars not set, mailto: pre-fill is used.
───────────────────────────────────────────── */
function SyndicateApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const stackOptions = [
    "Intelligence",
    "Bits",
    "Electrons",
    "Atoms",
    "Capital",
    "Institutions",
  ];

  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);

  function toggleLayer(layer: string) {
    setSelectedLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const form = formRef.current!;
    const data = new FormData(form);
    const fields: Record<string, string> = {
      Name: String(data.get("name") ?? ""),
      Email: String(data.get("email") ?? ""),
      Phone: String(data.get("phone") ?? ""),
      Role: String(data.get("role") ?? ""),
      Company: String(data.get("company") ?? ""),
      StackLayers: selectedLayers.join(", "),
      WhyJoin: String(data.get("why") ?? ""),
      Source: String(data.get("source") ?? ""),
    };

    track("Lead", { content_name: "Syndicate membership application submitted" });

    const result = await postToAirtable(AIRTABLE_D3_TABLE, fields);

    if (result.ok) {
      setSubmitted(true);
    } else if (result.error === "not_configured") {
      const body = Object.entries(fields)
        .map(([k, v]) => `${k}: ${v}`)
        .join("%0A");
      window.location.href = `mailto:hello@selfbuiltsystems.com?subject=Syndicate%20Application%20%E2%80%94%20${encodeURIComponent(fields.Name)}&body=${body}`;
      setSubmitted(true);
    } else {
      setSubmitError("Submission failed. Please try again or email hello@selfbuiltsystems.com directly.");
    }

    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="qual-form-thankyou">
        <Eyebrow>APPLICATION RECEIVED</Eyebrow>
        <h3>Your application is under review.</h3>
        <p>
          We review applications weekly. If your profile aligns with the current room composition,
          a member of the Selfbuiltsystems team will reach out directly. The room is intentionally small.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="qual-form" onSubmit={handleSubmit} noValidate>

      <div className="qual-form-row">
        <div className="qual-field">
          <label htmlFor="sa-name">Full Name</label>
          <input id="sa-name" name="name" type="text" required placeholder="Jean Dupont" />
        </div>
        <div className="qual-field">
          <label htmlFor="sa-email">Email Address</label>
          <input id="sa-email" name="email" type="email" required placeholder="you@company.com" />
        </div>
      </div>

      <div className="qual-form-row">
        <div className="qual-field">
          <label htmlFor="sa-phone">Phone / WhatsApp</label>
          <input id="sa-phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
        </div>
        <div className="qual-field">
          <label htmlFor="sa-role">Your Role</label>
          <select id="sa-role" name="role" required>
            <option value="" disabled>Select role</option>
            <option value="operator">Operator</option>
            <option value="allocator">Allocator</option>
            <option value="builder">Builder</option>
          </select>
        </div>
      </div>

      <div className="qual-field qual-field--full">
        <label htmlFor="sa-company">Company / Organisation</label>
        <input id="sa-company" name="company" type="text" required placeholder="Acme Corp" />
      </div>

      <div className="qual-field qual-field--full">
        <label>Stack Layer (select all that apply)</label>
        <div className="qual-layer-chips">
          {stackOptions.map((layer) => (
            <button
              key={layer}
              type="button"
              className={`qual-chip ${selectedLayers.includes(layer) ? "qual-chip--active" : ""}`}
              onClick={() => toggleLayer(layer)}
              aria-pressed={selectedLayers.includes(layer)}
            >
              {layer}
            </button>
          ))}
        </div>
        <input type="hidden" name="stack_layers" value={selectedLayers.join(", ")} />
      </div>

      <div className="qual-field qual-field--full">
        <label htmlFor="sa-why">What brings you to the Syndicate?</label>
        <textarea
          id="sa-why"
          name="why"
          rows={3}
          required
          placeholder="Describe in 2 to 3 sentences what you are building and why the room matters to you."
        />
      </div>

      <div className="qual-field qual-field--full">
        <label htmlFor="sa-source">How did you find us? (optional)</label>
        <input id="sa-source" name="source" type="text" placeholder="Referral, social, search, event..." />
      </div>

      <button type="submit" className="qual-submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
      {submitError && (
        <p className="qual-form-error">{submitError}</p>
      )}
      <p className="qual-form-note">
        Applications are reviewed weekly. The room is intentionally small.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   DOOR III: THE FRONTIER SYNDICATE
───────────────────────────────────────────── */
function SyndicatePage() {
  usePageMeta(
    "The Frontier Syndicate | Door III",
    "The room around the Frontier Systems Firm. Operators, allocators, and builders operating across intelligence, bits, electrons, atoms, capital, and institutions. Membership is by application.",
  );

  const stackRows: [string, string][] = [
    ["INTELLIGENCE", "Sovereign AI, proprietary models, and the advisory systems that govern them."],
    ["BITS", "Platform IP, AI-native media, front-end systems, and the digital layer clients experience."],
    ["ELECTRONS", "Energy generation, storage, transmission, and the infrastructure that powers the transition."],
    ["ATOMS", "Minerals, mobility, data centres, industrial parks, and the physical layer of the next cycle."],
    ["CAPITAL", "Patient mission-aligned capital, fund architecture, LP relationships, and co-investment vehicles."],
    ["INSTITUTIONS", "The governance, regulatory, and trust architecture that holds all five layers together over time."],
  ];

  const whoRows: [string, string, string][] = [
    [
      "OPERATORS",
      "Founder-led firms and mid-market businesses deploying full-stack AI infrastructure across acquisition, operations, and fulfillment.",
      "They come for the signal. They stay for the systems.",
    ],
    [
      "ALLOCATORS",
      "Capital allocators, family offices, and institutional principals with active interest in frontier infrastructure, energy, and AI.",
      "They come for the dealflow. They stay for the room.",
    ],
    [
      "BUILDERS",
      "Engineers, architects, and technical founders building across the intelligence, bits, electrons, and atoms layers.",
      "They come for the thesis. They stay for the network.",
    ],
  ];

  return (
    <div className="page-shell">
      <Header />
      <main>

        {/* SECTION 1: HERO */}
        <section className="hero hero--syndicate hero--solo">
          <div className="hero-copy reveal">
            <Eyebrow>DOOR III · THE FRONTIER SYNDICATE</Eyebrow>
            <h1>
              The room around <em>the Frontier Systems Firm.</em>
            </h1>
            <p className="subhead">
              A curated, application-only room for operators, allocators, and builders working
              across the full-stack architecture. Not a community. Not a course. Not a Discord. The
              room where intelligence, capital, and infrastructure converge. The people already
              inside are the reason to be here.
            </p>
            <div className="hero-cta-row">
              <a
                className="primary-action"
                href="#syndicate-apply"
                onClick={() => track("Lead", { content_name: "Syndicate application" })}
              >
                Apply
              </a>
              <a
                className="ghost-action"
                href={links.syndicateSignal}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Subscribe", { plan: "signal_free" })}
              >
                Join the Signal (free)
              </a>
            </div>
          </div>

        </section>

        {/* SECTION 2: THESIS */}
        <section className="syndicate-thesis">
          <blockquote className="thesis-paragraph">
            The infrastructure cycle that is now underway will not be won at the application layer.
            It will be won by the operators, allocators, and builders who control the intelligence,
            the bits, the electrons, the atoms, the capital, and the institutions that govern all of
            it. The Frontier Syndicate is the room where those people find each other, sharpen the
            thesis, and move together. The room is intentionally small. Access is by application.
            The people already inside are the reason to be here.
          </blockquote>
        </section>

        {/* SECTION 3: THE STACK INSIDE THE ROOM */}
        <section className="syndicate-stack">
          <div className="section-heading">
            <Eyebrow>THE STACK INSIDE THE ROOM</Eyebrow>
            <h2>Six layers. One system. One room.</h2>
          </div>
          <div className="syndicate-stack-rows">
            {stackRows.map(([layer, desc]) => (
              <div key={layer} className="syndicate-stack-row">
                <span className="syndicate-layer-label">{layer}</span>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WHO SITS INSIDE */}
        <section className="syndicate-who">
          <div className="section-heading">
            <Eyebrow>WHO SITS INSIDE</Eyebrow>
            <h2>Three kinds of people. One room.</h2>
          </div>
          <div className="syndicate-who-grid">
            {whoRows.map(([role, desc, signal]) => (
              <article key={role} className="syndicate-who-card">
                <Eyebrow>{role}</Eyebrow>
                <p>{desc}</p>
                <p className="syndicate-who-signal">{signal}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 5: WHAT YOU RECEIVE */}
        <section className="syndicate-receive">
          <div className="section-heading">
            <Eyebrow>WHAT YOU RECEIVE</Eyebrow>
          <h2>Signal, systems, proximity, and access.</h2>
        </div>
        <p className="syndicate-receive-prose">
            Weekly Frontier Signal drops covering intelligence, infrastructure, capital, and
            institutional moves. Monthly deep-dive sessions with Jean-Jacques and visiting operators.
            Quarterly in-person convenings for Syndicate and Council members. Direct access to the
            operator and allocator directory. Full access to the Selfbuiltsystems systems vault. And the room
            itself. The room compounds in value as the people inside it compound. Owning a seat
            here is not a subscription. It is a position.
          </p>
        </section>

        <ReviewStrip doorFilter={3} />

        {/* SECTION 6: THREE TIERS */}
        <section className="syndicate-tiers">
          <div className="section-heading">
            <Eyebrow>MEMBERSHIP TIERS</Eyebrow>
            <h2>Three levels of access.</h2>
          </div>
          <div className="syndicate-tier-grid">
            <article className="syndicate-tier-card">
              <Eyebrow>TIER I · SIGNAL</Eyebrow>
              <h3>Free</h3>
              <p>
                The public frontier signal. Weekly intelligence drops, open to operators who want to
                track the thesis before committing to the room.
              </p>
              <a
                href={links.syndicateSignal}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Subscribe", { plan: "signal_free" })}
                className="tier-cta"
              >
                Join the Signal
              </a>
            </article>

            <article className="syndicate-tier-card syndicate-tier-card--accent">
              <Eyebrow>TIER II · SYNDICATE</Eyebrow>
              <h3>$55/mo &nbsp;<span className="tier-alt">or $497/yr</span></h3>
              <p>
                Full room access. Weekly Signal, monthly sessions, quarterly convenings, vault,
                directory, and the operator network. The primary membership tier.
              </p>
              <a
                href="#syndicate-apply"
                onClick={() => track("Subscribe", { plan: "syndicate_monthly" })}
                className="tier-cta"
              >
                Apply for Syndicate
              </a>
            </article>

            <article className="syndicate-tier-card">
              <Eyebrow>TIER III · COUNCIL</Eyebrow>
              <h3>$5K/yr &nbsp;<span className="tier-alt">25 seats</span></h3>
              <p>
                A smaller room inside the room. Earlier signal, closer proximity to the capital and
                institutional thesis, and direct access to Jean-Jacques and the Selfbuiltsystems operating team.
              </p>
              <a
                href="#syndicate-apply"
                onClick={() => track("Lead", { content_name: "Council application" })}
                className="tier-cta"
              >
                Apply for the Council
              </a>
            </article>
          </div>

          <p className="capital-desk-whisper">
            Council members with active dealflow are reviewed for the Frontier Capital Desk, the
            firm's deal-making layer. No public application. No published price. The Council is the
            path.
          </p>
        </section>

        {/* SECTION 7: ANTI-POSITIONING */}
        <section className="syndicate-anti">
          <p className="anti-line">
            The Syndicate is not a community. It is the room around the Frontier Systems Firm.
            Membership is by application.
          </p>
        </section>

        {/* SECTION 8: APPLICATION — inline form, all Apply/Council buttons scroll here */}
        <section className="syndicate-apply" id="syndicate-apply">
          <div className="qual-form-header">
            <Eyebrow>APPLICATION</Eyebrow>
            <h2>Apply for membership.</h2>
            <p className="qual-form-intro">
              The application asks who you are, what you are building, and which layer of the stack
              you are operating in. Applications are reviewed weekly. The room is intentionally
              small. The people already inside are the reason to apply.
            </p>
          </div>
          <SyndicateApplyForm />
        </section>

      </main>
      <Footer
        crossSell={
          <p>
            Need the operating system first?{" "}
            <Link href="/sbs-ai">Enter Door II</Link>
          </p>
        }
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOT FOUND
───────────────────────────────────────────── */
function NotFoundFunnelPage() {
  usePageMeta("Selfbuiltsystems | Route Not Found", "Return to the Selfbuiltsystems three-door portal.");
  return (
    <div className="page-shell">
      <Header />
      <main className="not-found-panel">
        <Eyebrow>ROUTE CLOSED</Eyebrow>
        <h1>This door is not active.</h1>
        <p>Return to the portal and choose one of the three live paths.</p>
        <Link className="primary-action" href="/">
          Return to portal
        </Link>
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   DOOR I: CHECKOUT BRIDGE
───────────────────────────────────────────── */
function CheckoutPage({ productKey }: { productKey: string }) {
  const product = checkoutProducts[productKey];

  usePageMeta(
    `${product?.name ?? "Checkout"} | Selfbuiltsystems`,
    `Acquire ${product?.name ?? "this product"} from Selfbuiltsystems.`,
  );

  if (!product) {
    return (
      <div className="page-shell">
        <Header />
        <main className="not-found-panel">
          <Eyebrow>ROUTE CLOSED</Eyebrow>
          <h1>This product is not available.</h1>
          <p>Return to the catalogue and choose a product.</p>
          <Link className="primary-action" href="/sbs-io">Back to Door I</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isPlaceholder = product.gumroadHref.startsWith("#");

  return (
    <div className="page-shell">
      <Header />
      <main>

        {/* CHECKOUT HERO */}
        <section className="checkout-hero">
          <div className="checkout-product-image">
            <img src={product.image} alt={`${product.name} product mockup`} />
          </div>
          <div className="checkout-copy">
            <Eyebrow>DOOR I · SELFBUILTSYSTEMS.IO</Eyebrow>
            <h1>{product.name}</h1>
            <p className="checkout-pitch">{product.pitch}</p>
            <div className="checkout-price-row">
              <span className="checkout-price">{product.price}</span>
              {isPlaceholder ? (
                <span className="checkout-cta checkout-cta--pending" title="Gumroad link not yet configured">
                  Complete Purchase
                  <span className="checkout-pending-note">Link coming soon</span>
                </span>
              ) : (
                <a
                  className="checkout-cta"
                  href={product.gumroadHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("Purchase", { content_name: product.name })}
                >
                  Complete Purchase
                  <span className="checkout-trust">Powered by Gumroad · Secure checkout</span>
                </a>
              )}
            </div>
            {isPlaceholder && (
              <p className="checkout-placeholder-note">
                Checkout link not yet configured. Replace <code>gumroadHref</code> in
                the <code>checkoutProducts</code> object in <code>Home.tsx</code> with
                your Gumroad product URL to activate this button.
              </p>
            )}
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="checkout-next">
          <Eyebrow>WHAT HAPPENS NEXT</Eyebrow>
          <ol className="checkout-steps">
            <li>
              <span className="checkout-step-num">01</span>
              <div>
                <strong>Secure checkout via Gumroad.</strong>
                <p>Pay by card. Gumroad handles the transaction securely. No account required.</p>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">02</span>
              <div>
                <strong>Instant delivery to your inbox.</strong>
                <p>{product.nextStep}</p>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">03</span>
              <div>
                <strong>Deploy the system.</strong>
                <p>Apply the asset to your operating model. Hold Selfbuiltsystems to the commitment: if it does not move the needle, we work with you until it does.</p>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">04</span>
              <div>
                <strong>When you are ready, enter Door II.</strong>
                <p>Door II is the enterprise path. Selfbuiltsystems designs, deploys, and capitalises full-stack architecture with you directly.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* COMMITMENT */}
        <section className="guarantee-block">
          <Eyebrow>THE COMMITMENT</Eyebrow>
          <p>
            These are working assets, not theory. If you apply the system and it does not move the
            needle on your operating clarity, we will work with you until it does. We do not offer
            refunds on digital assets. We offer results. Buy it, use it, and hold us to the
            standard we set.
          </p>
        </section>

        {/* LADDER NUDGE */}
        <section className="ladder-nudge">
          <Eyebrow>THE NEXT STEP</Eyebrow>
          <p>
            When the self-build assets have sharpened your operating model, the logical next move is
            to have the system designed and deployed with you. That is Door II.
          </p>
          <Link className="primary-action" href="/sbs-ai">
            Enter Door II
          </Link>
        </section>

      </main>
      <Footer
        crossSell={
          <p>
            Already have what you need?{" "}
            <Link href="/sbs-ai">Apply for Frontier OS (Door II)</Link>
          </p>
        }
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOOK-A-CALL FUNNEL: QUALIFY PAGE
───────────────────────────────────────────── */
function QualifyPage() {
  usePageMeta(
    "Selfbuiltsystems | Quick Qualification",
    "Answer 5 quick questions to see if a Frontier OS strategy call is the right next step for your business.",
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      label: "What best describes your current situation?",
      options: [
        { value: "founder-scaling", label: "Founder scaling a business past $500K revenue" },
        { value: "smb-operator", label: "SMB operator with a team and real operational complexity" },
        { value: "enterprise", label: "Enterprise or institutional decision-maker" },
        { value: "early-stage", label: "Early-stage, pre-revenue, or exploring" },
      ],
    },
    {
      id: 1,
      label: "What is your biggest operational bottleneck right now?",
      options: [
        { value: "acquisition", label: "Client acquisition and lead generation" },
        { value: "fulfillment", label: "Delivery, fulfilment, or operational capacity" },
        { value: "reporting", label: "Reporting, data, and decision loops" },
        { value: "all-of-above", label: "All of the above. The whole system needs upgrading." },
      ],
    },
    {
      id: 2,
      label: "Have you worked with AI consultants or marketing agencies before?",
      options: [
        { value: "yes-bad", label: "Yes. It did not work. We got tools, not systems." },
        { value: "yes-ok", label: "Yes. Some results, but nothing compounding." },
        { value: "no-first", label: "No. This would be our first serious AI infrastructure investment." },
        { value: "internal", label: "We have tried to build it internally. We need outside expertise." },
      ],
    },
    {
      id: 3,
      label: "What is your deployment budget for an AI operating system?",
      options: [
        { value: "under-3k", label: "Under $3,000" },
        { value: "3k-10k", label: "$3,000 to $10,000" },
        { value: "10k-50k", label: "$10,000 to $50,000" },
        { value: "50k-plus", label: "$50,000 and above" },
      ],
    },
    {
      id: 4,
      label: "How urgently do you need this solved?",
      options: [
        { value: "now", label: "Immediately. This is costing us money every week we wait." },
        { value: "30-days", label: "Within the next 30 days." },
        { value: "90-days", label: "Within the next 90 days." },
        { value: "exploring", label: "Still exploring. No firm timeline yet." },
      ],
    },
  ];

  function isDisqualified(ans: Record<number, string>): boolean {
    // Disqualify: early-stage OR budget under $3K
    if (ans[0] === "early-stage") return true;
    if (ans[3] === "under-3k") return true;
    return false;
  }

  function handleSelect(questionId: number, value: string) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 280);
    } else {
      // All answered — route
      track("Lead", { content_name: "Qualify form completed" });
      const disqualified = isDisqualified(newAnswers);
      if (disqualified) {
        window.location.href = "/not-a-fit";
      } else {
        window.location.href = "/qualified";
      }
    }
  }

  const current = questions[step];
  const progress = Math.round(((step) / questions.length) * 100);

  return (
    <div className="page-shell">
      <Header />
      <main className="qualify-main">
        <div className="qualify-container">
          <div className="qualify-progress-bar">
            <div className="qualify-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="qualify-step-label">
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="qualify-question">{current.label}</h2>
          <div className="qualify-options">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                className={`qualify-option ${answers[current.id] === opt.value ? "qualify-option--selected" : ""}`}
                onClick={() => handleSelect(current.id, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOOK-A-CALL FUNNEL: NOT A FIT PAGE
───────────────────────────────────────────── */
function NotAFitPage() {
  usePageMeta(
    "Selfbuiltsystems | Not the Right Fit Yet",
    "Based on your answers, Frontier OS is not the right next step right now. Here is what we recommend instead.",
  );

  return (
    <div className="page-shell">
      <Header />
      <main className="not-a-fit-main">
        <div className="not-a-fit-container">
          <Eyebrow>HONEST ASSESSMENT</Eyebrow>
          <h1>Not the right fit <em>right now.</em></h1>
          <p className="not-a-fit-prose">
            Based on your answers, Frontier OS is not the right next step for where you are today. That is not a problem. It means you are earlier in the cycle. The best operators we have worked with started exactly where you are.
          </p>
          <p className="not-a-fit-prose">
            When you are ready to invest $5,000 or more in a real operating system and you have a business generating revenue that needs to compound, come back. The door will still be here.
          </p>
          <div className="not-a-fit-actions">
            <div className="not-a-fit-action-card">
              <Eyebrow>STEP 1</Eyebrow>
              <h3>Join the Frontier Syndicate</h3>
              <p>The free signal tier gives you weekly frontier intelligence, operator frameworks, and the thinking that informs everything Selfbuiltsystems builds. Stay close to the room while you build toward it.</p>
              <a
                className="primary-action"
                href="https://t.me/frontiersignal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Subscribe", { plan: "signal_free_disqualified" })}
              >
                Join the Free Signal
              </a>
            </div>
            <div className="not-a-fit-action-card">
              <Eyebrow>STEP 2</Eyebrow>
              <h3>Start with Door I</h3>
              <p>The Master Prompt Vault and the 30-Day Self-Build Playbook are the operating language of the room, compressed into assets you can deploy today. The $17 vault is the first key.</p>
              <Link
                className="primary-action"
                href="/sbs-io"
                onClick={() => track("PageView", { page: "door1_from_disqualified" })}
              >
                Explore Door I
              </Link>
            </div>
            <div className="not-a-fit-action-card">
              <Eyebrow>STEP 3</Eyebrow>
              <h3>Watch the Frontier OS Brief</h3>
              <p>The full Frontier OS brief walks through the intelligence layer, the deployment architecture, and what it looks like to install a real operating system. Watch it when you are ready to move.</p>
              <Link
                className="primary-action"
                href="/sbs-ai"
                onClick={() => track("PageView", { page: "door2_from_disqualified" })}
              >
                Watch the Brief
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOOK-A-CALL FUNNEL: QUALIFIED PAGE + CALENDLY
───────────────────────────────────────────── */
function QualifiedPage() {
  usePageMeta(
    "Selfbuiltsystems | You Qualify. Book Your Call.",
    "You are a fit for Frontier OS. Book your 30-minute strategy call with the Selfbuiltsystems team now.",
  );

  // TODO: Replace this URL with your real Calendly booking link
  const CALENDLY_URL = "https://calendly.com/selfbuiltsystems/frontier-os-strategy-call";

  useEffect(() => {
    track("Lead", { content_name: "Qualified page reached" });
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="page-shell">
      <Header />
      <main className="qualified-main">
        <div className="qualified-header">
          <Eyebrow>YOU QUALIFY</Eyebrow>
          <h1>Book your <em>strategy call.</em></h1>
          <p className="qualified-prose">
            Based on your answers, you are a strong fit for Frontier OS. The next step is a 30-minute strategy call with the Selfbuiltsystems team. We will map your current operating model, identify the highest-leverage deployment point, and give you a clear picture of what the first 60 days looks like. No pitch. No pressure. Just clarity.
          </p>
        </div>
        <div className="qualified-calendly-wrap">
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=07070a&text_color=f5f5f0&primary_color=c9c9b8`}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
        <div className="qualified-trust">
          <Eyebrow>WHAT HAPPENS AFTER YOU BOOK</Eyebrow>
          <ol className="checkout-steps">
            <li>
              <span className="checkout-step-num">01</span>
              <div>
                <strong>You will receive a confirmation email.</strong>
                <p>Check your inbox (and spam) for the calendar invite with the Zoom link. The call is 30 minutes. Come prepared.</p>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">02</span>
              <div>
                <strong>Watch the Frontier OS Brief before the call.</strong>
                <p>The brief is 8 to 15 minutes. It walks through the full architecture. Operators who watch it first get significantly more out of the call.</p>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">03</span>
              <div>
                <strong>Come with one clear answer.</strong>
                <p>What is the single biggest operational bottleneck costing you the most right now? The call is most valuable when you know the answer to that question before we start.</p>
              </div>
            </li>
          </ol>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   BOOK-A-CALL FUNNEL: BOOKING CONFIRMATION PAGE
───────────────────────────────────────────── */
function BookingConfirmationPage() {
  usePageMeta(
    "Selfbuiltsystems | Call Confirmed",
    "Your strategy call is booked. Here is how to prepare.",
  );

  useEffect(() => {
    track("Schedule", { content_name: "Strategy call booked" });
  }, []);

  return (
    <div className="page-shell">
      <Header />
      <main className="confirmation-main">
        <div className="confirmation-container">
          <Eyebrow>CALL CONFIRMED</Eyebrow>
          <h1>Your call is booked. <em>Here is how to prepare.</em></h1>
          <p className="confirmation-prose">
            Check your inbox for the calendar invite with the Zoom link. The call is 30 minutes. The three steps below will make it significantly more valuable.
          </p>
          <ol className="checkout-steps confirmation-steps">
            <li>
              <span className="checkout-step-num">01</span>
              <div>
                <strong>Watch the Frontier OS Brief.</strong>
                <p>The brief walks through the full intelligence-to-atoms architecture, the deployment model, and the results we have achieved with operators across the stack. Operators who watch it first arrive with better questions and close faster.</p>
                <Link
                  className="confirmation-video-link"
                  href="/sbs-ai"
                  onClick={() => track("ViewContent", { content_name: "Frontier OS Brief pre-call" })}
                >
                  Watch the Frontier OS Brief
                </Link>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">02</span>
              <div>
                <strong>Join on Zoom or Google Meet. No phone calls.</strong>
                <p>We only take calls on video. This is a working session, not a pitch. Please be in a quiet environment with your camera on. The Zoom link is in your calendar invite.</p>
              </div>
            </li>
            <li>
              <span className="checkout-step-num">03</span>
              <div>
                <strong>Know your one bottleneck.</strong>
                <p>Before the call, write down the single biggest operational problem costing you the most right now. Revenue, fulfilment, reporting, or acquisition. One sentence. That is where we will start.</p>
              </div>
            </li>
          </ol>
          <div className="confirmation-footer-note">
            <p>Questions before the call? Email <a href="mailto:hello@selfbuiltsystems.com">hello@selfbuiltsystems.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
export default function Home({
  page = "portal",
}: {
  page?: "portal" | "self" | "dfy" | "community" | "not-found" | "checkout-vault" | "checkout-playbook" | "checkout-templates" | "qualify" | "not-a-fit" | "qualified" | "booking-confirmation";
}) {
  useEffect(() => {
    track("PageView", { page });
  }, [page]);

  const component = useMemo(() => {
    switch (page) {
      case "self":
        return <SelfBuildPage />;
      case "dfy":
        return <DoneForYouPage />;
      case "community":
        return <SyndicatePage />;
      case "not-found":
        return <NotFoundFunnelPage />;
      case "checkout-vault":
        return <CheckoutPage productKey="vault" />;
      case "checkout-playbook":
        return <CheckoutPage productKey="playbook" />;
      case "checkout-templates":
        return <CheckoutPage productKey="templates" />;
      case "qualify":
        return <QualifyPage />;
      case "not-a-fit":
        return <NotAFitPage />;
      case "qualified":
        return <QualifiedPage />;
      case "booking-confirmation":
        return <BookingConfirmationPage />;
      case "portal":
      default:
        return <PortalPage />;
    }
  }, [page]);

  return component;
}
