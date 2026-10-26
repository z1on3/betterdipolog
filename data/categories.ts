import {
  Building2,
  FileText,
  HandHeart,
  HardHat,
  Landmark,
  Car,
  PawPrint,
  ShieldAlert,
  GraduationCap,
} from "lucide-react";

export const serviceCategories = [
  {
    name: "Business, Trade and Investment",
    slug: "business-trade-and-investment",
    description:
      "Resources and services for starting, managing, and growing a business, including permits, taxes, and local investment opportunities.",
    href: "/services?category=Business%2C+Trade+and+Investment",
    icon: Building2,
    secondaryColor: "bg-blue-50 dark:bg-blue-950/40",
    primaryColor: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    subItems: [],
  },
  {
    name: "Certificates and Vital Records",
    slug: "certificates-and-vital-records",
    description:
      "Official documentation services including birth, marriage, and death certificates, as well as clearances and personal records.",
    href: "/services?category=Certificates+and+Vital+Records",
    icon: FileText,
    secondaryColor: "bg-amber-50 dark:bg-amber-950/40",
    primaryColor: "text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    subItems: [],
  },
  {
    name: "Education and Scholarships",
    slug: "education-and-scholarships",
    description:
      "Information on public schools, local government scholarships, educational programs, and student financial assistance.",
    href: "/services?category=Education+and+Scholarships",
    icon: GraduationCap,
    secondaryColor: "bg-cyan-50 dark:bg-cyan-950/40",
    primaryColor: "text-cyan-600 dark:text-cyan-400",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    subItems: [],
  },
  {
    name: "Social Welfare",
    slug: "social-welfare",
    description:
      "City social welfare services such as crisis (medical and burial) assistance and PWD, senior citizen, and solo parent IDs.",
    href: "/services?category=Social+Welfare",
    icon: HandHeart,
    secondaryColor: "bg-rose-50 dark:bg-rose-950/40",
    primaryColor: "text-rose-600 dark:text-rose-400",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
    subItems: [],
  },
  {
    name: "Taxes and Real Property",
    slug: "taxes-and-real-property",
    description:
      "Real property tax payment, realty tax clearances, and tax declarations from the City Treasurer's and City Assessor's offices.",
    href: "/services?category=Taxes+and+Real+Property",
    icon: Landmark,
    secondaryColor: "bg-teal-50 dark:bg-teal-950/40",
    primaryColor: "text-teal-600 dark:text-teal-400",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    subItems: [],
  },
  {
    name: "Infrastructure and Public Works",
    slug: "infrastructure-and-public-works",
    description:
      "Services related to city infrastructure, road maintenance, public utilities, and building or construction permits.",
    href: "/services?category=Infrastructure+and+Public+Works",
    icon: HardHat,
    secondaryColor: "bg-orange-50 dark:bg-orange-950/40",
    primaryColor: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
    subItems: [],
  },
  {
    name: "Transport and Driving",
    slug: "transport-and-driving",
    description:
      "Information and services for vehicle registration, driver licensing, traffic regulations, and public transportation.",
    href: "/services?category=Transport+and+Driving",
    icon: Car,
    secondaryColor: "bg-violet-50 dark:bg-violet-950/40",
    primaryColor: "text-violet-600 dark:text-violet-400",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    subItems: [],
  },
  {
    name: "Animal Welfare",
    slug: "animal-welfare",
    description:
      "Veterinary services, pet registration, animal bite treatment centers, and responsible pet ownership programs.",
    href: "/services?category=Animal+Welfare",
    icon: PawPrint,
    secondaryColor: "bg-emerald-50 dark:bg-emerald-950/40",
    primaryColor: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    subItems: [],
  },
  {
    name: "Disaster Preparedness",
    slug: "disaster-preparedness",
    description:
      "Emergency response resources, evacuation protocols, flood warnings, and community disaster risk reduction management.",
    href: "/services?category=Disaster+Preparedness",
    icon: ShieldAlert,
    secondaryColor: "bg-red-50 dark:bg-red-950/40",
    primaryColor: "text-red-600 dark:text-red-400",
    hoverBorder: "hover:border-red-300 dark:hover:border-red-700",
    subItems: [],
  },
  /* --- PENDING CATEGORIES (Awaiting Data) --- */
  /*
    Health and Wellness: removed until sourced Dipolog City Health Office
    services are added (the City's Citizen's Charter has none listed).
    Re-add with icon HeartPulse, colors rose, href
    '/services?category=Health+and+Wellness'.
  */
  /*
    {
        name: 'Garbage and Waste Disposal',
        slug: 'garbage-and-waste-disposal',
        description: 'Services for residential and commercial waste collection, recycling programs, and solid waste management guidelines.',
        href: '/services?category=Garbage+and+Waste+Disposal',
        icon: Trash2,
        secondaryColor: 'bg-zinc-50 dark:bg-zinc-950',
        primaryColor: 'text-zinc-600 dark:text-zinc-400',
        hoverBorder: 'hover:border-zinc-300 dark:hover:border-zinc-700',
        subItems: []
    },
    {
        name: 'Environment',
        slug: 'environment',
        description: 'Programs and services dedicated to environmental protection, conservation efforts, tree planting, and pollution control.',
        href: '/services?category=Environment',
        icon: Leaf,
        secondaryColor: 'bg-green-50 dark:bg-green-950/40',
        primaryColor: 'text-green-600 dark:text-green-400',
        hoverBorder: 'hover:border-green-300 dark:hover:border-green-700',
        subItems: []
    },
    */
].sort((a, b) => a.name.localeCompare(b.name));

// You can still export your dropdown list for the Header here if you want!
export const headerDropdown = [
  { name: "All Services", href: "/services" },
  { name: "Scholarships & Assistance", href: "/assistance" },
  ...serviceCategories.map((cat) => ({ name: cat.name, href: cat.href })),
];
