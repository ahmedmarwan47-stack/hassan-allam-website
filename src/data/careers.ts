// Careers listings — draft copy written for the Figma pages (17135:1344 list,
// 17136:1642 single). Replace with the real openings before launch.

export type Department =
  | "Sales"
  | "Engineering"
  | "Marketing"
  | "Finance"
  | "Customer Experience";

export const DEPARTMENTS: Department[] = [
  "Sales",
  "Engineering",
  "Marketing",
  "Finance",
  "Customer Experience",
];

export type Job = {
  slug: string;
  title: string;
  department: Department;
  location: string;
  type: "Full-time" | "Internship";
  experience: string;
  /** Display date, e.g. "20 Oct 2026". */
  posted: string;
  lead: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
};

/** Shared across every role — the "What we offer" block. */
export const OFFER: string[] = [
  "Competitive package and performance bonus",
  "Medical and life insurance for you and your family",
  "Continuous learning and professional development programmes",
  "The chance to shape communities thousands of families call home",
];

export const JOBS: Job[] = [
  {
    slug: "senior-sales-executive",
    title: "Senior Sales Executive",
    department: "Sales",
    location: "New Cairo HQ",
    type: "Full-time",
    experience: "5+ years",
    posted: "22 Oct 2026",
    lead: "Guide families through one of the biggest decisions of their lives — finding the right HAP home.",
    about:
      "As Senior Sales Executive you will manage a portfolio of clients from first enquiry to contract, presenting our communities in the city and by the sea and building relationships that last well beyond handover.",
    responsibilities: [
      "Manage leads and client relationships from first visit to signed contract",
      "Present projects, floor plans and payment plans with clarity and confidence",
      "Meet and exceed monthly and quarterly sales targets",
      "Coordinate with marketing and customer experience on campaigns and events",
      "Keep the CRM accurate and up to date",
    ],
    requirements: [
      "Bachelor’s degree in business or a related field",
      "5+ years in real-estate or luxury sales",
      "Strong negotiation and presentation skills",
      "Excellent communication in Arabic and English",
    ],
  },
  {
    slug: "project-manager-residential",
    title: "Project Manager — Residential",
    department: "Engineering",
    location: "SwanLake Residences, New Cairo",
    type: "Full-time",
    experience: "8+ years",
    posted: "20 Oct 2026",
    lead: "Lead the delivery of a flagship residential phase at SwanLake Residences — from design coordination to handover.",
    about:
      "As Project Manager you will own the end-to-end delivery of a residential phase, working alongside design consultants, contractors and our internal sales and customer experience teams to make sure every home is delivered on time, on budget and to the standard our families expect.",
    responsibilities: [
      "Plan and manage project scope, schedule and budget from design development through handover",
      "Coordinate consultants, main contractors and sub-contractors on site",
      "Track progress, cost and quality, reporting regularly to senior management",
      "Identify risks early and drive solutions across teams",
      "Ensure all works comply with HAP quality, health & safety standards",
    ],
    requirements: [
      "BSc in Civil or Architectural Engineering",
      "8+ years of experience, with at least 4 in residential project management",
      "Proven record of delivering projects of comparable scale",
      "Strong command of Primavera P6 and MS Project",
      "Excellent communication in Arabic and English",
    ],
  },
  {
    slug: "site-engineer-civil",
    title: "Site Engineer (Civil)",
    department: "Engineering",
    location: "Mostakbal City",
    type: "Full-time",
    experience: "3+ years",
    posted: "18 Oct 2026",
    lead: "Bring our Mostakbal City communities to life on site, one milestone at a time.",
    about:
      "You will supervise day-to-day civil works on site, making sure contractors build to drawings, specification and schedule while keeping safety at the centre of everything we do.",
    responsibilities: [
      "Supervise civil and structural works against approved drawings",
      "Review contractor method statements and inspection requests",
      "Track quantities and progress for weekly reporting",
      "Raise and close out quality and safety observations",
    ],
    requirements: [
      "BSc in Civil Engineering",
      "3+ years of site experience on residential or mixed-use projects",
      "Working knowledge of AutoCAD and quantity take-off",
      "Valid driving licence",
    ],
  },
  {
    slug: "digital-marketing-manager",
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "New Cairo HQ",
    type: "Full-time",
    experience: "6+ years",
    posted: "15 Oct 2026",
    lead: "Tell the story of HAP’s communities across every digital channel.",
    about:
      "You will lead our digital presence — performance campaigns, social, web and CRM — turning launches and community moments into qualified leads for the sales team.",
    responsibilities: [
      "Own the digital marketing plan and budget across paid and owned channels",
      "Manage agencies and in-house content production",
      "Report on lead quality, cost per lead and conversion",
      "Work with sales to refine targeting and follow-up journeys",
    ],
    requirements: [
      "6+ years in digital marketing, ideally in real estate or luxury",
      "Hands-on experience with Meta, Google Ads and analytics tools",
      "Strong data and storytelling skills",
      "Excellent written Arabic and English",
    ],
  },
  {
    slug: "senior-financial-analyst",
    title: "Senior Financial Analyst",
    department: "Finance",
    location: "New Cairo HQ",
    type: "Full-time",
    experience: "5+ years",
    posted: "12 Oct 2026",
    lead: "Turn project and sales data into the insight that guides how we grow.",
    about:
      "You will build the financial models, forecasts and reports that support project feasibility, budgeting and executive decision-making across the portfolio.",
    responsibilities: [
      "Build and maintain project feasibility and cash-flow models",
      "Prepare monthly management reports and variance analysis",
      "Support the annual budgeting and forecasting cycle",
      "Partner with project and sales teams on pricing and payment-plan scenarios",
    ],
    requirements: [
      "Bachelor’s degree in Finance or Accounting; CFA or CMA a plus",
      "5+ years in FP&A, ideally in real estate",
      "Advanced Excel and financial-modelling skills",
    ],
  },
  {
    slug: "customer-experience-specialist",
    title: "Customer Experience Specialist",
    department: "Customer Experience",
    location: "New Cairo HQ",
    type: "Full-time",
    experience: "2+ years",
    posted: "10 Oct 2026",
    lead: "Be the voice our homeowners trust, from contract to keys and beyond.",
    about:
      "You will look after homeowners throughout their journey with HAP — answering questions, following up on requests and making sure every interaction reflects the care we put into our communities.",
    responsibilities: [
      "Handle homeowner enquiries by phone, email and the HAP Family App",
      "Follow up on service requests until they are resolved",
      "Support handover appointments and community events",
      "Log feedback and suggest service improvements",
    ],
    requirements: [
      "2+ years in a customer-facing role",
      "Calm, empathetic and well organised",
      "Excellent communication in Arabic and English",
    ],
  },
  {
    slug: "community-manager",
    title: "Community Manager",
    department: "Customer Experience",
    location: "SwanLake El Gouna",
    type: "Full-time",
    experience: "5+ years",
    posted: "8 Oct 2026",
    lead: "Make SwanLake El Gouna feel like home for every family who lives there.",
    about:
      "You will run day-to-day community life at SwanLake El Gouna — facilities, services, events and homeowner relations — working closely with our facility management partners.",
    responsibilities: [
      "Oversee facility management and service providers on site",
      "Plan seasonal events and resident activities",
      "Act as the main point of contact for homeowners",
      "Track service levels and community budgets",
    ],
    requirements: [
      "5+ years in hospitality, community or facility management",
      "Strong leadership and problem-solving skills",
      "Willingness to be based in El Gouna",
    ],
  },
  {
    slug: "architecture-intern",
    title: "Architecture Intern",
    department: "Engineering",
    location: "New Cairo HQ",
    type: "Internship",
    experience: "Students & fresh graduates",
    posted: "5 Oct 2026",
    lead: "Spend six months inside the team designing HAP’s next communities.",
    about:
      "You will support our design team on concept studies, presentation drawings and coordination with consultants — and see first-hand how a community goes from sketch to site.",
    responsibilities: [
      "Prepare drawings, diagrams and presentation boards",
      "Build 3D massing and visualisation models",
      "Join design reviews and site visits",
    ],
    requirements: [
      "Final-year student or recent graduate in Architecture",
      "Good command of AutoCAD, Revit or Rhino and the Adobe suite",
      "A portfolio showing your design thinking",
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return JOBS.find((j) => j.slug === slug);
}
