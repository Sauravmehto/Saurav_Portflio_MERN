// site-config.ts
// Central content config for the portfolio. Populated from
// Saurav_Mehto_Resume_2026.pdf — review every TODO(saurav) before shipping.

export type SkillCategory = {
  name: string;
  skills: string[];
};

export type Experience = {
  role: string;
  company: string;
  // string for a single site, string[] when a company has more than one
  // public domain worth linking (e.g. a main site + a labs/product site).
  companyUrl?: string | string[];
  start: string;
  end: string; // "Present" is fine
  bullets: string[];
  // Optional in-page pointer from this entry to another section — e.g.
  // Data Alpha AI's products live in Projects rather than having their
  // own public URLs, so this links there instead of a dead companyUrl.
  linkedSection?: { label: string; href: string };
};

export type Project = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  liveUrl?: string; // TODO(saurav): fill in if publicly demoable
  // Button text for liveUrl when "Live demo" would mislead (e.g. a login page).
  liveLabel?: string;
  repoUrl?: string; // TODO(saurav): fill in if the repo is public
  // Optional real media in /public. Rendered only when set — never a mockup.
  image?: string;
  video?: string;
  featured: boolean;
};

// Freelance projects — shown on their own /freelance page, not the
// homepage. Uses the same card visual language as the main Projects grid.
export type FreelanceProject = {
  title: string;
  tagline?: string;
  blurb: string;
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
};

export const siteConfig = {
  // ---------- Identity ----------
  name: "Saurav Mehto",
  role: "Full Stack Engineer (MERN) · AI Software Engineer",
  roles: [
    // used by react-type-animation in the Hero
    "Full Stack Engineer",
    "AI Software Engineer",
    "MERN Specialist",
    "Building agentic AI products",
  ],
  location: "New Delhi, India",
  email: "sauravmehto.98@gmail.com",
  // Resume-only by decision — intentionally not rendered anywhere on the
  // public site (Contact section pulls email/socials only).
  phone: "+91 8130699818",
  socials: {
    github: "https://github.com/Sauravmehto",
    linkedin: "https://linkedin.com/in/saurav-mehto",
  },

  // ---------- Status badge (Hero) ----------
  openToWork: true, // TODO(saurav): set to false if not actively looking
  currentFocus: "Shipping production AI products at Data Alpha AI",

  // ---------- About ----------
  yearsExperience: 4,
  avatarUrl: "", // TODO(saurav): set to "/avatar.jpg" (or similar) once you add a real headshot to /public
  bio: [
    "I'm a Full Stack and AI Software Engineer with close to four years of experience building enterprise web platforms, AI-powered applications, and scalable FastAPI/Python backends. Over that time I've moved from classic MERN work into hands-on applied-AI engineering — agentic workflows, LLM integration, and prompt engineering — without losing the full-stack fundamentals that got me here.",
    "At Data Alpha AI, I've owned four production AI products end-to-end — portfolio analytics, financial-data infrastructure, natural-language BI, and go-to-market automation — from requirements through React/Vite frontends, Claude API orchestration, and Docker/VPS deployment. I care about taking an idea to a working demo in days, not weeks.",
    "Outside of client and product work, I like digging into agent architectures (LangGraph, MCP) and building small tools that automate the tedious parts of my own workflow — a few of which live in the Playground section below.",
  ],

  resumeUrl: "/Saurav_Mehto_Resume.pdf",

  // ---------- Skills ----------
  skillCategories: [
    {
      name: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C++"],
    },
    {
      name: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "React Native",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Material UI",
        "Three.js",
        "Vite",
        "Webpack",
        "Axios",
        "Microfrontend Architecture",
      ],
    },
    {
      name: "Backend & APIs",
      skills: [
        "FastAPI",
        "Python",
        "Node.js",
        "Express.js",
        "Django",
        "C# / ASP.NET",
        "REST API design",
        "GraphQL",
      ],
    },
    {
      name: "AI / GenAI",
      skills: [
        "Claude API",
        "LangGraph (multi-node agents)",
        "MCP (Model Context Protocol)",
        "AI agents",
        "Prompt engineering",
        "Agentic workflows",
        "LLM integration",
      ],
    },
    {
      name: "Databases",
      skills: ["MongoDB", "Snowflake", "MySQL", "Firebase"],
    },
    {
      name: "DevOps & Infra",
      skills: [
        "Docker",
        "Git",
        "GitHub",
        "CI/CD",
        "GitHub Actions",
        "Portainer",
        "VPS deployment",
        "Vercel",
        "Railway",
        "Heroku",
        "Netlify",
        "Postman",
      ],
    },
    {
      name: "Testing & Automation",
      skills: [
        "Jest",
        "React Testing Library",
        "Playwright",
        "Apollo API",
        "HubSpot API",
        "Streamlit",
      ],
    },
  ] satisfies SkillCategory[],

  // ---------- Experience ----------
  experience: [
    {
      role: "Full Stack Engineer / AI Software Engineer",
      company: "Data Alpha AI",
      companyUrl: ["https://dataalpha.ai/", "https://dalabs.ai/"],
      start: "Dec 2025",
      end: "Present",
      bullets: [
        "Delivered four production AI products — portfolio analytics, financial-data infrastructure, natural-language BI, and go-to-market automation — taking each end-to-end from requirements through Docker/VPS deployment, adopted by internal teams and used in client demonstrations.",
        "Owned the full stack per product: React/Vite frontends, FastAPI/Python backends, Claude API orchestration, and release via Docker and Portainer/VPS — idea to working demo in days, not weeks.",
        "Translated business requirements from leadership into working AI proofs-of-concept, enabling client-facing demonstrations and reducing manual effort on portfolio review, lead qualification, and reporting tasks.",
      ],
      linkedSection: { label: "See the products below", href: "#projects" },
    },
    {
      role: "Front-End Developer",
      company: "Paisalo Digital Limited",
      companyUrl: "https://www.paisalo.in/",
      start: "Jan 2024",
      end: "Dec 2025",
      bullets: [
        "Built and structured a new ERP system in React.js, Three.js, and .NET REST APIs, delivering multiple internal modules with a reusable UI component library.",
        "Shipped production school websites (Delhi Public School Rajnagar (Ghaziabad), Delhi Public School Taj City (Agra), and Delhi Public School Agra) on the same React/.NET stack.",
        "Integrated SQL databases and .NET backend services; collaborated cross-functionally to ship features on schedule.",
      ],
      linkedSection: { label: "See the products below", href: "#projects" },
    },
    {
      role: "Web Developer",
      company: "AeroTrav",
      companyUrl: "https://aerotrav.com/?cur=INR",
      start: "Jun 2023",
      end: "Dec 2023",
      bullets: [
        "Designed and built a flight-booking platform in React.js and React Native, integrating Stripe and Razorpay payment gateways.",
        "Owned frontend architecture and cross-platform UX consistency within a cross-functional product team.",
      ],
    },
    {
      role: "Full Stack Web Developer Intern",
      company: "NullClass",
      start: "Oct 2022",
      end: "Apr 2023",
      bullets: [
        "Shipped 3+ web applications in React.js with responsive UIs built in Figma, Material UI, and Tailwind CSS.",
      ],
    },
  ] satisfies Experience[],

  // ---------- Education ----------
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Lal Bahadur Shastri Institute of Management, Delhi",
      start: "2020",
      end: "2022",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "Shree Guru Gobind Singh Tricentenary University, Haryana",
      start: "2017",
      end: "2020",
    },
  ],

  // ---------- Projects ----------
  projects: [
    {
      title: "Nexus AI v2",
      tagline: "Agentic Portfolio Rebalancing Platform",
      description:
        "An 11-node LangGraph state machine that ingests portfolio CSVs, pulls live prices and 7/30-day trends from Yahoo Finance, aggregates sector news via a 3-tier source fallback (Event Registry → Finnhub → mock), and uses Claude for 5-level sentiment classification. Fuses return, sentiment, trend, allocation, and risk into a weighted 0–100 composite driving a 7-action recommendation engine (Strong Buy → Strong Sell). Shipped across CLI, FastAPI, and a React dashboard.",
      stack: ["LangGraph", "FastAPI", "React/Vite", "Claude", "yfinance"],
      liveUrl: undefined, // TODO(saurav)
      repoUrl: undefined, // TODO(saurav)
      featured: true,
    },
    {
      title: "Local Stock Analyst",
      tagline: "Financial-Data MCP Server",
      description:
        "A Model Context Protocol server exposing 50+ financial-analysis tools across 9 domains (market, stocks, technical, fundamental, options, risk, news, screener, portfolio), backed by 10 fallback-routed data providers including Finnhub, Alpha Vantage, FMP, and SEC EDGAR. Added in-memory TTL caching, per-provider rate-limit guards, and dual stdio/HTTP transport for Render deployment.",
      stack: ["Python", "MCP", "10 data providers"],
      liveUrl: undefined, // TODO(saurav)
      repoUrl: undefined, // TODO(saurav)
      featured: true,
    },
    {
      title: "GTM Intelligence Platform",
      tagline: "Scraping & Enrichment Pipeline",
      description:
        "Automated a marketing team's lead research with a 3-tier scraper (httpx + BeautifulSoup → deep-link scan → headless Playwright) and a 6-source fallback waterfall (Bing, Brave, DuckDuckGo, team-page, Tavily, Apollo) for company LinkedIn/website resolution. Scores and ranks decision-maker profiles, enriches verified work email and direct dial via Apollo, and syncs qualified contacts into HubSpot CRM.",
      stack: ["Python", "Playwright", "Apollo API", "HubSpot"],
      liveUrl: undefined, // TODO(saurav)
      repoUrl: undefined, // TODO(saurav)
      featured: true,
    },
    {
      title: "AI-Powered Snowflake Dashboard Generator",
      tagline: "Natural-language analytics over Snowflake",
      description:
        "Users describe a chart in plain English, Claude generates the SQL, and the app validates it, auto-corrects on failure, and renders interactive charts. Includes a data-assistant chatbot, MFA-secured auth, SQL-injection guardrails, TOML-driven per-database semantic layers, and a production Docker deployment on Portainer.",
      stack: ["Streamlit", "Claude", "Snowflake", "Docker"],
      liveUrl: undefined, // TODO(saurav)
      repoUrl: undefined, // TODO(saurav)
      featured: true,
    },
    // Secondary/employer-context projects — real, well-scoped work from
    // Paisalo and AeroTrav that sits alongside the personal/AI projects
    // above so recruiters see production employer work too.
    {
      title: "Internal ERP Platform",
      tagline: "Enterprise ERP — Paisalo Digital Limited",
      description:
        "Built and structured a new ERP system from scratch in React.js, Three.js, and .NET REST APIs, shipping multiple internal modules on top of a reusable UI component library used across the platform. Also integrated SQL databases and .NET backend services in collaboration with cross-functional teams to hit release schedules.",
      stack: ["React.js", "Three.js", ".NET", "SQL"],
      liveUrl: "https://erp.paisalo.in:981/LOS/",
      liveLabel: "Login portal",
      featured: false,
    },
    {
      title: "Delhi Public School Rajnagar",
      tagline: "School website — Paisalo Digital Limited",
      description:
        "Production school website built on the same React/.NET stack as the Paisalo ERP system, delivered as part of my role at Paisalo Digital Limited.",
      stack: ["React.js", ".NET"],
      liveUrl: "https://www.dps.ind.in/",
      featured: false,
    },
    {
      title: "Delhi Public School Taj City",
      tagline: "School website — Paisalo Digital Limited",
      description:
        "Production school website built on the same React/.NET stack as the Paisalo ERP system, delivered as part of my role at Paisalo Digital Limited.",
      stack: ["React.js", ".NET"],
      liveUrl: "https://dpstajcity.in/",
      featured: false,
    },
    {
      title: "Delhi Public School Agra",
      tagline: "School website — Paisalo Digital Limited",
      description:
        "Production school website built on the same React/.NET stack as the Paisalo ERP system, delivered as part of my role at Paisalo Digital Limited.",
      stack: ["React.js", ".NET"],
      liveUrl: "https://www.dps.ac.in/",
      featured: false,
    },
    {
      title: "AeroTrav Flight Booking Platform",
      tagline: "Cross-platform booking & payments",
      description:
        "Designed and built a flight-booking platform in React.js and React Native, integrating Stripe and Razorpay payment gateways for web and mobile. Owned frontend architecture and cross-platform UX consistency within a cross-functional product team.",
      stack: ["React.js", "React Native", "Stripe", "Razorpay"],
      liveUrl: "https://aerotrav.com/?cur=INR",
      featured: false,
    },
  ] satisfies Project[],

  // ---------- Freelance (rendered on /freelance) ----------
  freelanceProjects: [
    {
      title: "Tripime",
      blurb: "TODO(saurav): one or two lines on what Tripime does and who it was built for.",
      stack: ["TypeScript"],
      liveUrl: "https://tripime.netlify.app/",
      repoUrl: "https://github.com/Sauravmehto/Tripime",
    },
    {
      title: "The Nuzz Story",
      blurb: "TODO(saurav): one or two lines on what The Nuzz Story is and who it was built for.",
      stack: ["TypeScript"],
      liveUrl: "https://thenuzzstory.netlify.app/",
      repoUrl: "https://github.com/Sauravmehto/TheNuzzStory",
    },
    {
      title: "Batterwala",
      tagline: "Fresh. Pure. Traditional.",
      blurb:
        "A D2C landing page for a homemade idli & dosa batter brand — hero section with product highlights, trust badges (Fresh Daily, No Preservatives, Natural, Premium), a product showcase card, and customer ratings, built to drive online orders.",
      stack: ["TODO(saurav) — confirm actual stack used"],
      liveUrl: "https://batterwalain.netlify.app/",
      // no repoUrl: no public repo on GitHub as of Sep 2026
    },
  ] satisfies FreelanceProject[],

  // ---------- Playground ----------
  // Public repos shown in Playground, in this order. Language, stars,
  // description, and last-push date are pulled live from the GitHub API
  // (refreshed hourly), so editing a repo's description on GitHub updates
  // the site too.
  // TODO(saurav): confirm this selection — picked as the most substantive
  // non-freelance repos on your profile as of Sep 2026.
  githubRepos: [
    "LinkedinScraper",
    "courier-management-system-Fullstack",
    "ssmpanelbackend",
  ],

  // ---------- Contact ----------
  // TODO(saurav): Calendly / Cal.com link for "Book a call". The button is
  // hidden while this is empty.
  bookingUrl: "",

  // ---------- Testimonials ----------
  // Off until real quotes exist: while false, the section isn't rendered and
  // its nav / ⌘K entries are removed, so nothing links to a missing section.
  // TODO(saurav): replace the placeholder below with real quotes from
  // managers/colleagues/clients, then flip this to true.
  testimonialsEnabled: false,
  testimonials: [
    {
      quote:
        "Example placeholder — replace with a real quote before launch.",
      name: "Placeholder Name",
      role: "Placeholder Role, Company",
    },
  ] satisfies Testimonial[],

  // ---------- Theming ----------
  accentColor: "#915EFF",
} as const;

// Used by the Nav and the ⌘K command palette. Kept separate from siteConfig
// since it's page structure, not resume content. "#..." hrefs are homepage
// sections; "/..." hrefs are standalone routes.
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Playground", href: "#playground" },
  ...(siteConfig.testimonialsEnabled
    ? [{ label: "Testimonials", href: "#testimonials" }]
    : []),
  { label: "Contact", href: "#contact" },
  { label: "Freelance", href: "/freelance" },
];

export default siteConfig;
