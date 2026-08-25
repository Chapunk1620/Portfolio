export type ProjectFeature = {
  icon: string;
  title: string;
  description: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectCaseStudy = {
  title: string;
  tech: string[];
  description: string;
  details: string;
  screenshot: string;
  screenshots: string[];
  github: string | null;
  liveDemo?: string;
  role: "Full-Stack Developer";
  impact: string;
  problem: string;
  approach: string;
  architecture: { nodes: string[]; flow: "left-to-right" };
  features: ProjectFeature[];
  metrics: ProjectMetric[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  tech: string[];
  highlight: string;
};

export type SkillMeta = {
  proficiency: "Daily Driver" | "Proficient" | "Familiar";
  projects: number;
};

export const personalInfo = {
  name: "Jhon Christian Solano",
  title: "Full-Stack Developer",
  subtitle: "Results-driven full stack developer building scalable web applications",
  email: "jhonchristiansolano@gmail.com",
  phone: "+639972544866",
  github: "https://github.com/Chapunk1620",
  linkedin: "https://linkedin.com/in/jhon-christian-solano-4818952a4/",
  currentFocus: "Building workflow systems and exploring AI-powered automation",
  availability: "Available for full-time opportunities",
};

export const skills = {
  Languages: ["JavaScript", "Python", "Java", "TypeScript", "C#", "PHP"],
  Frontend: ["React", "Next.js", "HTML", "CSS"],
  Backend: ["Node.js", "Express", "Django", "Laravel"],
  Databases: ["PostgreSQL", "SQLite", "MongoDB", "SQL Server", "MySQL"],
  "DevOps & Tools": ["Git", "Docker", "AWS", "CI/CD"],
  "AI Tools": [
    "Ollama",
    "Gemini",
    "Claude Code",
    "Antigravity",
    "Pi",
    "OpenCode",
    "ChatGPT",
  ],
  Automation: ["n8n"],
};

export const skillMeta: Record<string, SkillMeta> = {
  JavaScript: { proficiency: "Daily Driver", projects: 1 },
  Python: { proficiency: "Proficient", projects: 0 },
  Java: { proficiency: "Familiar", projects: 0 },
  TypeScript: { proficiency: "Daily Driver", projects: 0 },
  "C#": { proficiency: "Familiar", projects: 0 },
  PHP: { proficiency: "Proficient", projects: 1 },
  React: { proficiency: "Daily Driver", projects: 0 },
  "Next.js": { proficiency: "Daily Driver", projects: 4 },
  HTML: { proficiency: "Daily Driver", projects: 0 },
  CSS: { proficiency: "Daily Driver", projects: 0 },
  "Node.js": { proficiency: "Proficient", projects: 0 },
  Express: { proficiency: "Proficient", projects: 0 },
  Django: { proficiency: "Familiar", projects: 0 },
  Laravel: { proficiency: "Daily Driver", projects: 4 },
  PostgreSQL: { proficiency: "Proficient", projects: 0 },
  SQLite: { proficiency: "Familiar", projects: 0 },
  MongoDB: { proficiency: "Proficient", projects: 0 },
  "SQL Server": { proficiency: "Daily Driver", projects: 2 },
  MySQL: { proficiency: "Daily Driver", projects: 3 },
  Git: { proficiency: "Daily Driver", projects: 0 },
  Docker: { proficiency: "Proficient", projects: 0 },
  AWS: { proficiency: "Familiar", projects: 0 },
  "CI/CD": { proficiency: "Familiar", projects: 0 },
  Ollama: { proficiency: "Familiar", projects: 0 },
  Gemini: { proficiency: "Familiar", projects: 0 },
  "Claude Code": { proficiency: "Familiar", projects: 0 },
  Antigravity: { proficiency: "Familiar", projects: 0 },
  Pi: { proficiency: "Familiar", projects: 0 },
  OpenCode: { proficiency: "Familiar", projects: 0 },
  ChatGPT: { proficiency: "Familiar", projects: 0 },
  n8n: { proficiency: "Proficient", projects: 0 },
};

export const skillCategoryDescriptions: Record<string, string> = {
  Languages: "What I think in",
  Frontend: "What users see",
  Backend: "What powers it",
  Databases: "Where data lives",
  "DevOps & Tools": "How I ship",
  "AI Tools": "How I augment my workflow",
  Automation: "How I remove repetition",
};

export const learningItems = ["System Design", "AI Agents", "Cloud Architecture"];

export const experiences: ExperienceItem[] = [
  {
    company: "M.A Technology",
    role: "Full Stack Developer",
    period: "2025 - Current",
    achievements: [
      "Built an admin system for digital employee requests and time tracking, replacing manual workflows",
      "Developed a Bill of Materials (BOM) system for product component management",
      "Implemented SSR and API routes in Next.js, built RESTful APIs with Laravel",
      "Optimized database queries and schema design, improving performance and accuracy",
    ],
    tech: ["Next.js", "Laravel", "SQL Server", "MySQL"],
    highlight: "Replaced manual employee workflows with a digital request and time-tracking system",
  },
  {
    company: "Hayakawa Electronics Corp",
    role: "Full Stack Developer",
    period: "2024 - 2025",
    achievements: [
      "Developed full-stack web applications using React, Laravel, Next.js and Node.js",
      "Improved application performance by 40% through optimization techniques",
      "Built RESTful APIs and integrated third-party services",
      "Built an application that won the company's Kaizen competition",
    ],
    tech: ["React", "Next.js", "Node.js", "Laravel"],
    highlight: "Built an application that won the company's Kaizen competition",
  },
];

export const projects: ProjectCaseStudy[] = [
  {
    title: "Item Borrowing Management System",
    tech: ["Next.js", "Laravel", "MySQL"],
    description:
      "Full-stack system to track and manage company asset borrowing with real-time status updates, in-app chat, notifications, and user activity tracking.",
    details:
      "A comprehensive asset management platform that allows employees to request, track, and return company assets. Features include real-time borrowing status, in-app messaging between requestors and approvers, push notifications for approval updates, and complete audit logging of all asset movements.",
    screenshot: "/projects/item-borrowing.png",
    screenshots: ["/projects/item-borrowing.png"],
    github: "https://github.com/Chapunk1620/techLoan",
    role: "Full-Stack Developer",
    impact: "Digitized company asset requests, approvals, and returns in one workflow",
    problem:
      "Employees and approvers needed a reliable way to track borrowed company assets and communicate about requests without relying on disconnected manual updates.",
    approach:
      "Built a full-stack workflow with Next.js, Laravel, and MySQL, combining status tracking, in-app communication, notifications, and audit history in one platform.",
    architecture: {
      nodes: ["Next.js Frontend", "Laravel API", "MySQL Database"],
      flow: "left-to-right",
    },
    features: [
      { icon: "↔", title: "Status Tracking", description: "Follow each request from approval through return." },
      { icon: "💬", title: "In-App Chat", description: "Keep requestors and approvers in the same workflow." },
      { icon: "🔔", title: "Notifications", description: "Surface approval and status updates in context." },
      { icon: "▣", title: "Audit History", description: "Track asset movements and user activity." },
    ],
    metrics: [
      { value: "Real-time", label: "request status updates" },
      { value: "4", label: "workflow capabilities" },
    ],
  },
  {
    title: "Point of Sale (POS) System",
    tech: ["Next.js", "Laravel", "MySQL"],
    description:
      "POS system to record and manage company purchases with structured approval workflows and notification system.",
    details:
      "A digital point-of-sale and purchase management system that streamlines the entire procurement workflow. Includes product catalog management, shopping cart functionality, multi-level approval workflows, purchase order generation, and real-time notification updates for all stakeholders.",
    screenshot: "/projects/pos.png",
    screenshots: ["/projects/pos.png"],
    github: "https://github.com/Chapunk1620/POSystem",
    role: "Full-Stack Developer",
    impact: "Centralized purchase recording and multi-level approval workflows",
    problem:
      "Company purchases needed a structured process for catalog selection, approval, purchase orders, and status communication across stakeholders.",
    approach:
      "Created a Next.js and Laravel procurement workflow with catalog management, cart functionality, multi-level approvals, purchase order generation, and notifications.",
    architecture: {
      nodes: ["Next.js Frontend", "Laravel API", "MySQL Database"],
      flow: "left-to-right",
    },
    features: [
      { icon: "▦", title: "Product Catalog", description: "Organize purchasable items in a central catalog." },
      { icon: "🛒", title: "Shopping Cart", description: "Collect requested items before submitting a purchase." },
      { icon: "✓", title: "Approval Workflow", description: "Route purchases through multiple approval levels." },
      { icon: "🔔", title: "Notifications", description: "Keep stakeholders informed as purchases progress." },
    ],
    metrics: [
      { value: "Multi-level", label: "approval workflow" },
      { value: "Real-time", label: "purchase notifications" },
    ],
  },
  {
    title: "Plant Mapping System",
    tech: ["PHP", "JavaScript", "MySQL"],
    description:
      "Full-stack plant mapping system with interactive geolocation features and dynamic map visualization.",
    details:
      "An interactive geographic information system that maps and visualizes plant locations across a facility. Integrates mapping APIs to display interactive maps with plant markers, provides detailed plant information on click, and supports filtering and search functionality for easy navigation.",
    screenshot: "/projects/plant-mapping.png",
    screenshots: ["/projects/plant-mapping.png"],
    github: null,
    role: "Full-Stack Developer",
    impact: "Turned facility plant locations into an interactive, searchable map",
    problem:
      "Plant locations and related details needed to be easier to explore than static or disconnected records across a facility.",
    approach:
      "Built an interactive PHP and JavaScript mapping experience backed by MySQL, with geolocation markers, searchable details, and filters for navigation.",
    architecture: {
      nodes: ["JavaScript Map UI", "PHP Backend", "MySQL Database"],
      flow: "left-to-right",
    },
    features: [
      { icon: "⌖", title: "Map Visualization", description: "See plant locations through an interactive facility map." },
      { icon: "●", title: "Plant Markers", description: "Open detailed information directly from map locations." },
      { icon: "⌕", title: "Search", description: "Find plants and locations without manual browsing." },
      { icon: "≡", title: "Filtering", description: "Narrow the map view to relevant plant records." },
    ],
    metrics: [
      { value: "Interactive", label: "facility map" },
      { value: "Searchable", label: "plant records" },
    ],
  },
  {
    title: "Bill of Materials (BOM) System",
    tech: ["Next.js", "Laravel", "SQL Server"],
    description:
      "BOM system to manage product components and material requirements, centralizing data for improved tracking.",
    details:
      "A centralized Bill of Materials management system that organizes product components, raw materials, and sub-assemblies. Features include hierarchical BOM structures, material requirement planning, cost tracking per component, version control for BOM revisions, and integration with inventory data.",
    screenshot: "/projects/bom.png",
    screenshots: ["/projects/bom.png"],
    github: "https://github.com/Chapunk1620/BOMSystem",
    role: "Full-Stack Developer",
    impact: "Centralized product components and material requirements for improved tracking",
    problem:
      "Product components, raw materials, and sub-assemblies needed a single structured source for planning, tracking, and revision management.",
    approach:
      "Developed a Next.js and Laravel system backed by SQL Server to organize hierarchical BOM data, material requirements, component costs, and revisions.",
    architecture: {
      nodes: ["Next.js Frontend", "Laravel API", "SQL Server Database"],
      flow: "left-to-right",
    },
    features: [
      { icon: "⌘", title: "Hierarchical BOMs", description: "Represent products, components, and sub-assemblies together." },
      { icon: "▤", title: "Material Planning", description: "Organize material requirements around each product." },
      { icon: "₱", title: "Cost Tracking", description: "Track costs at the component level." },
      { icon: "↻", title: "Version Control", description: "Manage revisions as BOM structures evolve." },
    ],
    metrics: [
      { value: "Centralized", label: "BOM data" },
      { value: "Versioned", label: "product revisions" },
    ],
  },
  {
    title: "Admin Request & Workflow System",
    tech: ["Next.js", "Laravel", "SQL Server"],
    description:
      "Admin system digitizing employee form requests and time tracking with automated approval workflows.",
    details:
      "A digital transformation platform that replaced paper-based employee request forms and manual time tracking. Enables employees to submit various request types digitally, log working hours with automatic calculation, track approval status in real-time, and generates automated reports for HR and management.",
    screenshot: "/projects/admin-workflow.png",
    screenshots: ["/projects/admin-workflow.png"],
    github: "https://github.com/Chapunk1620/administrativeSystem",
    role: "Full-Stack Developer",
    impact: "Replaced paper-based employee requests and manual time tracking",
    problem:
      "Employee requests and working-hour records relied on paper forms and manual tracking, making approvals and reporting harder to follow.",
    approach:
      "Digitized request submission, working-hour logging, automatic calculations, approval status, and reporting with Next.js, Laravel, and SQL Server.",
    architecture: {
      nodes: ["Next.js Frontend", "Laravel API", "SQL Server Database"],
      flow: "left-to-right",
    },
    features: [
      { icon: "▤", title: "Digital Requests", description: "Submit different employee request types in one system." },
      { icon: "◷", title: "Time Tracking", description: "Log working hours with automatic calculations." },
      { icon: "✓", title: "Approvals", description: "Track request status through an automated workflow." },
      { icon: "▥", title: "Reports", description: "Generate records for HR and management review." },
    ],
    metrics: [
      { value: "Digital", label: "employee requests" },
      { value: "Automated", label: "approval workflow" },
    ],
  },
];
