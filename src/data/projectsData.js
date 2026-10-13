/**
 * Placeholder projects for Vipin Singh Parihar
 * Replace with real projects from resume later.
 */

export const PROJECTS_DATA = [
  {
    id: 'placeholder-wp-01',
    number: '01',
    title: 'Project Placeholder 01',
    subtitle: 'Custom WordPress Website — Coming Soon',
    category: 'WordPress',
    desc: 'Placeholder project description. Real case study details will be added from resume.',
    longDesc:
      'This is a placeholder project entry for Vipin Singh Parihar’s portfolio. Final title, description, tech stack, and links will be updated from the resume.',
    tags: ['WordPress', 'PHP', 'Custom Theme', 'Placeholder'],
    color: 'orange',
    image: '/projects/ecommerce.svg',
    stats: { tech: '4', year: '2026', status: 'Placeholder' },
    link: '#',
    githubUrl: 'https://github.com/placeholder',
    highlights: [
      'Placeholder highlight — custom WordPress theme',
      'Placeholder highlight — responsive layout',
      'Placeholder highlight — client-ready delivery',
      'Placeholder highlight — performance tuning',
    ],
  },
  {
    id: 'placeholder-react-02',
    number: '02',
    title: 'Project Placeholder 02',
    subtitle: 'React.js Web App — Coming Soon',
    category: 'React.js',
    desc: 'Placeholder React.js project. Final details will be filled after resume upload.',
    longDesc:
      'Placeholder React.js / JavaScript project for the portfolio showcase. Content temporary until real project data is provided.',
    tags: ['React.js', 'JavaScript', 'UI', 'Placeholder'],
    color: 'purple',
    image: '/projects/3d-portfolio.svg',
    stats: { tech: '4', year: '2026', status: 'Placeholder' },
    link: '#',
    githubUrl: 'https://github.com/placeholder',
    highlights: [
      'Placeholder highlight — component-based UI',
      'Placeholder highlight — interactive frontend',
      'Placeholder highlight — modern JS patterns',
      'Placeholder highlight — responsive experience',
    ],
  },
  {
    id: 'placeholder-woo-03',
    number: '03',
    title: 'Project Placeholder 03',
    subtitle: 'WooCommerce / E-commerce — Coming Soon',
    category: 'WordPress',
    desc: 'Placeholder WooCommerce store project. Replace with real client work later.',
    longDesc:
      'Placeholder e-commerce / WooCommerce entry. Product flows, payment notes, and screenshots will be added later.',
    tags: ['WooCommerce', 'WordPress', 'PHP', 'Placeholder'],
    color: 'blue',
    image: '/projects/gcekvendor.svg',
    stats: { tech: '5', year: '2026', status: 'Placeholder' },
    link: '#',
    githubUrl: 'https://github.com/placeholder',
    highlights: [
      'Placeholder highlight — product catalog',
      'Placeholder highlight — checkout flow',
      'Placeholder highlight — custom shop UI',
      'Placeholder highlight — payment integration',
    ],
  },
  {
    id: 'placeholder-js-04',
    number: '04',
    title: 'Project Placeholder 04',
    subtitle: 'JavaScript Feature Build — Coming Soon',
    category: 'JavaScript',
    desc: 'Placeholder JavaScript project for interactions, APIs, or tooling.',
    longDesc:
      'Temporary JavaScript project card. Will be replaced with a real build from resume and case studies.',
    tags: ['JavaScript', 'API', 'Frontend', 'Placeholder'],
    color: 'green',
    image: '/projects/cyberterminal.svg',
    stats: { tech: '3', year: '2026', status: 'Placeholder' },
    link: '#',
    githubUrl: 'https://github.com/placeholder',
    highlights: [
      'Placeholder highlight — vanilla / modern JS',
      'Placeholder highlight — API integration',
      'Placeholder highlight — UX polish',
      'Placeholder highlight — maintainable code',
    ],
  },
  {
    id: 'placeholder-theme-05',
    number: '05',
    title: 'Project Placeholder 05',
    subtitle: 'Custom Theme / Plugin — Coming Soon',
    category: 'WordPress',
    desc: 'Placeholder for a custom WordPress theme or plugin package.',
    longDesc:
      'Placeholder WordPress theme/plugin project. Technical notes and repo links pending.',
    tags: ['WordPress', 'Theme', 'Plugin', 'Placeholder'],
    color: 'teal',
    image: '/projects/resumebuilder.svg',
    stats: { tech: '4', year: '2026', status: 'Placeholder' },
    link: '#',
    githubUrl: 'https://github.com/placeholder',
    highlights: [
      'Placeholder highlight — reusable theme parts',
      'Placeholder highlight — custom post types',
      'Placeholder highlight — admin UX',
      'Placeholder highlight — clean PHP structure',
    ],
  },
  {
    id: 'placeholder-fullstack-06',
    number: '06',
    title: 'Project Placeholder 06',
    subtitle: 'Full-Stack Web Platform — Coming Soon',
    category: 'Full-Stack',
    desc: 'Placeholder full-stack project mixing WordPress / React / JS.',
    longDesc:
      'Placeholder full-stack entry covering CMS + modern frontend. Content will be updated from resume.',
    tags: ['Full-Stack', 'WordPress', 'React.js', 'Placeholder'],
    color: 'rose',
    image: '/projects/smartplacement.svg',
    stats: { tech: '6', year: '2026', status: 'Placeholder' },
    link: '#',
    githubUrl: 'https://github.com/placeholder',
    highlights: [
      'Placeholder highlight — CMS + frontend',
      'Placeholder highlight — REST / headless ready',
      'Placeholder highlight — deployment notes',
      'Placeholder highlight — scalable structure',
    ],
  },
]

export const FEATURED_PROJECTS = PROJECTS_DATA.slice(0, 4)

export const PROJECT_CATEGORIES = [
  'All',
  'WordPress',
  'React.js',
  'JavaScript',
  'Full-Stack',
]

export function getProjectById(id) {
  return PROJECTS_DATA.find((p) => p.id === id) || null
}
