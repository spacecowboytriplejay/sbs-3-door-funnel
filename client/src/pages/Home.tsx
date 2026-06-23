/*
Design reminder: Dark Editorial Institutionalism. This page must reinforce a restrained, high-authority frontier systems register: warmed near-black surfaces, 0.5px hairline borders, Cormorant editorial headlines, Inter utility copy, mono route labels, quiet motion, no hype, no invented proof, and no artificial humans.
*/
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

const portalVisual = "https://d2xsxph8kpxj0f.cloudfront.net/310519663150514473/fSXWzfJRKK5zBdpq8WL4xd/sbs-dark-frontier-portal-3wbox52kx6gLLzAfZZHYZ9.webp";

const productAssets = {
  vault: "/manus-storage/master-prompt-vault-mockup-transparent_cba99e5c.png",
  playbook: "/manus-storage/self-build-playbook-mockup-transparent_9ad47f20.png",
  stack: "/manus-storage/operator-funnel-stack-mockup-transparent_500ae9b4.png",
};

const links = {
  stripeVault: "#STRIPE_LINK_VAULT_17",
  stripePlaybook: "#STRIPE_LINK_PLAYBOOK_150",
  stripeTemplates: "#STRIPE_LINK_TEMPLATES_300",
  application: "#APPLICATION_FORM_URL",
  skoolMonthly: "#SKOOL_LINK_MONTHLY",
  skoolAnnual: "#SKOOL_LINK_ANNUAL",
  council: "#COUNCIL_APPLICATION_URL",
};

function track(event: string, payload: Record<string, string | number> = {}) {
  if (typeof window !== "undefined") {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") {
      fbq("track", event, payload);
    }
    window.dispatchEvent(new CustomEvent("sbs:funnel-event", { detail: { event, payload } }));
  }
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]') ?? document.createElement("meta");
    descriptionTag.setAttribute("name", "description");
    descriptionTag.setAttribute("content", description);
    document.head.appendChild(descriptionTag);

    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", title);
    document.head.appendChild(ogTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]') ?? document.createElement("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.setAttribute("content", description);
    document.head.appendChild(ogDescription);

    const ogImage = document.querySelector('meta[property="og:image"]') ?? document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.setAttribute("content", portalVisual);
    document.head.appendChild(ogImage);
  }, [title, description]);
}

const doors = [
  {
    numeral: "I",
    path: "/sbs-io",
    domain: "sbs.io",
    title: "The Self-Built Operator Stack",
    qualifier: "For operators who build their own edge.",
    event: "door_1",
  },
  {
    numeral: "II",
    path: "/sbs-ai",
    domain: "sbs.ai",
    title: "Frontier OS — Done For You",
    qualifier: "For founders ready to deploy a frontier AI operating system in 60 days.",
    primary: true,
    event: "door_2",
  },
  {
    numeral: "III",
    path: "/frontier-co",
    domain: "frontier.co",
    title: "The Frontier Inner Circle",
    qualifier: "For operators who want to be in the room where the next wave is built.",
    event: "door_3",
  },
];

const products = [
  {
    name: "Master Prompt Vault",
    price: "$17",
    pitch: "1,000+ frontier prompts engineered for operators building at the edge of AI.",
    image: productAssets.vault,
    href: links.stripeVault,
  },
  {
    name: "The 30-Day Self-Build Playbook",
    price: "$150",
    pitch: "The exact 30-day system to deploy your own AI operator stack — without hiring a $90K Growth Engineer.",
    image: productAssets.playbook,
    href: links.stripePlaybook,
  },
  {
    name: "Operator Funnel Templates + Agent Stack",
    price: "$300",
    pitch: "7 plug-and-play agents + GHL-ready funnel templates. Deploy in a weekend.",
    image: productAssets.stack,
    href: links.stripeTemplates,
  },
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
        <a href="#doors">Doors</a>
        <Link href="/frontier-co">Council</Link>
      </nav>
      <Link href={location === "/" ? "#doors" : "/"} className="nav-cta">
        Enter →
      </Link>
    </header>
  );
}

function Footer({ crossSell }: { crossSell?: React.ReactNode }) {
  return (
    <footer className="footer">
      {crossSell ? <div className="cross-sell">{crossSell}</div> : null}
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

function VslBlock({ caption, duration = "02:18", longForm = false }: { caption: string; duration?: string; longForm?: boolean }) {
  return (
    <div className={`vsl-shell ${longForm ? "vsl-shell--wide" : ""}`} onClick={() => track("ViewContent", { content_name: caption })} role="button" tabIndex={0}>
      <div className="vsl-frame" aria-label={`${caption} video placeholder`}>
        <img src={portalVisual} alt="Dark editorial three-door frontier systems visual" />
        <div className="vsl-overlay" />
        <div className="play-button" aria-hidden="true">▶</div>
        <div className="poster-note">Real Jean VSL frame pending</div>
        <button className="unmute-chip">Unmute</button>
      </div>
      <p className="caption">VSL · {caption} · {duration}</p>
    </div>
  );
}

function DoorCards() {
  return (
    <section className="doors" id="doors" aria-label="Choose a door">
      <p className="section-label">— CHOOSE A DOOR —</p>
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
              {door.primary ? <span className="primary-tag">· primary</span> : null}
            </div>
            <p className="domain-label">{door.domain}</p>
            <h3>{door.title}</h3>
            <p>{door.qualifier}</p>
            <span className="door-enter">Enter Door {door.numeral} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProofStrip({ label = "Trusted by operators at:" }: { label?: string }) {
  return (
    <section className="proof-strip" aria-label="Credibility placeholders">
      <p>{label}</p>
      <div className="logo-row">
        <span>Partner logo</span>
        <span>Client work</span>
        <span>Video proof</span>
        <span>Case study</span>
      </div>
    </section>
  );
}

function PortalPage() {
  usePageMeta("Selfbuiltsystems — Three Doors Into The Frontier", "Choose the SBS path that matches where you are now: self-build assets, done-for-you Frontier OS, or the Inner Circle.");

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--portal" id="manifesto">
          <div className="hero-copy reveal">
            <Eyebrow>A FRONTIER SYSTEMS FIRM</Eyebrow>
            <h1>Three doors into <em>the frontier</em>. Choose yours.</h1>
            <p className="subhead">We build, deploy, and operate next-generation systems with the top 0.1% of operators globally. Pick the door that matches where you are right now.</p>
          </div>
          <VslBlock caption="Founder Brief" />
        </section>
        <section className="category-frame">
          <p>In the next 24 months, every operator at the frontier will rebuild the systems running their business. Most will hire it out and lose control. A small few will own the operating system. We exist for the few.</p>
        </section>
        <DoorCards />
        <ProofStrip />
      </main>
      <Footer />
    </div>
  );
}

function SelfBuildPage() {
  usePageMeta("SBS Door I — Self-Build Catalogue", "Three plug-and-play assets for operators building their own AI edge at frontier standard.");

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--narrow">
          <div className="hero-copy reveal">
            <Eyebrow>DOOR I</Eyebrow>
            <h1>Build it yourself. <em>At frontier standard.</em></h1>
            <p className="subhead">Three plug-and-play assets used by operators building their own AI edge.</p>
          </div>
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
                  <a href={product.href} onClick={() => track("InitiateCheckout", { content_name: product.name })}>Buy Now →</a>
                </div>
              </div>
            </article>
          ))}
        </section>
        <ProofStrip label="Built for operators who prefer ownership:" />
        <section className="guarantee-block">
          <Eyebrow>GUARANTEE</Eyebrow>
          <p>If the asset does not clarify your next build decision, request a refund within 30 days. No performance theatre. No lock-in.</p>
        </section>
      </main>
      <Footer crossSell={<p>Need it built for you instead? <Link href="/sbs-ai">Enter Door II →</Link></p>} />
    </div>
  );
}

function DoneForYouPage() {
  usePageMeta("SBS Door II — Frontier OS Done For You", "Apply to deploy a frontier AI operating system in 60 days with Selfbuiltsystems.");

  const phases = [
    ["Phase 1", "Wk 1–2", "Frontier Audit"],
    ["Phase 2", "Wk 3–6", "Build Phase"],
    ["Phase 3", "Wk 7–8", "Deploy & Train"],
    ["Phase 4", "Mo 3–6", "Operate Phase"],
  ];

  const tiers = [
    ["Frontier Lite", "$6K", "Single-system deployment", "One critical revenue, operations, or fulfillment system deployed to operating standard."],
    ["Frontier Core", "$25K", "Multi-system deployment", "A connected operating layer across acquisition, delivery, reporting, and internal workflows."],
    ["Frontier Sovereign", "$100K+", "Full Frontier OS + 6-month operate phase", "A complete frontier operating system designed, deployed, trained, and operated with oversight."],
  ];

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--primary">
          <div className="hero-copy reveal">
            <Eyebrow>DOOR II · FRONTIER OS</Eyebrow>
            <h1>Deploy a frontier AI operating system in <em>60 days.</em></h1>
            <p className="subhead">Done-for-you AI infrastructure for founders operating at $1M+ revenue. Built by the team behind [CREDIBILITY_ANCHOR].</p>
            <a className="primary-action" href={links.application} onClick={() => track("Lead", { content_name: "Frontier OS application" })}>Apply for Frontier OS →</a>
          </div>
          <VslBlock caption="Frontier OS Brief" duration="08:00–15:00" longForm />
        </section>
        <section className="category-frame category-frame--sharp">
          <p>Most firms operate inside the system. We build the systems other firms operate inside.</p>
        </section>
        <section className="fit-grid">
          <article>
            <Eyebrow>FOR</Eyebrow>
            <h2>Founders ready to install operational leverage.</h2>
            <p>Best suited for $1M+ operators with a clear deployment budget, urgent systems bottleneck, and a founder-level mandate to move.</p>
          </article>
          <article>
            <Eyebrow>NOT FOR</Eyebrow>
            <h2>Teams looking for scattered automations.</h2>
            <p>This is not a prompt pack, chatbot experiment, or tactical software setup. It is operating infrastructure.</p>
          </article>
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
        <ProofStrip label="Proof slots reserved for real Jean client work:" />
        <section className="final-cta">
          <Eyebrow>RISK REVERSAL</Eyebrow>
          <h2>Deployment in 60 days or every additional week is on us.</h2>
          <p>The application asks for revenue, deployment budget, timeline, and the primary system to deploy first.</p>
          <a className="primary-action" href={links.application} onClick={() => track("Lead", { content_name: "Frontier OS final application" })}>Apply for Frontier OS →</a>
        </section>
      </main>
      <Footer crossSell={<p>Application submitted? Invite qualified operators into <Link href="/frontier-co">the Inner Circle →</Link></p>} />
    </div>
  );
}

function InnerCirclePage() {
  usePageMeta("SBS Door III — Frontier Inner Circle", "Join the operator room for weekly frontier signal, build-alongs, peer access, and Jean-led AMAs.");

  const assets = [
    "Weekly Frontier Signal Drop",
    "Live Build-Alongs (2x/month)",
    "Member-Only Vault (rolling)",
    "Quarterly Frontier Roundtable",
    "Peer Directory (operator-only)",
    "Monthly AMA with Jean",
  ];

  return (
    <div className="page-shell">
      <Header />
      <main>
        <section className="hero hero--community">
          <div className="hero-copy reveal">
            <Eyebrow>DOOR III · INNER CIRCLE</Eyebrow>
            <h1>The room where <em>the next wave</em> is built.</h1>
            <p className="subhead">Weekly frontier signal. Live build-alongs. Peer access to the top 0.1% of operators.</p>
            <a className="primary-action" href={links.skoolMonthly} onClick={() => track("Subscribe", { plan: "monthly" })}>Join the Inner Circle — $55/mo →</a>
          </div>
          <VslBlock caption="Inner Circle Brief" duration="02:00–04:00" />
        </section>
        <section className="asset-grid">
          {assets.map((asset, index) => (
            <article key={asset}>
              <span className="asset-number">0{index + 1}</span>
              <h3>{asset}</h3>
            </article>
          ))}
        </section>
        <section className="pricing-band">
          <article>
            <Eyebrow>MONTHLY</Eyebrow>
            <h2>$55/mo</h2>
            <a href={links.skoolMonthly} onClick={() => track("Subscribe", { plan: "monthly" })}>Join monthly →</a>
          </article>
          <article className="pricing-band--accent">
            <Eyebrow>ANNUAL · 24% SAVING</Eyebrow>
            <h2>$497/yr</h2>
            <a href={links.skoolAnnual} onClick={() => track("Subscribe", { plan: "annual" })}>Join annual →</a>
          </article>
        </section>
        <section className="council-block">
          <div>
            <Eyebrow>FRONTIER COUNCIL</Eyebrow>
            <h2>$5K/yr. Capped at 25 seats.</h2>
            <p>For operators who want a smaller room, earlier signal, and priority access to the systems being built next.</p>
          </div>
          <a className="primary-action" href={links.council}>Apply for the Council →</a>
        </section>
        <section className="guarantee-block">
          <Eyebrow>RISK REVERSAL</Eyebrow>
          <p>30 days. Zero questions. Full refund.</p>
        </section>
      </main>
      <Footer crossSell={<p>When your operating model is ready, request <Link href="/sbs-ai">Door II priority access →</Link></p>} />
    </div>
  );
}

function NotFoundFunnelPage() {
  usePageMeta("SBS — Route Not Found", "Return to the SBS three-door portal.");
  return (
    <div className="page-shell">
      <Header />
      <main className="not-found-panel">
        <Eyebrow>ROUTE CLOSED</Eyebrow>
        <h1>This door is not active.</h1>
        <p>Return to the portal and choose one of the three live paths.</p>
        <Link className="primary-action" href="/">Return to portal →</Link>
      </main>
      <Footer />
    </div>
  );
}

export default function Home({ page = "portal" }: { page?: "portal" | "self" | "dfy" | "community" | "not-found" }) {
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
        return <InnerCirclePage />;
      case "not-found":
        return <NotFoundFunnelPage />;
      case "portal":
      default:
        return <PortalPage />;
    }
  }, [page]);

  return component;
}
