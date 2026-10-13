import Navbar from '../../components/Navbar'
import Blog from '../../components/Blog'
import Footer from '../../components/Footer'
import { BLOG_POSTS } from '../../data/blogPosts'
import { BLOG_PAGE_KEYWORDS } from '../../utils/seoKeywords'

export const metadata = {
  title: 'Technical Blog & Engineering Articles — Vipin Singh Parihar',
  description:
    'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Vipin Singh Parihar (vipin-placeholder).',
  keywords: BLOG_PAGE_KEYWORDS,
  alternates: {
    canonical: 'https://vipinsinghparihar.dev/blog',
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
    title: 'Technical Blog & Engineering Articles — Vipin Singh Parihar',
    description:
      'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Vipin Singh Parihar.',
    url: 'https://vipinsinghparihar.dev/blog',
    type: 'website',
    siteName: 'Vipin Singh Parihar Portfolio',
    locale: 'en_IN',
    images: [
      {
        url: 'https://vipinsinghparihar.dev/vipin.png',
        width: 1200,
        height: 630,
        alt: 'Vipin Singh Parihar Technical Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog & Engineering Articles — Vipin Singh Parihar',
    description:
      'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Vipin Singh Parihar.',
    creator: '@vipin_placeholder',
    site: '@vipin_placeholder',
    images: ['https://vipinsinghparihar.dev/vipin.png'],
  },
}

const blogIndexJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://vipinsinghparihar.dev/blog#collection',
      url: 'https://vipinsinghparihar.dev/blog',
      name: 'Technical Blog & Engineering Articles — Vipin Singh Parihar',
      description:
        'Engineering writeups, AI/ML tutorials, computer vision architectures, and system software articles by Vipin Singh Parihar.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://vipinsinghparihar.dev/#website',
        name: 'Vipin Singh Parihar — Portfolio',
        url: 'https://vipinsinghparihar.dev',
      },
      breadcrumb: {
        '@id': 'https://vipinsinghparihar.dev/blog#breadcrumb',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://vipinsinghparihar.dev/blog#breadcrumb',
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
          name: 'Technical Blog',
          item: 'https://vipinsinghparihar.dev/blog',
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Technical Articles & Engineering Deep Dives by Vipin Singh Parihar',
      numberOfItems: BLOG_POSTS.length,
      itemListElement: BLOG_POSTS.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        description: post.excerpt,
        url: `https://vipinsinghparihar.dev/blog/${post.slug}`,
      })),
    },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script
        id="blog-schema-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
        suppressHydrationWarning
      />
      <Navbar />
      <main id="main-content" style={{ minHeight: '80vh' }}>
        <Blog isStandalone />
      </main>
      <Footer />
    </>
  )
}
