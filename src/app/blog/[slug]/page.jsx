import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ShareButton from '../../../components/ShareButton'
import TableOfContents from '../../../components/TableOfContents'
import { BLOG_POSTS } from '../../../data/blogPosts'
import { getBlogPostSeo } from '../../../utils/seoKeywords'
import styles from './ArticleView.module.css'

// 1. Static Site Generation for all 12 blog posts
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

// Optimized SEO & Social Metadata Mappings (Strictly within Google / 𝕏 / LinkedIn character limits)
const OPTIMIZED_BLOG_META = {
  'architecting-hackverse-2026-hackathon-platform': {
    pageTitle: "HackVerse '26 Architecture | Vipin Singh Parihar",
    socialTitle: "Architecting HackVerse '26: 24H State Hackathon Platform",
    metaDesc: "Engineering the digital platform for HackVerse '26 by CodeBreakers GCEK with real-time countdown telemetry and registration pipelines.",
    socialDesc: "Behind the scenes of building hackverse.codebreakersgcek.tech for CodeBreakers GCEK.",
  },
  'isro-bah-2026-exoplanet-detection-ml': {
    pageTitle: 'ISRO BAH 2026 Exoplanet ML | Vipin Singh Parihar',
    socialTitle: 'Exoplanet Detection with ML: ISRO BAH 2026',
    metaDesc: 'Machine learning transit photometry and 1D-CNN pipeline for ISRO Bharatiya Antariksh Hackathon PS-07 exoplanet detection.',
    socialDesc: '1D-CNN & Random Forest transit photometry pipeline for ISRO BAH 2026 exoplanet detection.',
  },
  'sih-2025-attendtrue-analytic': {
    pageTitle: 'AttendTrue Analytics SIH 2025 | Vipin Singh Parihar',
    socialTitle: 'AttendTrue Analytics: AI Attendance (SIH 2025)',
    metaDesc: 'Smart India Hackathon 2025 AI attendance platform with computer vision biometric verification and student analytics by Team CodeNova.',
    socialDesc: 'Computer vision attendance verification and student behavioral analytics for SIH 2025.',
  },
  'mrs-ai-medicine-recommender-system': {
    pageTitle: 'MRS-AI Medicine Recommender | Vipin Singh Parihar',
    socialTitle: 'MRS-AI: 1st Prize ML Medicine Recommender',
    metaDesc: '1st Prize winning ML medicine recommender system with multi-class SVC disease classification and verified precautions.',
    socialDesc: '1st Prize winning ML healthcare engine with 98.2% SVC disease classification and clinical regimens.',
  },
  'ar-hand-gesture-canvas-mediapipe': {
    pageTitle: 'AR Hand Gesture Canvas | Vipin Singh Parihar',
    socialTitle: 'Touchless AR Hand Gesture Canvas (MediaPipe)',
    metaDesc: 'Zero-latency virtual air-drawing canvas with Google MediaPipe 21-landmark hand tracking and Bézier curves in React.',
    socialDesc: 'Real-time touchless air-drawing canvas using MediaPipe hand tracking and React.',
  },
  'unvoiced-sign-language-translator-opencv': {
    pageTitle: 'UnVoiced ISL AI Translator | Vipin Singh Parihar',
    socialTitle: 'UnVoiced: Indian Sign Language AI Translator',
    metaDesc: 'Real-time Indian Sign Language translator converting hand gestures to speech using OpenCV contour analysis and AI.',
    socialDesc: 'Convert Indian Sign Language gestures into real-time speech and text with OpenCV.',
  },
  'stadium-ai-vision-crowd-density-monitoring': {
    pageTitle: 'StadiumAI Crowd Monitoring | Vipin Singh Parihar',
    socialTitle: 'StadiumAI: YOLOv8 Crowd Density Monitoring',
    metaDesc: 'Real-time pedestrian crowd density monitoring system with homography bird’s-eye mapping and YOLOv8 surge tracking.',
    socialDesc: 'Real-time pedestrian surge tracking and bird’s-eye crowd density mapping with YOLOv8.',
  },
  'local-llm-chatui-ollama-execution-layer': {
    pageTitle: 'Local LLM ChatUI with Ollama | Vipin Singh Parihar',
    socialTitle: 'Local LLM ChatUI: Private AI Execution',
    metaDesc: 'High-throughput private LLM execution interface with GGUF quantization, VRAM layer offloading, and streaming web UI.',
    socialDesc: 'Private high-speed LLM interface with GGUF quantization and GPU layer offloading.',
  },
  'lstm-stock-price-predictor-time-series': {
    pageTitle: 'LSTM Stock Price Predictor | Vipin Singh Parihar',
    socialTitle: 'Stock Price Prediction with Bi-LSTM Networks',
    metaDesc: 'Bidirectional LSTM neural network for financial time-series forecasting with technical indicators (RSI, MACD).',
    socialDesc: 'Financial time-series forecasting using Bidirectional LSTM neural networks and MACD.',
  },
  'smartplacement-campus-readiness-predictor': {
    pageTitle: 'SmartPlacement AI Predictor | Vipin Singh Parihar',
    socialTitle: 'SmartPlacement: Campus Readiness AI Engine',
    metaDesc: 'Machine learning readiness engine predicting campus placement probabilities and generating personalized roadmaps.',
    socialDesc: 'Predict campus placement probabilities and identify student skill gaps with ML.',
  },
  'public-dns-switcher-network-orchestration': {
    pageTitle: 'Public DNS Switcher CLI | Vipin Singh Parihar',
    socialTitle: 'Public DNS Switcher: Windows Network Tool',
    metaDesc: 'Fast Windows network orchestrator for benchmarking DNS server latency and switching DNS via PowerShell netsh.',
    socialDesc: 'Benchmark DNS latency and switch network adapters instantly with PowerShell.',
  },
  'biometric-face-recognition-sqlite-haar': {
    pageTitle: 'Biometric Face Attendance | Vipin Singh Parihar',
    socialTitle: 'Biometric Face Recognition with SQLite & Haar',
    metaDesc: 'Contactless face recognition attendance system using Haar cascades, 128D deep embeddings, and SQLite database.',
    socialDesc: 'Contactless attendance verification using Haar cascades, 128D face embeddings, and SQLite.',
  },
  'cyberterminal-os-retro-modern-web-os': {
    pageTitle: 'CyberTerminal OS Web Portfolio | Vipin Singh',
    socialTitle: 'CyberTerminal OS: Retro-Modern CLI Portfolio',
    metaDesc: 'Retro-modern terminal web OS with interactive BASH console, live HTOP telemetry, and CRT shaders in Next.js.',
    socialDesc: 'Interactive retro-modern CLI web OS with live BASH terminal and HTOP telemetry.',
  },
}

// Smart word-boundary truncation helper
function trimToLimit(text, limit) {
  if (!text) return ''
  if (text.length <= limit) return text
  const trimmed = text.slice(0, limit - 1)
  const lastSpace = trimmed.lastIndexOf(' ')
  return (lastSpace > 15 ? trimmed.slice(0, lastSpace) : trimmed) + '…'
}

// 2. Dynamic Metadata Generation for Googlebot, Google Discover & Social Networks
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Article Not Found | Vipin Singh Parihar',
      description: 'The requested technical article could not be found.',
    }
  }

  const seoData = getBlogPostSeo(post.slug)
  const canonicalUrl = seoData.canonicalUrl
  const ogImageUrl = `https://vipinsinghparihar.dev/blog/${post.slug}/opengraph-image`

  const metaOverride = OPTIMIZED_BLOG_META[post.slug]

  // Google Search Title (Target <= 58 chars)
  const pageTitle = metaOverride?.pageTitle || trimToLimit(`${post.title} | Vipin Singh`, 58)
  
  // Google Search Meta Description (Target <= 150 chars)
  const metaDescription = metaOverride?.metaDesc || trimToLimit(post.excerpt, 150)
  
  // Social Title (Target <= 58 chars for 𝕏 / LinkedIn / Facebook / WhatsApp)
  const socialTitle = metaOverride?.socialTitle || trimToLimit(post.title, 58)
  
  // Social Description (Target <= 120 chars for clean mobile social cards)
  const socialDescription = metaOverride?.socialDesc || trimToLimit(post.excerpt, 120)

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: seoData.keywords,
    authors: [{ name: 'Vipin Singh Parihar', url: 'https://vipinsinghparihar.dev' }],
    creator: 'Vipin Singh Parihar',
    publisher: 'Vipin Singh Parihar',
    alternates: {
      canonical: canonicalUrl,
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
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      siteName: 'Vipin Singh Parihar',
      locale: 'en_IN',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date().toISOString(),
      authors: ['https://vipinsinghparihar.dev'],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${socialTitle} — Vipin Singh Parihar`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
      creator: '@vipin_placeholder',
      site: '@vipin_placeholder',
      images: [ogImageUrl],
    },
  }
}

// Clean LaTeX math to readable Unicode text
function formatMathString(mathStr) {
  if (!mathStr) return ''
  return mathStr
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\delta/g, 'δ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\%/g, '%')
    .replace(/T_0/g, 'T₀')
    .replace(/x_8/g, 'x₈')
    .replace(/x_4/g, 'x₄')
    .replace(/y_8/g, 'y₈')
    .replace(/y_4/g, 'y₄')
    .replace(/L_8/g, 'L₈')
    .replace(/L_4/g, 'L₄')
    .replace(/P_\{?smoothed\}?/g, 'P_smoothed')
    .replace(/P_\{?current\}?/g, 'P_current')
    .replace(/P_\{?previous\}?/g, 'P_previous')
    .replace(/\\([a-zA-Z]+)/g, '$1')
    .replace(/[{}]/g, '')
    .trim()
}

// Helper to generate URL-safe, DOM-valid ID slugs from heading text
function slugifyHeading(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Extract hierarchical headings structure for Table of Contents
export function extractHeadings(content) {
  if (!content) return []
  const lines = content.trim().split('\n')
  const headings = []
  let inCodeBlock = false

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      return
    }
    if (inCodeBlock) return

    let level = 0
    let rawText = ''

    if (line.startsWith('#### ')) {
      level = 4
      rawText = line.replace('#### ', '').trim()
    } else if (line.startsWith('### ')) {
      level = 3
      rawText = line.replace('### ', '').trim()
    } else if (line.startsWith('## ')) {
      level = 2
      rawText = line.replace('## ', '').trim()
    }

    if (level > 0 && rawText) {
      const cleanTitle = rawText
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim()
      const id = slugifyHeading(cleanTitle) || `heading-${index}`
      headings.push({ id, title: cleanTitle, level })
    }
  })

  return headings
}

// Inline Markdown & Math Parser helper for high-performance server rendering
function renderMarkdownContent(content) {
  if (!content) return null

  const lines = content.trim().split('\n')
  const elements = []
  let inCodeBlock = false
  let codeBuffer = []
  let codeLang = 'text'
  let listBuffer = []
  let listType = null // 'bullet' | 'number'

  const renderInline = (text) => {
    if (!text) return ''

    let parts = []
    let lastIndex = 0

    // Combine matches for math ($...$ / $$...$$), links, bold, and inline code
    const tokenRegex = /(\$\$([^$]+)\$\$|\$([^$]+)\$|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g
    let match

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      if (match[0].startsWith('$$')) {
        // Block math
        parts.push(
          <span key={`math-block-${match.index}`} className={styles.mathBlock}>
            {formatMathString(match[2])}
          </span>
        )
      } else if (match[0].startsWith('$')) {
        // Inline math
        parts.push(
          <span key={`math-inline-${match.index}`} className={styles.mathInline}>
            {formatMathString(match[3])}
          </span>
        )
      } else if (match[0].startsWith('[')) {
        // Link
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[5]}
            target={match[5].startsWith('http') ? '_blank' : undefined}
            rel={match[5].startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {match[4]}
          </a>
        )
      } else if (match[0].startsWith('**')) {
        // Bold
        parts.push(<strong key={`bold-${match.index}`}>{renderInline(match[6])}</strong>)
      } else if (match[0].startsWith('`')) {
        // Inline code
        parts.push(
          <code key={`code-${match.index}`} className={styles.inlineCode}>
            {match[7]}
          </code>
        )
      }
      lastIndex = tokenRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const flushList = () => {
    if (listBuffer.length > 0 && listType) {
      const key = `list-${elements.length}`
      if (listType === 'bullet') {
        elements.push(
          <ul key={key} className={styles.bulletList}>
            {listBuffer.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>
        )
      } else {
        elements.push(
          <ol key={key} className={styles.numberList}>
            {listBuffer.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ol>
        )
      }
      listBuffer = []
      listType = null
    }
  }

  lines.forEach((line, idx) => {
    if (line.startsWith('```')) {
      flushList()
      if (inCodeBlock) {
        const fullCode = codeBuffer.join('\n')
        elements.push(
          <div key={`code-block-${idx}`} className={styles.codeBlockWrapper}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLang}>{codeLang}</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Code Snippet</span>
            </div>
            <pre className={styles.codeContent}>
              <code>{fullCode}</code>
            </pre>
          </div>
        )
        codeBuffer = []
        inCodeBlock = false
      } else {
        codeLang = line.replace('```', '').trim() || 'text'
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      return
    }

    // Display standalone math blocks ($$ ... $$)
    if (line.startsWith('$$') && line.endsWith('$$') && line.length > 4) {
      flushList()
      const mathContent = line.slice(2, -2).trim()
      elements.push(
        <div key={`mathblock-${idx}`} className={styles.mathBlockWrapper}>
          <span className={styles.mathBlock}>{formatMathString(mathContent)}</span>
        </div>
      )
      return
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType && listType !== 'bullet') {
        flushList()
      }
      listType = 'bullet'
      listBuffer.push(line.replace(/^[-*]\s+/, ''))
      return
    }

    if (/^\d+\.\s/.test(line)) {
      if (listType && listType !== 'number') {
        flushList()
      }
      listType = 'number'
      listBuffer.push(line.replace(/^\d+\.\s+/, ''))
      return
    }

    // If not a list item, flush any pending list
    flushList()

    if (line.startsWith('#### ')) {
      const raw = line.replace('#### ', '').trim()
      const clean = raw
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim()
      const id = slugifyHeading(clean) || `h4-${idx}`
      elements.push(
        <h4 key={`h4-${idx}`} id={id} className={styles.articleH4}>
          {renderInline(raw)}
        </h4>
      )
    } else if (line.startsWith('### ')) {
      const raw = line.replace('### ', '').trim()
      const clean = raw
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim()
      const id = slugifyHeading(clean) || `h3-${idx}`
      elements.push(
        <h3 key={`h3-${idx}`} id={id} className={styles.articleH3}>
          {renderInline(raw)}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      const raw = line.replace('## ', '').trim()
      const clean = raw
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim()
      const id = slugifyHeading(clean) || `h2-${idx}`
      elements.push(
        <h2 key={`h2-${idx}`} id={id} className={styles.articleH2}>
          {renderInline(raw)}
        </h2>
      )
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={`quote-${idx}`} className={styles.articleQuote}>
          {renderInline(line.replace('> ', ''))}
        </blockquote>
      )
    } else if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${idx}`} className={styles.articleP}>
          {renderInline(line)}
        </p>
      )
    }
  })

  flushList()

  return elements
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Sequential previous & next post navigation
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null

  // Find related articles (same category or shared tags)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3)

  const headings = extractHeadings(post.content)
  const seoData = getBlogPostSeo(post.slug)
  const wordCount = post.content.split(/\s+/).length + post.title.split(/\s+/).length
  const canonicalUrl = seoData.canonicalUrl
  const publishedIso = new Date(post.date).toISOString()
  const modifiedIso = new Date().toISOString()

  // JSON-LD Structured Data for Google Discover & Google Rich Results
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonicalUrl}#article`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://vipinsinghparihar.dev/#website',
      name: 'Vipin Singh Parihar — Portfolio',
      url: 'https://vipinsinghparihar.dev',
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    inLanguage: 'en-IN',
    wordCount: wordCount,
    articleSection: post.category,
    keywords: seoData.keywords.join(', '),
    image: {
      '@type': 'ImageObject',
      url: `https://vipinsinghparihar.dev/blog/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
      caption: `${post.title} by Vipin Singh Parihar`,
    },
    author: {
      '@type': 'Person',
      '@id': 'https://vipinsinghparihar.dev/#person',
      name: 'Vipin Singh Parihar',
      alternateName: ['vipin-placeholder', 'Quasar Om', 'OmPrakash Behera'],
      url: 'https://vipinsinghparihar.dev',
      image: 'https://vipinsinghparihar.dev/vipin.png',
      jobTitle: 'Computer Science Engineer & Full-Stack Developer',
      alumniOf: 'Government College of Engineering, Kalahandi (GCEK)',
      sameAs: [
        'https://github.com/placeholder',
        'https://linkedin.com/in/placeholder',
        'https://orcid.org/0009-0002-2403-2907',
        'https://instagram.com/placeholder',
      ],
    },
    publisher: {
      '@type': 'Person',
      '@id': 'https://vipinsinghparihar.dev/#person',
      name: 'Vipin Singh Parihar',
      url: 'https://vipinsinghparihar.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vipinsinghparihar.dev/logo.svg',
      },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <>
      {/* Dynamic Server-Rendered JSON-LD for Crawlers & Discover */}
      <script
        id="article-schema-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        suppressHydrationWarning
      />
      <script
        id="breadcrumb-schema-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        suppressHydrationWarning
      />

      <Navbar />

      <main id="main-content" className={styles.articlePage}>
        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/blog">Blog</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.category}</span>
          </nav>

          {/* 2-Column Responsive Layout: Left Article Bento Card + Right Fixed/Sticky TOC */}
          <div className={styles.blogMainLayout}>
            {/* Main 3D Clay Article Bento Card */}
            <div className={styles.articleCardWrapper}>
            {/* Article Header */}
            <header className={styles.header}>
              <div className={styles.metaRow}>
                <span className={`${styles.categoryTag} ${styles[`tag_${post.color}`]}`}>
                  {post.category}
                </span>
                <div className={styles.metaInfo}>
                  <time dateTime={publishedIso}>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{wordCount} words</span>
                </div>
              </div>

              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.excerpt}>{post.excerpt}</p>

              {/* Author Byline / E-E-A-T Badge */}
              <div className={styles.authorByline}>
                <div className={styles.authorLeft}>
                  <Image
                    src="/vipin.webp"
                    alt="Vipin Singh Parihar"
                    className={styles.authorAvatar}
                    width={54}
                    height={54}
                    quality={85}
                  />
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>Vipin Singh Parihar</span>
                    <span className={styles.authorRole}>
                      CSE Student at GCEK Kalahandi | Full-Stack &amp; AI Engineer
                    </span>
                  </div>
                </div>

                <div className={styles.authorActions}>
                  <ShareButton
                    url={`/blog/${post.slug}`}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    variant="full"
                  />
                  <a
                    href="https://github.com/placeholder/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/placeholder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </header>

            {/* Main Article Content */}
            <article className={styles.content}>
              {renderMarkdownContent(post.content)}
            </article>

            {/* Tags */}
            <div className={styles.tagsSection}>
              <span className={styles.tagLabel}>Related Topics:</span>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tagBadge}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Sequential Post Navigation (Prev / Next) */}
            {(prevPost || nextPost) && (
              <nav aria-label="Article navigation" className={styles.postPagination}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className={styles.postNavCard}>
                    <span className={styles.postNavLabel}>← Previous Article</span>
                    <span className={styles.postNavTitle}>{prevPost.title}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className={`${styles.postNavCard} ${styles.postNavNext}`}
                  >
                    <span className={styles.postNavLabel}>Next Article →</span>
                    <span className={styles.postNavTitle}>{nextPost.title}</span>
                  </Link>
                )}
              </nav>
            )}

            {/* Article Footer & E-E-A-T Author Card */}
            <footer className={styles.articleFooter}>
              <div className={styles.authorBioBox}>
                <Image
                  src="/vipin.webp"
                  alt="Vipin Singh Parihar profile photo"
                  className={styles.bioAvatar}
                  width={76}
                  height={76}
                  quality={85}
                />
                <div className={styles.bioContent}>
                  <h3 className={styles.bioTitle}>Written by Vipin Singh Parihar (vipin-placeholder)</h3>
                  <p className={styles.bioText}>
                    Computer Science &amp; Engineering student at Government College of Engineering, Kalahandi (GCEK Odisha). First Class Distinction graduate in Diploma CSE. Winner of YOUTH@2050 1st Prize, ISRO BAH 2026 PS-07 participant, and creator of 30+ full-stack and machine learning software systems.
                  </p>
                  <div className={styles.bioActions}>
                    <Link href="/#contact" className={styles.socialBtn}>
                      Contact Author ✉
                    </Link>
                    <a href="/resume.pdf" download className={styles.socialBtn}>
                      View Resume ↓
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Articles for internal link equity */}
              {relatedPosts.length > 0 && (
                <section className={styles.relatedSection} aria-label="Related Engineering Articles">
                  <h3 className={styles.relatedHeading}>Related Engineering Deep Dives</h3>
                  <div className={styles.relatedGrid}>
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className={styles.relatedCard}
                      >
                        <div>
                          <span className={styles.relatedCat}>{rel.category}</span>
                          <h4 className={styles.relatedTitle}>{rel.title}</h4>
                        </div>
                        <div className={styles.relatedMeta}>
                          <span>{rel.date}</span> • <span>{rel.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <div className={styles.footerNavActions}>
                <Link href="/blog" className={styles.backBtn}>
                  ← Back to All Articles
                </Link>
                <ShareButton
                  url={`/blog/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  variant="full"
                />
                <Link href="/#projects" className={styles.socialBtn}>
                  Explore Featured Projects ↗
                </Link>
              </div>
            </footer>
          </div>

          {/* Right Side: Fixed/Sticky Table of Contents (Article Outline) */}
          {headings.length > 0 && (
            <aside className={styles.tocSidebar} aria-label="Table of Contents">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </main>

      <Footer />
    </>
  )
}
