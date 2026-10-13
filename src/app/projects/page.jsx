import Navbar from '../../components/Navbar'
import ProjectsArchive from '../../components/ProjectsArchive'
import Footer from '../../components/Footer'
import { PROJECTS_PAGE_KEYWORDS } from '../../utils/seoKeywords'
import { PROJECTS_DATA } from '../../data/projectsData'

export const metadata = {
  title: 'Engineering Projects & Case Studies — Vipin Singh Parihar',
  description:
    'Comprehensive portfolio archive of 21+ engineering projects in AI/ML, computer vision, cyber security, and full-stack web development by Vipin Singh Parihar (vipin-placeholder).',
  keywords: PROJECTS_PAGE_KEYWORDS,
  alternates: {
    canonical: 'https://vipinsinghparihar.dev/projects',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Engineering Projects Archive — Vipin Singh Parihar',
    description:
      'Detailed showcase of full-stack systems, computer vision apps, machine learning models, and hackathon winning solutions by Vipin Singh Parihar.',
    url: 'https://vipinsinghparihar.dev/projects',
    type: 'website',
    siteName: 'Vipin Singh Parihar Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: 'https://vipinsinghparihar.dev/vipin.png',
        width: 1200,
        height: 630,
        alt: 'Vipin Singh Parihar Projects Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Projects Archive — Vipin Singh Parihar',
    description:
      'Detailed showcase of full-stack systems, computer vision apps, machine learning models, and hackathon winning solutions by Vipin Singh Parihar.',
    creator: '@vipin_placeholder',
    site: '@vipin_placeholder',
    images: ['https://vipinsinghparihar.dev/vipin.png'],
  },
}

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://vipinsinghparihar.dev/projects#collection',
      url: 'https://vipinsinghparihar.dev/projects',
      name: 'Vipin Singh Parihar — Engineering Projects Archive',
      description:
        'Selected engineering projects across AI/ML, computer vision, cyber security, and modern web architectures.',
      isPartOf: {
        '@id': 'https://vipinsinghparihar.dev/#website',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Engineering Projects by Vipin Singh Parihar',
      itemListElement: PROJECTS_DATA.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: p.title,
        description: p.desc,
        url: p.link || `https://vipinsinghparihar.dev/projects/${p.id}`,
      })),
    },
  ],
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <ProjectsArchive />
      </main>
      <Footer />
    </>
  )
}
