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
  /** "How it works" steps; when set, the card flips to show them on its back. */
  flow?: { step: string; detail: string }[];
  /** Public MCP endpoint, shown with a copy button for MCP clients. */
  mcpUrl?: string;
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
  /** Homepage screenshot, cropped to 2.05:1 (1280×624). */
  image?: string;
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
  avatarUrl: "/sauravimage.png",
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
      title: "Private Credit AI Agent",
      tagline: "Private Credit Intelligence Platform",
      description:
        "Portfolio analytics for venture debt and private credit. Upload a deal tape and Python calculates every deal's IRR, MOIC, amortization schedule and restructure scenarios. A LangGraph agent with 21 finance tools explains the results in plain English, calling the tools instead of inventing the figures.",
      stack: ["React", "FastAPI", "LangGraph", "Claude API", "MongoDB"],
      liveUrl: "https://privatecreditnexusai.netlify.app/",
      repoUrl: "https://github.com/Sauravmehto/Private_Credit_Nexus_AI_AGENT",
      // TODO(saurav): returns 404 as of Oct 2026 (Render reports no service at this host)
      mcpUrl: "https://privatecreaditaiagentnexus.onrender.com/mcp",
      image: "/projects/private-credit-ai-agent.webp",
      flow: [
        {
          step: "Upload a deal tape",
          detail: "Drop in an Excel, CSV or JSON file, load one from a URL, or pick one of five sample portfolios with fictional companies.",
        },
        {
          step: "Normalize the deals",
          detail: "The backend finds the right sheet and header row, matches column aliases like \"Coupon\" or \"Tenor\", and names any missing columns.",
        },
        {
          step: "Calculate in Python",
          detail: "Monthly cash flows give each deal's IRR, MOIC, a basis-point breakdown of coupon, fees and PIK, and a dated payment schedule.",
        },
        {
          step: "Stress-test",
          detail: "Eight preset restructure scenarios plus a custom one reprice the deal and chart every IRR against the base case.",
        },
        {
          step: "Ask the AI analyst",
          detail: "A LangGraph agent picks from 21 finance tools and writes up the answer. Every tool call shows its inputs, output and time, with Claude falling back to OpenAI, Gemini or Groq.",
        },
      ],
      featured: true,
    },
    {
      title: "Stockportflio AI Agent",
      tagline: "Stock Research & Portfolio Intelligence",
      description:
        "Stock research and portfolio rebalancing where every figure carries its source and timestamp. An 11-node LangGraph agent scores each holding on returns, trend, sector allocation and news sentiment, then recommends Buy, Hold or Sell with reasons. Claude interprets only the evidence retrieved, and never supplies prices or news itself.",
      stack: ["LangGraph", "FastAPI", "React", "Claude API", "Finnhub"],
      liveUrl: "https://stocksportflioaiagent.netlify.app/",
      repoUrl: "https://github.com/Sauravmehto/Stockportflio-AI",
      image: "/projects/stockportflio-ai.webp",
      flow: [
        {
          step: "Load a portfolio or ticker",
          detail: "Upload holdings as a CSV for rebalancing, or look up a single ticker for stock analysis.",
        },
        {
          step: "Gather market data",
          detail: "Quotes and fundamentals come from Finnhub, with Yahoo Finance as the fallback and the source of price history. Every quote is labelled with its source and time.",
        },
        {
          step: "Collect the news",
          detail: "Headlines are pulled from Event Registry, then Finnhub, then NewsData.io until enough stories are found, and de-duplicated. If none return, the report says so.",
        },
        {
          step: "Score each holding",
          detail: "The 11-step LangGraph agent analyses trends, classifies sentiment and checks sector allocation against targets.",
        },
        {
          step: "Recommend and explain",
          detail: "It recommends Buy, Hold or Sell per holding, and Claude explains why using only the retrieved data. Results export as a report or CSV.",
        },
      ],
      featured: true,
    },
    {
      title: "LeadPipe",
      tagline: "Lead Intelligence Pipeline",
      description:
        "Turns a spreadsheet of companies into a ranked, contact-enriched list of decision makers. A 3-tier scraper plus a 6-source fallback waterfall resolves each company's LinkedIn page, then a second waterfall finds and scores senior people, enriches verified work email and direct dial via Apollo, and exports a HubSpot-ready report.",
      stack: ["Python", "FastAPI", "React", "Playwright", "Apollo API"],
      liveUrl: "https://leadpipe.onrender.com/",
      repoUrl: "https://github.com/Sauravmehto/leadpipe",
      image: "/projects/leadpipe.webp",
      flow: [
        {
          step: "Upload a company list",
          detail: "Drop in an .xlsx with an Official Website column, up to 500 companies per job.",
        },
        {
          step: "Find each company's LinkedIn page",
          detail: "3 scraping tiers (HTML parse → deep links → headless Playwright) plus a fallback waterfall of team pages, Tavily and Apollo resolve and score every candidate URL.",
        },
        {
          step: "Find decision makers",
          detail: "Team pages, Serper, Apollo and Tavily searches run only as needed, then every profile is scored 0–100 on role, seniority and company match.",
        },
        {
          step: "Enrich contacts",
          detail: "Apollo adds verified work email, direct dial and HQ phone to the top-ranked profiles per company.",
        },
        {
          step: "Review and export",
          detail: "Watch progress live, edit results in the browser, then export a HubSpot-import-ready Excel report or sync straight to HubSpot CRM.",
        },
      ],
      featured: true,
    },
    {
      title: "DA One",
      tagline: "Natural-Language BI Platform",
      description:
        "Ask questions of a Snowflake warehouse or uploaded spreadsheets and documents in plain English. A streaming Claude agent chooses its own tools — read-only SQL validated before it runs, document search, charting — to answer, build and save dashboards, and generate Excel reports from a template. Signs in with Snowflake OAuth and keeps a versioned semantic layer and audit trail.",
      stack: ["React", "FastAPI", "Claude API", "Snowflake", "DuckDB"],
      liveUrl: "https://one-dev.dataalpha.in/login",
      repoUrl: "https://github.com/Sauravmehto/Da_One_AI_Report_Snowflake",
      image: "/projects/da-one.webp",
      flow: [
        {
          step: "Sign in",
          detail: "Snowflake OAuth, or email and password in development, provisioned by an administrator.",
        },
        {
          step: "Pick a source",
          detail: "Choose a Snowflake database the signed-in role can see, or upload spreadsheets, PDFs and Word docs to chat against instead.",
        },
        {
          step: "Ask in chat",
          detail: "A streaming Claude agent picks its own tools: validated read-only SQL, document search, or a chart.",
        },
        {
          step: "Plan and save",
          detail: "Dashboard plans are validated and cached, then saved as a versioned row in Snowflake when they look right.",
        },
        {
          step: "Export",
          detail: "Open a saved dashboard, export it to PDF, or run an Excel template report bound to live SQL.",
        },
      ],
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
      image: "/freelance/tripime.webp",
    },
    {
      title: "The Nuzz Story",
      blurb: "TODO(saurav): one or two lines on what The Nuzz Story is and who it was built for.",
      stack: ["TypeScript"],
      liveUrl: "https://thenuzzstory.netlify.app/",
      repoUrl: "https://github.com/Sauravmehto/TheNuzzStory",
      image: "/freelance/thenuzzstory.webp",
    },
    {
      title: "Batterwala",
      tagline: "Fresh. Pure. Traditional.",
      blurb:
        "A D2C landing page for a homemade idli & dosa batter brand — hero section with product highlights, trust badges (Fresh Daily, No Preservatives, Natural, Premium), a product showcase card, and customer ratings, built to drive online orders.",
      stack: ["TODO(saurav) — confirm actual stack used"],
      liveUrl: "https://batterwalain.netlify.app/",
      image: "/freelance/batterwala.webp",
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
