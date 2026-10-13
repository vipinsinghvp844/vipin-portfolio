/**
 * Placeholder blog posts for Vipin Singh Parihar
 */

export const BLOG_POSTS = [
  {
    id: '1',
    slug: 'placeholder-wordpress-development',
    title: 'Placeholder: Building Custom WordPress Sites',
    excerpt:
      'Temporary blog post. Real articles about WordPress, React.js, and JavaScript will be added later.',
    category: 'WordPress',
    color: 'orange',
    date: 'Oct 05, 2026',
    readTime: '3 min read',
    tags: ['WordPress', 'Full-Stack', 'Placeholder'],
    content: `
### Placeholder Article

This is a temporary blog post for **Vipin Singh Parihar**'s portfolio.

Content about WordPress development, React.js, and JavaScript will replace this once resume and real writing are ready.

---

### Coming Soon

- Custom theme notes
- Plugin architecture tips
- React + WordPress (headless) ideas
`,
  },
  {
    id: '2',
    slug: 'placeholder-react-javascript',
    title: 'Placeholder: React.js & Modern JavaScript',
    excerpt:
      'Temporary post covering React.js / JS topics. Replace with real content later.',
    category: 'React.js',
    color: 'purple',
    date: 'Oct 01, 2026',
    readTime: '3 min read',
    tags: ['React.js', 'JavaScript', 'Placeholder'],
    content: `
### Placeholder Article

Short placeholder for frontend / React.js writing. Final posts will be uploaded with the resume package.
`,
  },
  {
    id: '3',
    slug: 'placeholder-client-delivery',
    title: 'Placeholder: Client Delivery & Maintenance',
    excerpt:
      'Temporary notes on shipping and maintaining client websites. Details pending.',
    category: 'Delivery',
    color: 'blue',
    date: 'Sep 20, 2026',
    readTime: '2 min read',
    tags: ['Clients', 'WordPress', 'Placeholder'],
    content: `
### Placeholder Article

Delivery workflow, handoff, and maintenance notes will go here.
`,
  },
]

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null
}
