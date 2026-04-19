# Technical Specification: SvelteKit SEO & Performance (Lighthouse 100/100)

> **Agent Instructions (For AI Model / Flash):**
> This is a strict step-by-step technical checklist. Your goal is to execute these tasks precisely and efficiently. For each step, provide complete code or directly modify the files. Do not skip any steps. Provide complete, drop-in replacement code for any file you modify. Pay special attention to configuring the project for a Multi-Page Application (MPA) environment without client-side Svelte hydration.



## Task: Create Comprehensive SEO Text from Components

**Objective:** Assemble a high-quality, EEAT-compliant SEO text based on all the blocks available in `src/lib/components` and integrate the provided strategy content.

### Blocks (Components) to Process:
- **Intro & Hero:** `Hero.svelte`, `About.svelte`, `Stats.svelte`, `LogoCloud.svelte`
- **Core Value:** `ServicesExt.svelte`, `Expertise.svelte`, `Comparison.svelte`, `Workflow.svelte`
- **Conversion & Info:** `Pricing.svelte`, `FAQ.svelte`, `Cta.svelte`, `CallbackForm.svelte`
- **Structure:** `Header.svelte`, `Footer.svelte`, `Disclaimer.svelte`, `Seo.svelte`, `PageBuilder.svelte`, `UILab.svelte`

### Checklist:
- [ ] **Task [SEO-CONTENT-01]: Content Mapping.** Map the provided Example EEAT SEO text to the appropriate UI components (e.g., put the WP vs Svelte comparison into `Comparison.svelte`, "Killer Features" into `Expertise.svelte` or `ServicesExt.svelte`).
- [ ] **Task [SEO-CONTENT-02]: Content Generation.** Write missing SEO text for components that don't have coverage in the provided draft (e.g., generate 5-7 SEO-optimized FAQ items for `FAQ.svelte`, compelling call-to-actions for `Cta.svelte`, and statistics for `Stats.svelte`).
- [ ] **Task [SEO-CONTENT-03]: Semantic HTML Audit.** Ensure the text flow creates a logical heading hierarchy (H1 -> H2 -> H3) across the sequence of components without skipping heading levels.
- [ ] **Task [SEO-CONTENT-04]: JSON-LD & Meta.** Generate `Organization` and `FAQPage` JSON-LD schemas based on the final text for the `Seo.svelte` component.
- [ ] **Task [SEO-CONTENT-05]: Implementation.** Update the component files or page data structures (like a JSON file used by `PageBuilder.svelte`) with the finalized English SEO text.

---

## IndexFlow: Project Strategy, Tasks & SEO Content

### 1. Updated Project Overview & Skills
IndexFlow is a high-performance digital agency specializing in cutting-edge web development and technical SEO. We bridge the gap between complex fullstack engineering and search engine dominance.

**Core Tech Stack**
- **Frameworks:** React, Next.js, Svelte, SvelteKit.
- **Architecture:** Zero/Low JS, JSON-oriented data structures, Headless CMS.
- **Performance:** Core Web Vitals (Lighthouse 100/100), Optimized TBT & LCP.
- **SEO:** Google Indexing API, JSON-LD Schema, Semantic HTML5, Automated Sitemaps.
- **DevOps & Infra:** CI/CD (GitHub Actions), Vercel, AWS (S3/CloudFront), Cloudflare (WAF/Workers/Edge).
- **Marketing:** GA4 Server-side, GTM, Google Ads Expert Management.

### 2. Technical Tasks Backlog
**Technical SEO & Indexing**
- [ ] Task [SEO-01]: Implement Google Indexing API integration for instant content discovery.
- [ ] Task [SEO-02]: Develop a dynamic Sitemap.xml generator compatible with multi-language (i18n) routes.
- [ ] Task [SEO-03]: Audit and fix semantic HTML hierarchy (H1-H6) and ARIA attributes for accessibility.
- [ ] Task [SEO-04]: Configure JSON-LD structured data for breadcrumbs, products, and organization.

**Performance & Development**
- [ ] Task [DEV-01]: Refactor frontend components to "Zero-JS" architecture where interactivity is not required.
- [ ] Task [DEV-02]: Build a JSON-oriented content delivery pipeline to reduce database overhead.
- [ ] Task [DEV-03]: Setup a "Lighthouse Guard" in CI/CD to prevent performance regressions below 95/100.
- [ ] Task [DEV-04]: Implement multi-language (i18n) routing with SEO-friendly URL patterns (/en/, /ua/).

**Infrastructure & DevOps**
- [ ] Task [OPS-01]: Configure automated CI/CD pipelines (GitHub Actions/Vercel) for zero-downtime deployments.
- [ ] Task [OPS-02]: Setup Cloudflare Edge Caching and WAF to protect against DDoS and optimize global latency.
- [ ] Task [OPS-03]: Implement AWS S3/CloudFront integration for high-availability media asset delivery.
- [ ] Task [OPS-04]: Set up automated health checks and server-side error monitoring (Sentry/New Relic).

**Maintenance & Migration**
- [ ] Task [MIG-01]: Develop a migration blueprint for moving client data from WordPress/Joomla to SvelteKit Headless.
- [ ] Task [OPT-01]: Identify and remove redundant third-party scripts and memory leaks in legacy JS.
- [ ] Task [SEC-01]: Conduct a comprehensive security audit and implement Content Security Policy (CSP) headers.

### 3. Example EEAT SEO Text (English)

**IndexFlow: Web Development That Works For Your Business, Not Against It**
In a world where Google evaluates sites based on EEAT (Expertise, Experience, Authoritativeness, Trustworthiness) criteria, standard solutions are no longer enough. While competitors offer heavy WordPress templates, IndexFlow builds high-tech digital assets.

**Why Your Current Site (WP/Joomla) is the Weakest Link**
Most websites today are overloaded with unnecessary code. WordPress and similar CMS platforms create an illusion of simplicity, but in reality they:
- Slow Down: Bloated JS kills Lighthouse scores.
- Index Poorly: Google bots waste "crawl budget" reading garbage code.
- Crash: Standard hosting cannot handle traffic spikes, and manual plugin updates break the site.
- Cost More: Hidden fees for plugins, heavy hosting, and constant vulnerability patches.

**IndexFlow: "Zero JS" and "JSON-Orientation" Technologies**
Our signature is maximum performance. We use a modern Headless stack (Svelte, Next.js) so your site flies.

| Feature | Typical Agency (Legacy) | IndexFlow (Modern Stack) |
| --- | --- | --- |
| **Technology** | WordPress / PHP | SvelteKit / Next.js / React |
| **Speed (Lighthouse)** | 40-60 (Red Zone) | 95-100 (Green Zone) |
| **JS Payload** | Heavy Scripts (Bloated JS) | Zero / Low JS Architecture |
| **Indexing** | Waiting weeks for bots | Indexing API (Instant) |
| **Infrastructure** | Cheap shared hosting | Edge (Vercel / AWS / Cloudflare) |
| **Transparency** | Hidden maintenance fees | Fixed price, clean code |

**Our Killer Features**

🚀 **Technical SEO and "Instant Search"**
We don't just write Titles and Descriptions. We work with the code:
- Google Indexing API: Your pages appear in search within minutes, not weeks.
- Lighthouse Green Zone: We push sites into the perfect green zone, which directly impacts ad CPC and organic rankings.
- Clean Semantics: Your code is as clear to search engines as an open book.

🌐 **Infrastructure and DevOps: A Site That Never Goes Down**
We automate everything so your business runs 24/7:
- Zero-Downtime Deploy: Thanks to configured CI/CD, updates roll out seamlessly for users. No "maintenance mode" on the site.
- Global Acceleration (Edge): Deployment on Vercel and Cloudflare allows content delivery from the data center closest to the user.
- Enterprise Security: DDoS and hack protection at the AWS and Cloudflare WAF level.
- Automated Monitoring: We know about the problem before your client notices it.

🛠 **Headless Migration and Optimization**
Is your site running slow? We will perform a "heart transplant":
- Migration from heavy CMS (WordPress/Joomla) to fast modern engines.
- Elimination of memory leaks and optimization of "heavy" JS.
- Full security and data privacy audit.

💎 **Transparency and Trust (No Hidden Fees)**
Unlike others, we don't tie you to paid plugins or closed systems.
- Complete Transparency: You receive clean, documented code.
- Turnkey Project: From a custom widget to a Fullstack platform (Front + Back).
- JSON-Oriented: Lightweight data, fast loading, easy scaling.

### 4. Improved Master Prompt (For Future Use)
Act as a Senior Fullstack Developer and SEO Architect.
Update the IndexFlow documentation based on the following scope:
- Tech Stack: SvelteKit, Next.js, Zero JS philosophy, JSON-oriented architecture.
- Infrastructure: CI/CD (GitHub Actions), Edge Computing (Vercel/Cloudflare), AWS.
- Core Values: Performance (Lighthouse 100), Transparency (No hidden fees), Technical SEO (Indexing API).

Requirements:
1. Generate technical tasks in English (Backlog style) covering development, technical SEO, and DevOps/Cloud operations.
2. Write EEAT-compliant SEO content in English that compares 'Legacy WordPress' vs 'IndexFlow Modern Stack' with focus on speed and infrastructure reliability.
3. Highlight 'Killer Features' like real-time indexing, global CDN delivery, and automated CI/CD.
4. Maintain a professional, expert, and authoritative tone that builds trust with high-ticket clients.
