'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import FlexCarousel from '../../components/FlexCarousel'
import styles from './gallery.module.css'

const GALLERY_ITEMS = [
  {
    src: '/vipin.png',
    alt: 'Vipin Singh Parihar — Placeholder Portrait',
  },
  {
    src: '/hero/Mystic Mountains Beneath the Ember Moon.png',
    alt: 'Placeholder Atmosphere 01',
  },
  {
    src: '/hero/Autumn Shrine Contemplation Sticker.png',
    alt: 'Placeholder Atmosphere 02',
  },
  {
    src: '/hero/Fiery Autumn Samurai Selfie Overlay.png',
    alt: 'Placeholder Atmosphere 03',
  },
  {
    src: '/hero/Sunlit Torii Mountain Sanctuary.png',
    alt: 'Placeholder Atmosphere 04',
  },
  {
    src: '/hero/Glowing Autumn Shrine Under Blossoms.png',
    alt: 'Placeholder Atmosphere 05',
  },
]

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      {/* ── Back Button ──────────────────────────────────── */}
      <Link href="/" className={styles.backBtn} aria-label="Back to Portfolio">
        <ArrowLeft size={18} />
        <span>Back</span>
      </Link>


      {/* ── FlexCarousel WebGL Carousel (Large Prominent Responsive Container) ── */}
      <div className={styles.carouselContainer}>
        <FlexCarousel
          items={GALLERY_ITEMS}
          preset="liquid"
          intro="rise"
          cardHeight={0.68}
          gap={20}
          squeeze={0.12}
          focusOnClick
          captions
          fit="natural"
          radius={4}
          lensWidth={0.76}
          lensHeight={1.12}
          tilt={48}
          roundness={1}
          bend={0.32}
          reach={0.36}
          curl="twist"
          dispersion={0.42}
          liquid={0.04}
          followCursor={false}
          autoplay={false}
          interval={4}
          captureWheel
        />
      </div>

      {/* ── Glass Info Card ──────────────────────────────── */}
      <div className={styles.glassCard}>
        <span className={styles.glassAccent}>Memories</span>
        <h2 className={styles.glassName}>VIPIN</h2>
      </div>
    </div>
  )
}
