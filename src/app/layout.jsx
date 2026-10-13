import '../index.css'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import SmoothScrollLayout from '../components/SmoothScrollLayout'
import ScrollProgress from '../components/ScrollProgress'
import CustomCursor from '../components/CustomCursor'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const viewport = {
  themeColor: '#FF6B00',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://vipinsinghparihar.dev'),
  manifest: '/site.webmanifest',
  title: 'Vipin Singh Parihar — Full-Stack WordPress Developer | React.js & JavaScript',
  description:
    'Official portfolio of Vipin Singh Parihar — Full-Stack WordPress Developer. Building custom WordPress themes, plugins, React.js interfaces, and modern JavaScript experiences. Placeholder content until resume upload.',
  keywords: [
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
  ],
  authors: [{ name: 'Vipin Singh Parihar', url: 'https://vipinsinghparihar.dev' }],
  creator: 'Vipin Singh Parihar',
  publisher: 'Vipin Singh Parihar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vipinsinghparihar.dev',
    siteName: 'Vipin Singh Parihar Portfolio',
    title: 'Vipin Singh Parihar — Full-Stack WordPress Developer',
    description:
      'Full-Stack WordPress Developer specializing in React.js and JavaScript. Custom themes, plugins, and modern web experiences.',
    images: [
      {
        url: '/vipin.png',
        width: 1200,
        height: 630,
        alt: 'Vipin Singh Parihar — Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vipin Singh Parihar — Full-Stack WordPress Developer',
    description:
      'Full-Stack WordPress Developer specializing in React.js and JavaScript.',
    images: ['/vipin.png'],
    creator: '@vipin_placeholder',
  },
  alternates: {
    canonical: 'https://vipinsinghparihar.dev',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <header>
            <h1>Vipin Singh Parihar — Full-Stack WordPress Developer</h1>
            <p>
              Portfolio of Vipin Singh Parihar — WordPress, React.js, and JavaScript developer.
              Contact: <a href="mailto:paceholder@gmail.com">paceholder@gmail.com</a>
            </p>
          </header>
        </noscript>
        <ThemeProvider>
          <SmoothScrollLayout>
            <CustomCursor />
            <ScrollProgress />
            {children}
          </SmoothScrollLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
