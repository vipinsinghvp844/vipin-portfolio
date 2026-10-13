'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from '../context/ThemeContext'
import styles from './Hero.module.css'
import PixelBlast from './PixelBlast'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero({ isLoading = false }) {
  const { isDark, toggleTheme } = useTheme()
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const timelineRef = useRef(null)

  // Background Parallax
  const bgParallaxRef = useRef(null)
  const geoLinesRef = useRef(null)

  // Scene 1 Elements
  const scene1ContainerRef = useRef(null)
  const scene1ImgRef = useRef(null)
  const scene1OverlayRef = useRef(null)
  const scene1IntroCardRef = useRef(null)
  const scene1ProfileCardRef = useRef(null)

  // Scene 2 Elements
  const scene2ContainerRef = useRef(null)
  const scene2ImgRef = useRef(null)
  const scene2OverlayRef = useRef(null)
  const scene2CardRef = useRef(null)

  const [activeScene, setActiveScene] = useState(1)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const pinContainer = pinContainerRef.current
    if (!section || !pinContainer) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024

      if (!isMobile) {
        // Desktop Pinned Parallax Scroll Animation Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: pinContainer,
            start: 'top top',
            end: '+=260%',
            scrub: 1.15,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress < 0.48) {
                setActiveScene(1)
              } else {
                setActiveScene(2)
              }
            },
          },
        })

        timelineRef.current = tl

        // 1. Background Mystic Mountains & Dots Parallax Glide
        tl.to(
          bgParallaxRef.current,
          {
            y: -110,
            scale: 1.08,
            ease: 'none',
            duration: 3,
          },
          0
        ).to(
          geoLinesRef.current,
          {
            y: -50,
            ease: 'none',
            duration: 3,
          },
          0
        )

        // 2. Initial States for Desktop
        gsap.set(scene1ImgRef.current, { scale: 1, filter: 'blur(0px)', opacity: 1, x: 0 })
        gsap.set(scene1OverlayRef.current, { opacity: 0.08 })
        gsap.set(scene1IntroCardRef.current, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' })
        gsap.set(scene1ProfileCardRef.current, { opacity: 0, y: 35, scale: 0.96, pointerEvents: 'none' })

        gsap.set(scene2ContainerRef.current, { opacity: 0, pointerEvents: 'none' })
        gsap.set(scene2ImgRef.current, { scale: 1.0, filter: 'blur(0px)', opacity: 0, x: 20 })
        gsap.set(scene2OverlayRef.current, { opacity: 0.1 })
        gsap.set(scene2CardRef.current, { x: -80, opacity: 0, scale: 0.95, pointerEvents: 'none' })

        // ─── PHASE 1: Left Shrine Zooms & Blurs; Intro Card Morphs into Profile Card Overlaid on Image
        tl.to(
          scene1ImgRef.current,
          {
            scale: 1.07,
            filter: 'blur(7px)',
            x: 0,
            ease: 'power2.inOut',
            duration: 1.2,
          },
          0
        )
          .to(
            scene1OverlayRef.current,
            {
              opacity: 0.35,
              ease: 'power2.inOut',
              duration: 1.2,
            },
            0
          )
          .to(
            scene1IntroCardRef.current,
            {
              opacity: 0,
              y: -30,
              scale: 0.94,
              pointerEvents: 'none',
              ease: 'power2.inOut',
              duration: 0.6,
            },
            0
          )
          .to(
            scene1ProfileCardRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power3.out',
              duration: 1.0,
            },
            0.3
          )

        // ─── PHASE 2: Transition from Scene 1 to Scene 2
        tl.to(
          scene1ContainerRef.current,
          {
            opacity: 0,
            y: -40,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 0.8,
          },
          1.4
        )
          .to(
            scene2ContainerRef.current,
            {
              opacity: 1,
              pointerEvents: 'auto',
              ease: 'power2.inOut',
              duration: 0.6,
            },
            1.6
          )
          .fromTo(
            scene2ImgRef.current,
            { opacity: 0, scale: 0.95, filter: 'blur(0px)', x: 20 },
            { opacity: 1, scale: 1.0, filter: 'blur(0px)', x: 0, ease: 'power2.out', duration: 0.8 },
            1.6
          )

        // ─── PHASE 3: Right Samurai Torii Image Zooms Gently with Clean Fitting; Left Card Slides IN
        tl.to(
          scene2ImgRef.current,
            {
              scale: 1.04,
              filter: 'blur(6px)',
              x: 6,
              ease: 'power2.inOut',
              duration: 1.2,
            },
            2.2
          )
          .to(
            scene2OverlayRef.current,
            {
              opacity: 0.45,
              ease: 'power2.inOut',
              duration: 1.2,
            },
            2.2
          )
          .to(
            scene2CardRef.current,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              pointerEvents: 'auto',
              ease: 'power3.out',
              duration: 1.2,
            },
            2.4
          )
      } else {
        // Mobile / Tablet: Fully visible natural layout, zero cutoffs
        gsap.set(
          [
            scene1ContainerRef.current,
            scene2ContainerRef.current,
            scene1ImgRef.current,
            scene2ImgRef.current,
            scene1IntroCardRef.current,
            scene1ProfileCardRef.current,
            scene2CardRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clearProps: 'transform,opacity,filter',
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className={styles.heroSection}
      id="hero"
      ref={sectionRef}
      aria-label="Hero — Vipin Singh Parihar, Full-Stack WordPress Developer"
    >
      {/* Pinned Viewport Container (Normal flow on mobile/tablet) */}
      <div className={styles.pinContainer} ref={pinContainerRef}>
        {/* ─── 1. Parallax Matrix Background: Dim Blurry Mystic Mountains + WebGL + Dots Grid ─── */}
        <div className={styles.bgMatrixLayer} ref={bgParallaxRef} aria-hidden="true">
          <div className={styles.mysticBgWrapper}>
            <Image
              src="/hero/Mystic Mountains Beneath the Ember Moon.png"
              alt="Mystic Mountains Beneath the Ember Moon"
              fill
              priority
              className={styles.mysticBgImage}
              sizes="100vw"
            />
            <div className={styles.mysticBgDimmer} />
          </div>

          <div className={styles.pixelBlastBg}>
            <PixelBlast
              variant="square"
              pixelSize={4}
              color="#FF6B00"
              patternScale={1.8}
              patternDensity={0.65}
              pixelSizeJitter={0}
              enableRipples={true}
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid={false}
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.4}
              edgeFade={0.28}
              transparent
            />
          </div>

          <div className={styles.dotsGridPattern} />
        </div>

        {/* Technical Geometries Lines & Crosshairs */}
        <div className={styles.geoLinesContainer} ref={geoLinesRef} aria-hidden="true">
          <div className={styles.geoLineH1} />
          <div className={styles.geoLineH2} />
          <div className={styles.geoLineV1} />
          <div className={styles.geoLineV2} />

          <span className={`${styles.cornerMark} ${styles.markTL}`}>+</span>
          <span className={`${styles.cornerMark} ${styles.markTR}`}>+</span>
          <span className={`${styles.cornerMark} ${styles.markBL}`}>+</span>
          <span className={`${styles.cornerMark} ${styles.markBR}`}>+</span>
        </div>

        {/* Telemetry Coordinate HUD (Desktop) */}
        <div className={styles.telemetryHUD}>

          <div className={styles.telemetryTopRight}>
            <button
              type="button"
              className={`${styles.themeToggleBtn} ${isDark ? styles.themeDark : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light theme"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode (🦇)`}
            >
              <span className={styles.themeEmoji}>🦇</span>
              <span className={styles.themeLabel}>{isDark ? 'DARK_MODE' : 'LIGHT_MODE'}</span>
            </button>
          </div>
        </div>

        {/* ─── 2. SCENE 1: Left Autumn Shrine + Right Profile Cards ─── */}
        <div className={styles.sceneWrapper} data-scene="1" ref={scene1ContainerRef}>
          {/* Left-Anchored Image Canvas */}
          <div className={styles.scene1ImageStage}>
            <div className={styles.imageInnerRef} ref={scene1ImgRef}>
              <Image
                src="/hero/Cinematic Autumn Lantern Portrait.png"
                alt="Glowing Autumn Shrine Under Blossoms"
                fill
                priority
                className={styles.cinematicImageCover}
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </div>
            <div className={styles.imageAtmosphereOverlay} ref={scene1OverlayRef} />
            {/* Atmospheric Left Edge Mist / Fog */}
            <div className={styles.scene1LeftFog} aria-hidden="true" />
          </div>

          {/* Right Side Card Stage */}
          <div className={styles.scene1RightStage}>
            {/* 1A. Initial "INTELLIGENT SYSTEMS" Card */}
            <div className={styles.initialIntroCard} ref={scene1IntroCardRef}>
              <div className={styles.cardHeader}>
                <div className={styles.sceneEyebrow}>
                  <span className={styles.eyebrowDash} />
                  <span>EXPLORE THE ARCHITECT</span>
                </div>
                <div className={styles.locationChip}>
                  <span className={styles.locationDot}>•</span>
                  <span>INDIA</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h1 className={styles.sceneMainHeadline}>
                  <span>WORDPRESS</span>
                  <span className={styles.headlineAccent}>
                    SYSTEMS<span className={styles.accentDot}>.</span>
                  </span>
                </h1>
                <p className={styles.sceneSubcopy}>
                  Building full-stack WordPress platforms, React.js interfaces, and modern JavaScript experiences for real-world brands.
                </p>

                <div className={styles.scrollHintPill}>
                  <span className={styles.scrollMouseIcon}>
                    <span className={styles.scrollWheel} />
                  </span>
                  <span>SCROLL TO UNVEIL PROFILE</span>
                  <span className={styles.scrollArrow}>↓</span>
                </div>
              </div>
            </div>

            {/* 1B. Detailed Profile Card */}
            <div className={styles.editorialCard} ref={scene1ProfileCardRef}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIndexBadge}>
                  <span className={styles.badgeNumber}>01</span>
                  <span className={styles.badgeSlash}>/</span>
                  <span className={styles.badgeTotal}>PROFILE</span>
                </div>
                <div className={styles.locationChip}>
                  <span className={styles.locationDot}>•</span>
                  <span>INDIA</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.roleTagWrap}>
                  <span className={styles.roleTag}>FULL-STACK WORDPRESS DEV</span>
                  <span className={styles.roleTagAccent}>• REACT &amp; JS</span>
                </div>
                <h2 className={styles.cardName}>VIPIN SINGH PARIHAR</h2>
                <p className={styles.cardBio}>
                  Full-stack WordPress developer crafting custom themes, plugins, and modern React.js / JavaScript frontends. Placeholder bio — final details coming from resume.
                </p>

                {/* Milestone Badges */}
                <div className={styles.milestoneGrid}>
                  <a
                    href="#projects"
                    className={styles.milestonePill}
                    title="WordPress Projects"
                  >
                    <span className={styles.milestoneIcon}>⚡</span>
                    <span className={styles.milestoneText}>
                      <strong>WordPress</strong> Builds
                    </span>
                    <span className={styles.milestoneArrow}>↗</span>
                  </a>
                  <a
                    href="#projects"
                    className={styles.milestonePill}
                    title="React.js Work"
                  >
                    <span className={styles.milestoneIcon}>✦</span>
                    <span className={styles.milestoneText}>
                      <strong>React.js</strong> Apps
                    </span>
                    <span className={styles.milestoneArrow}>↗</span>
                  </a>
                  <div className={styles.milestonePill}>
                    <span className={styles.milestoneIcon}>🏆</span>
                    <span className={styles.milestoneText}>
                      <strong>JavaScript</strong> Core
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className={styles.cardCtaRow}>
                  <a href="#projects" className={styles.primaryCtaBtn}>
                    <span>Explore Work</span>
                    <span className={styles.btnArrow}>↓</span>
                  </a>
                  <a href="/resume.pdf" download className={styles.secondaryCtaBtn}>
                    <span>Resume</span>
                    <span className={styles.btnArrow}>↓</span>
                  </a>
                  <a
                    href="#contact"
                    className={styles.tertiaryCtaBtn}
                    title="Get in touch"
                  >
                    <span>Contact</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>
                </div>

                {/* Quick Telemetry Counters */}
                <div className={styles.cardFooterStats}>
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>XX+</span>
                    <span className={styles.miniStatLbl}>PROJECTS</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>XX+</span>
                    <span className={styles.miniStatLbl}>YEARS EXP</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>XX+</span>
                    <span className={styles.miniStatLbl}>CLIENTS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. SCENE 2: Right Fiery Autumn Samurai + Left Core Architecture Card ─── */}
        <div className={styles.sceneWrapper} data-scene="2" ref={scene2ContainerRef}>
          {/* Right-Anchored Image Canvas */}
          <div className={styles.scene2ImageStage}>
            <div className={styles.scene2ImageInnerRef} ref={scene2ImgRef}>
              <Image
                src="/hero/Autumn Torii Selfie Portrait.png"
                alt="Fiery Autumn Samurai Selfie Overlay"
                fill
                className={styles.scene2ImageCover}
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
            </div>
            <div className={styles.imageAtmosphereOverlay} ref={scene2OverlayRef} />
          </div>

          {/* Left Card Stage */}
          <div className={styles.scene2CardWrapper} ref={scene2CardRef}>
            <div className={styles.editorialCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIndexBadge}>
                  <span className={styles.badgeNumber}>02</span>
                  <span className={styles.badgeSlash}>/</span>
                  <span className={styles.badgeTotal}>CAPABILITIES</span>
                </div>
                <div className={styles.locationChip}>
                  <span className={styles.locationPulseGreen} />
                  <span>OPEN FOR COLLABORATION</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.roleTagWrap}>
                  <span className={styles.roleTag}>SYSTEMS & CAPABILITIES</span>
                  <span className={styles.roleTagAccent}>• FULL SPECTRUM</span>
                </div>
                <h2 className={styles.cardName}>CORE ARCHITECTURE</h2>
                <p className={styles.cardBio}>
                  Specialized in custom WordPress development, React.js frontends, and full-stack JavaScript solutions for business websites and web apps.
                </p>

                {/* Capabilities Grid */}
                <div className={styles.capabilitiesGrid}>
                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>WordPress Full-Stack</strong>
                    </div>
                    <span className={styles.capDesc}>
                      Custom Themes, Plugins, WooCommerce, ACF, Gutenberg Blocks
                    </span>
                  </div>

                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>React &amp; JavaScript</strong>
                    </div>
                    <span className={styles.capDesc}>
                      React.js, Next.js, Vanilla JS, Modern ES6+, Component UI
                    </span>
                  </div>

                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>Backend &amp; CMS</strong>
                    </div>
                    <span className={styles.capDesc}>
                      PHP, MySQL, REST APIs, Custom Post Types, Headless WP
                    </span>
                  </div>

                  <div className={styles.capabilityItem}>
                    <div className={styles.capHead}>
                      <span className={styles.capDot} />
                      <strong>Delivery &amp; UX</strong>
                    </div>
                    <span className={styles.capDesc}>
                      Responsive Design, Performance, Client Sites, Maintenance
                    </span>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className={styles.cardCtaRow}>
                  <a href="#achievements" className={styles.primaryCtaBtn}>
                    <span>View Achievements</span>
                    <span className={styles.btnArrow}>→</span>
                  </a>
                  <a href="#contact" className={styles.secondaryCtaBtn}>
                    <span>Get In Touch</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>
                </div>

                {/* Highlights Footer */}
                <div className={styles.cardFooterStats}>
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>WP</span>
                    <span className={styles.miniStatLbl}>WORDPRESS</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>React</span>
                    <span className={styles.miniStatLbl}>FRONTEND</span>
                  </div>
                  <div className={styles.miniStatDivider} />
                  <div className={styles.miniStat}>
                    <span className={styles.miniStatVal}>JS</span>
                    <span className={styles.miniStatLbl}>FULL STACK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
