/**
 * Simplified SEO keywords for Vipin Singh Parihar (placeholder phase)
 */

export const HOME_PAGE_KEYWORDS = [
  'Vipin Singh Parihar',
  'Vipin Parihar',
  'full stack wordpress developer',
  'wordpress developer',
  'react.js developer',
  'javascript developer',
  'custom wordpress themes',
  'woocommerce developer',
  'php wordpress',
  'portfolio',
]

export const PROJECTS_PAGE_KEYWORDS = [
  ...HOME_PAGE_KEYWORDS,
  'wordpress projects',
  'react projects',
  'portfolio projects',
]

export const BLOG_PAGE_KEYWORDS = [
  ...HOME_PAGE_KEYWORDS,
  'wordpress blog',
  'web development articles',
]

export const NOT_FOUND_PAGE_KEYWORDS = [
  ...HOME_PAGE_KEYWORDS,
  'page not found',
]

export const ACTIVITY_PAGE_KEYWORDS = [
  ...HOME_PAGE_KEYWORDS,
  'developer activity',
]

export function formatKeywords(keywords) {
  if (!keywords) return ''
  if (Array.isArray(keywords)) return keywords.join(', ')
  return String(keywords)
}

export const BLOG_POSTS_SEO = {}

export function getBlogPostSeo(slug) {
  const data = BLOG_POSTS_SEO[slug] || {
    title: `${slug} | Vipin Singh Parihar`,
    description: 'Placeholder blog post by Vipin Singh Parihar — Full-Stack WordPress Developer.',
    keywords: HOME_PAGE_KEYWORDS,
    canonicalUrl: `https://vipinsinghparihar.dev/blog/${slug}`,
  }
  return data
}

export default {
  HOME_PAGE_KEYWORDS,
  formatKeywords,
  BLOG_POSTS_SEO,
  getBlogPostSeo,
}
