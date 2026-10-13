import Navbar from '../../components/Navbar'
import Activity from '../../components/Activity'
import Footer from '../../components/Footer'
import { ACTIVITIES } from '../../data/activities'

export const metadata = {
  title: 'Engineering Activity Stream & Timestamped Logs — Vipin Singh Parihar',
  description:
    'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, open-source commits, and technical milestones by Vipin Singh Parihar (vipin-placeholder).',
  keywords: [
    'Vipin Singh Parihar Activity',
    'vipin-placeholder Log',
    'Vipin Singh Parihar Releases',
    'Engineering Updates',
    'AI ML Project Releases',
    'IIM Sambalpur Boot Camp',
    'IIM Sambalpur Bootcamp',
    'iim sambalpur bootcamp',
    'iim sambalpur boot camp',
    'IDE Bootcamp Edition 2 Phase 1',
    'IIM Sambalpur IDE Bootcamp',
    'Innovation Design & Entrepreneurship Bootcamp',
    'ISRO BAH 2026',
    'SIH 2025 Team CodeNova',
    'YOUTH@2050 1st Prize Winner',
    'Open Source GitHub Feed',
    'Computer Vision Milestones',
  ],
  alternates: {
    canonical: 'https://vipinsinghparihar.dev/activity',
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
    title: 'Engineering Activity Stream & Timestamped Logs — Vipin Singh Parihar',
    description:
      'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, open-source commits, and technical milestones by Vipin Singh Parihar.',
    url: 'https://vipinsinghparihar.dev/activity',
    type: 'website',
    siteName: 'Vipin Singh Parihar Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: 'https://vipinsinghparihar.dev/vipin.png',
        width: 1200,
        height: 630,
        alt: 'Vipin Singh Parihar Engineering Activity Feed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Activity Stream & Timestamped Logs — Vipin Singh Parihar',
    description:
      'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, and open-source commits by Vipin Singh Parihar.',
    creator: '@vipin_placeholder',
    site: '@vipin_placeholder',
    images: ['https://vipinsinghparihar.dev/vipin.png'],
  },
}

const activityIndexJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://vipinsinghparihar.dev/activity#collection',
      url: 'https://vipinsinghparihar.dev/activity',
      name: 'Engineering Activity Stream & Timestamped Logs — Vipin Singh Parihar',
      description:
        'Real-time chronological activity feed of project releases, AI/ML research models, hackathons, open-source commits, and technical milestones by Vipin Singh Parihar.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://vipinsinghparihar.dev/#website',
        name: 'Vipin Singh Parihar — Portfolio',
        url: 'https://vipinsinghparihar.dev',
      },
      breadcrumb: {
        '@id': 'https://vipinsinghparihar.dev/activity#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://vipinsinghparihar.dev/activity#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://vipinsinghparihar.dev/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Activity Stream',
          item: 'https://vipinsinghparihar.dev/activity',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Engineering Updates, Releases & Technical Milestones by Vipin Singh Parihar',
      numberOfItems: ACTIVITIES.length,
      itemListElement: ACTIVITIES.map((act, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: act.title,
        description: act.summary,
        url: 'https://vipinsinghparihar.dev/activity#' + act.id,
      })),
    },
  ],
}

export default function ActivityPage() {
  return (
    <>
      <script
        id="activity-schema-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activityIndexJsonLd) }}
        suppressHydrationWarning
      />
      <Navbar />
      <main id="main-content" style={{ minHeight: '80vh' }}>
        <Activity />
      </main>
      <Footer />
    </>
  )
}
