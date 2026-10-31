// "The People Behind HAP" — names, roles, bios and portraits as published on
// hap.com.eg/the-story (portraits downloaded to public/images/team).

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Lead paragraph — shown large in the drawer. */
  intro: string;
  /** Remaining bio paragraphs. */
  body: string[];
}

export const TEAM: TeamMember[] = [
  {
    slug: "mohamed-allam",
    name: "Mohamed Allam",
    role: "Vice Chairman & CEO",
    image: "/images/team/mohamed-allam.jpg",
    intro:
      "Capitalizing on my great passion for Real Estate, Architecture & Landscaping, I managed to grow the business and position Hassan Allam Properties (HAP) among the most prominent and prestigious Real-Estate developers in Egypt, with a proven track record and a solid nation-wide portfolio of mixed use developments and seaside resorts. I'm consistently keen to partner with leading local and global industry players across the value chain to maintain the quality and positioning HAP is known for.",
    body: [
      "In my capacity as the Vice Chairman & CEO for HAP, I subsequently hold CEO position for all of HAP subsidiaries.",
      "I also serve on the board of Hassan Allam Holding.",
      "My diversified investment portfolio extends to include Chairman position at Prime Estates International and a board member at Dawi Clinics, ACT Financials, GraySkies Invest, among others.",
      "I'm also a member at the Canadian Egypt Business Council (CEBC), Egyptian Businessmen Association (EBA), The American Chamber of Commerce in Egypt (AMCHAM) and a board member at the Egyptian Real-Estate Council and the Egyptian Center for Economic Studies (ECSE).",
    ],
  },
  {
    slug: "amr-gad",
    name: "Amr Gad",
    role: "MD Operations",
    image: "/images/team/amr-gad.jpg",
    intro:
      "Amr Gad, Managing Director of Hassan Allam Properties, joined the management team in 2015. He oversees all company operations in Egypt, as well as ongoing expansion plans. Amr brings extensive hands-on experience in residential, commercial, and luxury hospitality construction, with a strong portfolio of mega-projects in Egypt, including Marassi North Coast and Uptown Cairo, as well as in the UAE, such as Emirates Palace Hotel in Abu Dhabi and the Shoreline Residences in Palm Jumeirah, Dubai.",
    body: [
      "His proven expertise in gated communities and waterfront developments enables the company to consistently meet client expectations. Since joining Hassan Allam Properties, Amr has successfully led the construction and delivery of more than 5,000 units across East Cairo, West Cairo, the North Coast, and the Red Sea.",
      "Amr holds a Bachelor of Science in Construction Engineering and Management, with a minor in Business Administration, from The American University in Cairo. He is also certified as a Project Management Professional (PMP) by the Project Management Institute (PMI).",
    ],
  },
  {
    slug: "hussein-sheir",
    name: "Hussein Sheir",
    role: "MD Development",
    image: "/images/team/hussein-sheir.jpg",
    intro:
      "Hussein Sheir is the Managing Director-Developments at Hassan Allam Properties. In this role, Hussein oversees the full development cycle across the company’s portfolio; from concept and planning to delivery, driving projects that embody the company’s commitment to quality, sustainability and community value. With a visionary approach to design and development, Hussein is recognized as a leading figure in Egypt’s real estate industry.",
    body: [
      "Hussein holds a Bachelor of Science in Architecture and Design and has built a career defined by innovation, strategic foresight, and architectural excellence. Prior to joining Hassan Allam Properties, Hussein held senior leadership roles in the real estate industry across Egypt and Saudi Arabia, where he led the full development cycle while ensuring profitability and operational excellence across a diversified portfolio of projects including several integrated residential and coastal developments.",
    ],
  },
  {
    slug: "ashraf-hamdy",
    name: "Ashraf Hamdy",
    role: "Group Chief Financial Officer",
    image: "/images/team/ashraf-hamdy.jpg",
    intro:
      "Ashraf Hamdy Kamal is the Chief Financial Officer and Board Director at Hassan Allam Properties. With over 25 years of professional experience, Ashraf has led finance operations and transformation across the MENA region building a strong track record in IPO, fundraising, finance transformation, ERP implementation, and corporate governance.",
    body: [
      "Ashraf holds an MBA from IBAS Switzerland and a Bachelor of Commerce in Accounting (DGCI – French Department) from Ain Shams University. He began his career as an auditor at Ernst & Young, where he developed a strong foundation in financial reporting, governance, and advisory. Throughout his career, Ashraf has held several senior finance leadership roles, driving growth, operational excellence and long-term value creation. Prior to joining Hassan Allam Properties, he served as Chief Financial Officer within leading organizations including SODIC, Macro Group Pharmaceuticals, Orascom Development Holding (Morocco) and JPTD where he led major transformations and initiatives.",
    ],
  },
  {
    slug: "sally-hussein",
    name: "Sally Hussein",
    role: "Chief Human Resources Officer",
    image: "/images/team/sally-hussein.jpg",
    intro:
      "Sally Hussein is the Chief Human Resources Officer at Hassan Allam Properties where she leads people-centric strategies that strengthen engagement, culture and organizational performance. Sally is a courageous, empathetic and data-driven leader who shapes the company’s Employee Value Proposition (EVP), inclusion agenda and talent strategy to enhance productivity and support sustainable business growth.",
    body: [
      "Her People Strategy focuses on building strong talent pipelines, starting from schools and universities through CSR competitions, career fairs, internships and graduate programs while developing future leaders within Hassan Allam Properties through a tailored, experiential learning environment that fosters engagement and performance.",
      "Sally joined Hassan Allam Properties with a 20-year track record at ExxonMobil, where she held several senior HR leadership roles across Africa and the Middle East, including Egypt Country HR Manager and Board Director. Sally holds a degree in Business Administration and has completed executive studies at INSEAD and Thunderbird School of Global Management. Sally is also a core member of the HR Committee at the American Chamber of Commerce.",
    ],
  },
  {
    slug: "rafik-talaat",
    name: "Rafik Talaat",
    role: "Chief Sales Officer",
    image: "/images/team/rafik-talaat.jpg",
    intro:
      "Rafik Talaat is the Chief Sales Officer at Hassan Allam Properties, where he leads the company’s sales strategy, planning, pricing frameworks, and subsidiary sales operations. He is responsible for sales forecasting across projects, team development and performance management, strategic partnerships, and executive collaboration.",
    body: [
      "With a strong track record and deep market insight, Rafik oversees commercial performance and pricing strategy across the company’s portfolio of developments. His data-driven approach aligns product positioning with evolving market demand, enabling sustainable growth across market cycles.",
      "With 17 years of extensive experience in Egypt’s real estate market, Rafik began his career in the industry at SODIC in 2009, where he developed strong expertise in sales structuring, market positioning, and performance management.",
      "Since joining Hassan Allam Properties in 2018, Rafik has played an integral role in the company’s continued growth and commercial success, contributing to the expansion and performance of its development portfolio.",
    ],
  },
  {
    slug: "amina-allam",
    name: "Amina Allam",
    role: "Head of Resale Unit",
    image: "/images/team/amina-allam.jpg",
    intro:
      "Amina Allam is the Head of the Resale & Rent Department at Hassan Allam Properties, a role she has held since July 2020. With over 28 years of professional experience, Amina brings extensive expertise in the brokerage and real estate industries. She joined Hassan Allam Properties in March 2018, initially managing Primary Sales, where she played a key role in strengthening the company’s sales performance and client relationships.",
    body: [
      "Amina graduated from The American University in Cairo in 1996 with a Bachelor of Arts in Mass Communication, specializing in Public Relations and Journalism, with a minor in Psychology. She began her career in 1998 at EFG-Hermes in the Brokerage Department, where she managed the VIP Retail Desk and completed the firm’s in-house Corporate Credit Course. Over the course of nearly two decades at EFG-Hermes, Amina progressed through several leadership roles and concluded her tenure in February 2017 with the title of Vice President.",
    ],
  },
  {
    slug: "ehsan-faizy",
    name: "Ehsan Faizy",
    role: "Chief Marketing and Commercial Properties Officer",
    image: "/images/team/ehsan-faizy.jpg",
    intro:
      "Ehsan Faizy joined Hassan Allam Properties as Chief Marketing Officer in January 2018, leading marketing strategy formulation and championing corporate brand guardianship. In February 2021, leasing of commercial properties — including commercial destinations and clubhouse place-making strategy — was added to her scope as Chief Marketing and Commercial Properties Officer.",
    body: [
      "Before that, Ehsan spent ten years at Palm Hills Developments, which she joined in 2008 as Director of Market Research; Integrated Marketing Communication was later added to her scope as Vice President of Marketing, where she contributed massively to the Palm Hills brand equity building, premium positioning and established leading salience and share of mind.",
      "Prior to joining Palm Hills, Ehsan spent a couple of years at Promo Group Integrated Solutions as Communication Director. Before that, she spent around five years at British American Tobacco – Egypt, holding leading roles in market research, corporate regulatory affairs and communication, trade marketing and distribution, building an extensive, well-rounded business acumen. She embarked on her corporate career at InterCapital Securities [Flemings CIIC – Brokerage arm] for four years.",
      "Ehsan holds a BA with honors in political sciences and economics from Cairo University, enriched by a robust array of training and development programs spanning leadership, corporate investment, communication, regulatory affairs and stakeholder management, finance for non-finance, marketing spend effectiveness measurement, market research and consumer insights.",
    ],
  },
  {
    slug: "mohamed-metwally",
    name: "Mohamed Metwally",
    role: "Executive Director of Strategy and Business Transformation",
    image: "/images/team/mohamed-metwally.jpg",
    intro:
      "Mohamed Metwally is the Executive Director of Strategy and Business Transformation at Hassan Allam Properties, bringing over 18 years of international experience in corporate strategy, enterprise transformation, and operational excellence.",
    body: [
      "In his role, Mohamed leads the company’s enterprise strategy and business transformation agenda, overseeing the formulation and execution of corporate and business strategies, governance frameworks, business intelligence capabilities, and organizational performance measurement. He focuses on strengthening organizational maturity, optimizing end-to-end processes, and embedding data-driven decision making to support sustainable growth across the real estate value chain.",
      "Mohamed holds an MBA from the University of Hull (UK) and a Diploma in Real Estate Development and Management from the American University in Cairo. He has also earned certifications in Real Estate Finance and Investment, AI for Business, and Digital Transformation from AUC as well as a Diploma in Project Management from McGill University. In addition, he holds a Project Management Professional (PMP) certification.",
      "His expertise spans corporate and business strategy, operational excellence (Lean Six Sigma Black Belt), organizational performance measurement through Balanced Scorecard and KPI frameworks (Certified BSC and KPI Professional), as well as real estate management, real estate finance, and investment.",
    ],
  },
  {
    slug: "mahmoud-khalil",
    name: "Mahmoud Khalil",
    role: "Project Controls Executive Director",
    image: "/images/team/mahmoud-khalil.jpg",
    intro:
      "Mahmoud Khalil is the Project Controls Executive Director at Hassan Allam Properties, bringing over 25 years of experience in the real estate and construction industry. He has built a strong track record in project controls, planning, and execution across leading regional and international organizations.",
    body: [
      "Mahmoud previously served as Chief Technical Officer at Redcon Properties, where he played a key role in driving technical excellence and project delivery. Throughout his career, he has held senior roles with prominent organizations including Palm Hills Developments, New Giza, Hill International, Dar Al-Handasah, TAV, and Arab Contractors. His extensive experience spans large-scale developments, project management, and operational leadership, contributing to successful project outcomes and long-term value creation.",
    ],
  },
  {
    slug: "adham-ismail",
    name: "Adham Ismail",
    role: "Director of Strategic Projects",
    image: "/images/team/adham-ismail.jpg",
    intro:
      "Adham Ismail is the Director of Strategic Projects with over 20 years of experience delivering complex and cross-functional programs. Together with executive leadership, Adham sets strategic priorities, optimizes business processes and executes mission-critical projects that help pave the way to high performance and growth.",
    body: [
      "As Director of Strategic Projects, Adham manages key strategic initiatives that shape organizational strategy and accelerate business performance. He leads complex, cross-functional projects focused on operational excellence, process optimization and long-term strategic alignment. Through his direct work with executive leadership, Adham translates strategic vision into actionable plans, establishes scalable frameworks and ensures successful execution. Recognized for his analytical mindset, structured delivery and collaborative leadership style, he consistently drives meaningful results and supports sustainable organizational growth.",
    ],
  },
];
