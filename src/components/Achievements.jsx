'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Achievements.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const achievementsList = [
  {
    id: 0,
    number: '01',
    title: 'Placeholder Achievement 01',
    issuer: 'Placeholder Client / Company',
    year: '2026',
    desc: 'Placeholder achievement for Vipin Singh Parihar. Real milestones will be added from the resume.',
    color: 'orange',
    tags: ['WordPress', 'Placeholder', 'Full-Stack'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 1,
    number: '02',
    title: 'Placeholder Achievement 02',
    issuer: 'Placeholder — WordPress Delivery',
    year: '2025',
    desc: 'Reserved slot for a WordPress / client delivery milestone from resume.',
    color: 'emerald',
    tags: ['WordPress', 'Clients', 'Placeholder'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    id: 2,
    number: '03',
    title: 'Placeholder Achievement 03',
    issuer: 'Placeholder — React.js / JavaScript',
    year: '2025',
    desc: 'Reserved slot for React.js or JavaScript project recognition / delivery notes.',
    color: 'teal',
    tags: ['React.js', 'JavaScript', 'Placeholder'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 3,
    number: '04',
    title: 'Placeholder Achievement 04',
    issuer: 'Placeholder Organization',
    year: '2024',
    desc: 'Temporary achievement card. Update after resume upload.',
    color: 'purple',
    tags: ['Placeholder', 'Career'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
]

const cardThemeMap = {
  orange: { accent: '#FF7700', rgb: '255, 119, 0' },
  emerald: { accent: '#10B981', rgb: '16, 185, 129' },
  teal: { accent: '#06B6D4', rgb: '6, 182, 212' },
  purple: { accent: '#A855F7', rgb: '168, 85, 247' },
  blue: { accent: '#3B82F6', rgb: '59, 130, 246' },
  rose: { accent: '#F43F5E', rgb: '244, 63, 94' },
  mint: { accent: '#0D9488', rgb: '13, 148, 136' },
  indigo: { accent: '#6366F1', rgb: '99, 102, 241' },
}

export default function Achievements() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const progressFillRef = useRef(null)
  const counterNumRef = useRef(null)
  const lastActiveIdxRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    let gsapCtx

    gsapCtx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      // Total horizontal distance to travel
      const totalScrollDistance = () => track.scrollWidth - window.innerWidth + 200

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(totalScrollDistance() + 1400, 2800)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const idx = Math.min(Math.floor(p * achievementsList.length), achievementsList.length - 1)

            // Zero React re-renders: update DOM directly only when index changes
            if (lastActiveIdxRef.current !== idx) {
              lastActiveIdxRef.current = idx
              if (counterNumRef.current) {
                counterNumRef.current.textContent = String(idx + 1).padStart(2, '0')
              }
            }
          },
        },
      })

      // GPU-accelerated Progress Bar Fill
      if (progressFillRef.current) {
        tl.fromTo(
          progressFillRef.current,
          { scaleX: 0.04 },
          { scaleX: 1, ease: 'none', duration: 3.0 },
          0
        )
      }

      // Phase 1 (Sketch Step 1): All cards swoop in from bottom-right on a curved arc with staggered flow
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          {
            x: 520,
            y: 340,
            rotation: 18,
            scale: 0.75,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.85,
            stagger: 0.12,
          },
          0
        )
      }

      // Phase 2 (Sketch Step 2 - "move"): Horizontal track translation from right to left
      tl.to(
        track,
        {
          x: () => -(track.scrollWidth - window.innerWidth + 140),
          ease: 'none',
          duration: 2.4,
        },
        0.55
      )
    }, section)

    return () => {
      if (gsapCtx) gsapCtx.revert()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="achievements" className={styles.horizontalSection} aria-label="Achievements">
      {/* Background Ambience Grid */}
      <div className={styles.ambientGrid} />

      {/* Top Header Row */}
      <div className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.sectionBadge}>
            <span className={styles.pulseDot} />
            <span>HONORS & MILESTONES</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Achievements & <span className={styles.accentText}>Credentials.</span>
          </h2>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.counterBox}>
            <span ref={counterNumRef} className={styles.activeNum}>
              01
            </span>
            <span className={styles.counterDivider}>/</span>
            <span className={styles.totalNum}>
              {String(achievementsList.length).padStart(2, '0')}
            </span>
          </div>

          <div className={styles.scrollIndicator}>
            <span>SCROLL HORIZONTALLY</span>
            <span className={styles.scrollArrow}>➔</span>
          </div>
        </div>
      </div>

      {/* Horizontal Viewport Window (Showing ~3 Cards with Fogged/Masked Edges) */}
      <div className={styles.viewportWindow}>
        {/* Left and Right Fog / Vignette Gradients */}
        <div className={styles.fogLeft} aria-hidden="true" />
        <div className={styles.fogRight} aria-hidden="true" />

        {/* Horizontal Moving Track */}
        <div ref={trackRef} className={styles.horizontalTrack}>
          {achievementsList.map((item, idx) => {
            const theme = cardThemeMap[item.color] || cardThemeMap.orange

            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={styles.cardSlide}
                style={{
                  '--card-accent': theme.accent,
                  '--card-accent-rgb': theme.rgb,
                }}
              >
                <div className={`${styles.card} ${styles[`card_${item.color}`] || ''}`}>
                  {/* Top Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrap}>
                      <div className={styles.iconBadge}>{item.icon}</div>
                      <span className={styles.cardIndex}>{item.number}</span>
                    </div>

                    <div className={styles.yearBadge}>{item.year}</div>
                  </div>

                  {/* Title & Issuer */}
                  <div className={styles.titleSection}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.issuerText}>{item.issuer}</span>
                  </div>

                  {/* Description Box */}
                  <div className={styles.descBox}>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>

                  {/* Footer Tags & Verified Badge */}
                  <div className={styles.cardFooter}>
                    <div className={styles.tagList}>
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.verifiedRow}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.progressBarTrack}>
          <div ref={progressFillRef} className={styles.progressBarFill} />
        </div>
      </div>
    </section>
  )
}
