import { FormEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Github,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  Menu,
  Quote,
  Send,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

type Project = {
  slug: string
  number: string
  title: string
  category: string
  year: string
  image: string
  intro: string
  impact: string
  metric: string
  stack: string[]
  problem: string
  approach: string
  solution: string
  result: string
  highlights: string[]
}

const projects: Project[] = [
  {
    slug: 'velapay',
    number: '01',
    title: 'VelaPay',
    category: 'Fintech · Android',
    year: '2025',
    image: '/project-vela.png',
    intro: 'A quiet, high-trust mobile banking experience engineered for speed, resilience, and effortless daily finance.',
    impact: 'Reframed a complex financial journey into a secure, composable Android experience that remains fast on every device tier.',
    metric: 'Frictionless by design',
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Biometrics'],
    problem: 'Frequent users were navigating dense dashboards, inconsistent transaction states, and slow authentication flows. The product needed to earn trust without adding visual or technical complexity.',
    approach: 'I mapped the critical money movement journeys, established measurable performance budgets, and aligned design, product, and backend teams around a modular domain model. Security reviews ran alongside—not after—feature design.',
    solution: 'A fully composable design system, offline-aware transaction state, biometric step-up authentication, and strongly typed navigation. Modules were separated by domain to accelerate delivery without sacrificing testability.',
    result: 'The new foundation made key journeys feel immediate, simplified release ownership, and created a scalable architecture for new financial products. The experience is calm on the surface and rigorous underneath.',
    highlights: ['Offline-aware transaction state', 'Hardware-backed biometric flows', 'Strict performance budgets'],
  },
  {
    slug: 'soma',
    number: '02',
    title: 'Soma',
    category: 'Health AI · Android',
    year: '2024',
    image: '/project-soma.png',
    intro: 'An intelligent wellbeing companion translating fragmented health signals into clear, responsible daily guidance.',
    impact: 'Brought on-device intelligence and considerate interaction design together without compromising user privacy.',
    metric: 'Private by default',
    stack: ['Compose', 'TensorFlow Lite', 'Room', 'Coroutines'],
    problem: 'People had rich health data but little context. Cloud-first recommendations introduced latency, privacy concerns, and an experience that felt generic rather than personal.',
    approach: 'I designed around data minimisation, explainability, and graceful degradation. Prototypes validated how much context users wanted before the team committed to an on-device inference pipeline.',
    solution: 'A local-first Android application with secure storage, background signal processing, and a compact ML model for personalised insights. Compose enabled an adaptive interface with accessible, low-friction check-ins.',
    result: 'Soma turned passive health signals into timely guidance while keeping sensitive data on the device. The architecture also made model updates independently testable and safe to roll out.',
    highlights: ['On-device ML inference', 'Encrypted local health store', 'Accessible adaptive UI'],
  },
  {
    slug: 'cipher-one',
    number: '03',
    title: 'Cipher One',
    category: 'Enterprise Security · Android',
    year: '2024',
    image: '/project-cipher.png',
    intro: 'Secure team communication with enterprise controls, made precise enough for administrators and simple enough for everyone else.',
    impact: 'Balanced zero-trust security requirements with a messaging experience teams could adopt without training.',
    metric: 'Zero-trust foundation',
    stack: ['Kotlin', 'gRPC', 'SQLCipher', 'Android Keystore'],
    problem: 'A distributed workforce needed confidential communication on managed and personal Android devices. Existing tools either weakened policy control or made everyday collaboration unnecessarily difficult.',
    approach: 'Threat modelling shaped every architecture decision. I partnered with security and platform teams to isolate trust boundaries, define key rotation behavior, and test recovery paths before polishing interaction details.',
    solution: 'End-to-end encrypted messaging, hardware-backed credentials, certificate pinning, and remote policy enforcement—all wrapped in a familiar, responsive Compose interface with dependable sync.',
    result: 'The product delivered enterprise-grade controls without turning security into user friction. Clear trust states and resilient synchronization improved confidence across both administrators and teams.',
    highlights: ['Hardware-backed key storage', 'Resilient gRPC synchronization', 'Policy-driven device controls'],
  },
]

const skills = [
  { label: 'Android', value: 'Kotlin, Compose, Coroutines, Jetpack, Modular Architecture' },
  { label: 'Backend', value: 'Ktor, Spring Boot, REST, gRPC, PostgreSQL, Firebase' },
  { label: 'AI / ML', value: 'TensorFlow Lite, Gemini APIs, on-device inference, RAG' },
  { label: 'Security', value: 'Keystore, Biometrics, OWASP MASVS, encryption, pinning' },
  { label: 'Tools', value: 'GitHub Actions, Gradle, Docker, Figma, Firebase, Sentry' },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
}

function Wordmark() {
  return (
    <Link className="wordmark" to="/" aria-label="Moe Kyaw Aung home">
      <span>M</span><i />
      <small>Moe Kyaw Aung</small>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark />
        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="/#work" onClick={() => setOpen(false)}>Work</a>
          <a href="/#about" onClick={() => setOpen(false)}>About</a>
          <a href="/#expertise" onClick={() => setOpen(false)}>Expertise</a>
          <a className="nav-contact" href="/#contact" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <div className="eyebrow"><span>{eyebrow}</span></div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article className="project-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }}>
      <Link to={`/case-study/${project.slug}`} className="project-image-link" aria-label={`Read ${project.title} case study`}>
        <div className="project-image">
          <img src={project.image} alt={`${project.title} Android product presentation`} />
          <span className="view-case">View case study <ArrowUpRight size={17} /></span>
        </div>
      </Link>
      <div className="project-info">
        <span className="project-number">{project.number}</span>
        <div>
          <p className="project-meta">{project.category} <i /> {project.year}</p>
          <h3><Link to={`/case-study/${project.slug}`}>{project.title}</Link></h3>
          <p>{project.impact}</p>
        </div>
        <Link className="circle-link" to={`/case-study/${project.slug}`} aria-label={`Open ${project.title}`}><ArrowRight size={20} /></Link>
      </div>
    </motion.article>
  )
}

function HomePage() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (window.location.hash) {
      window.setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
    }
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Portfolio inquiry from ${String(form.get('name'))}`)
    const body = encodeURIComponent(`${String(form.get('message'))}\n\nFrom: ${String(form.get('name'))}\nEmail: ${String(form.get('email'))}`)
    setSubmitted(true)
    window.setTimeout(() => { window.location.href = `mailto:hello@moekyawaung.dev?subject=${subject}&body=${body}` }, 500)
  }

  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="availability">
            <span /> Available for select opportunities
          </motion.div>
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>Senior Android Developer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            Moe Kyaw<br /><em>Aung.</em>
          </motion.h1>
          <motion.p className="hero-position" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.75 }}>
            I architect thoughtful Android products where performance, security, and beautifully restrained experiences meet.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }}>
            <a href="#work" className="button button-gold">Explore selected work <ArrowDown size={16} /></a>
            <a href="#contact" className="button button-ghost">Start a conversation <ArrowUpRight size={16} /></a>
          </motion.div>
        </div>

        <motion.div className="portrait-wrap" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="portrait-frame">
            <img src="/moe-portrait.png" alt="Moe Kyaw Aung, Senior Android Developer" />
            <div className="portrait-shade" />
            <span className="portrait-index">MKA — 01</span>
          </div>
          <div className="orbit-label"><Sparkles size={14} /> Based in Southeast Asia · Working globally</div>
        </motion.div>

        <a href="#work" className="scroll-cue" aria-label="Scroll to work"><span>Scroll to discover</span><i /></a>
      </section>

      <section className="signal-strip" aria-label="Professional summary">
        <div><span>01</span><p><b>Senior ownership</b>Architecture to release</p></div>
        <div><span>02</span><p><b>Android first</b>Native, scalable, refined</p></div>
        <div><span>03</span><p><b>Global mindset</b>Calm cross-team delivery</p></div>
      </section>

      <section className="section projects-section" id="work">
        <SectionHeading eyebrow="Selected work / 2024—25" title="A considered selection of products built for real-world impact." copy="Each engagement pairs rigorous engineering with an exacting attention to the experience in hand." />
        <div className="projects-list">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-grid">
          <SectionHeading eyebrow="Profile / Philosophy" title="Engineering clarity into every interaction." />
          <motion.div className="about-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <p className="large-copy">I’m a Senior Android Developer with 8+ years of experience turning ambitious product ideas into dependable, beautifully engineered mobile experiences.</p>
            <div className="about-columns">
              <p>My focus is native Android: Kotlin, Jetpack Compose, modular architecture, and the systems around them. I work comfortably from early product framing through architecture, implementation, release, and continuous improvement.</p>
              <p>Teams value my calm technical leadership, product judgment, and ability to make complicated decisions legible. I care deeply about performance, privacy, maintainability, and the details users feel—even when they never see them.</p>
            </div>
            <a href="#contact" className="text-link">Discuss your next product <ArrowRight size={17} /></a>
          </motion.div>
        </div>
      </section>

      <section className="section expertise-section" id="expertise">
        <div className="expertise-intro">
          <SectionHeading eyebrow="Capabilities / Stack" title="Depth where it matters. Range where it counts." />
          <p>A pragmatic toolkit shaped by production constraints—not trends.</p>
        </div>
        <motion.div className="skill-list" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.08 }}>
          {skills.map((skill, index) => (
            <motion.div className="skill-row" key={skill.label} variants={reveal}>
              <span>0{index + 1}</span><h3>{skill.label}</h3><p>{skill.value}</p><ArrowUpRight size={18} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section proof-section">
        <div className="proof-top">
          <div className="eyebrow"><span>Professional signal</span></div>
          <Quote size={42} strokeWidth={1} />
        </div>
        <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
          “The best Android engineering feels invisible: fast, trustworthy, and completely at home in the user’s hand.”
          <cite>— Moe Kyaw Aung, Engineering principle</cite>
        </motion.blockquote>
        <div className="proof-points">
          <div><Layers3 /><h3>Senior-level ownership</h3><p>Architecture, quality gates, release strategy, and the health of the codebase beyond launch.</p></div>
          <div><LockKeyhole /><h3>Security by design</h3><p>Privacy and threat thinking integrated from the first technical decision—not added at the end.</p></div>
          <div><Zap /><h3>Production mindset</h3><p>Performance, observability, resilience, and maintainability treated as core product features.</p></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <div className="eyebrow"><span>Contact / Inquiries</span></div>
          <h2>Building something<br /><em>exceptional?</em></h2>
          <p>I’m open to select senior Android roles, product partnerships, and technically ambitious collaborations.</p>
          <div className="contact-links">
            <a href="mailto:hello@moekyawaung.dev"><Mail size={17} /> hello@moekyawaung.dev <ArrowUpRight size={15} /></a>
            <a href="https://github.com/moekyawaung" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={15} /></a>
            <a href="https://www.linkedin.com/in/moekyawaung" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label><span>Your name</span><input name="name" type="text" placeholder="Jane Smith" required /></label>
            <label><span>Email address</span><input name="email" type="email" placeholder="jane@company.com" required /></label>
          </div>
          <label><span>What would you like to build?</span><textarea name="message" rows={5} placeholder="A brief outline of the role, product, or challenge…" required /></label>
          <button className="button button-gold submit-button" type="submit">
            {submitted ? <><Check size={17} /> Opening your email client</> : <>Send inquiry <Send size={16} /></>}
          </button>
          <small>Your details remain private. Expect a considered reply.</small>
        </form>
      </section>
    </main>
  )
}

function CaseStudyPage() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').pop()
  const project = projects.find((item) => item.slug === slug)

  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [slug])

  if (!project) return <NotFound />

  return (
    <main className="case-page">
      <section className="case-hero">
        <Link to="/#work" className="back-link"><ArrowLeft size={16} /> Back to selected work</Link>
        <motion.div className="case-title" initial="hidden" animate="visible" variants={reveal}>
          <p>{project.category} <i /> {project.year}</p>
          <h1>{project.title}</h1>
          <span>{project.intro}</span>
        </motion.div>
        <motion.div className="case-image" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }}>
          <img src={project.image} alt={`${project.title} Android app case study`} />
        </motion.div>
        <div className="case-summary">
          <div><span>Role</span><p>Lead Android Engineer</p></div>
          <div><span>Focus</span><p>{project.category.split(' · ')[0]}</p></div>
          <div><span>Stack</span><p>{project.stack.slice(0, 2).join(' / ')}</p></div>
          <div><span>Principle</span><p>{project.metric}</p></div>
        </div>
      </section>

      <section className="case-narrative">
        {[
          ['01', 'The problem', project.problem],
          ['02', 'The approach', project.approach],
          ['03', 'The solution', project.solution],
          ['04', 'The result', project.result],
        ].map(([number, title, content]) => (
          <motion.article key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <span>{number}</span><h2>{title}</h2><p>{content}</p>
          </motion.article>
        ))}
      </section>

      <section className="case-details">
        <div>
          <div className="eyebrow"><span>Technical highlights</span></div>
          <h2>Quietly rigorous,<br />from core to edge.</h2>
        </div>
        <div className="highlight-list">
          {project.highlights.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}<Check size={17} /></p>)}
          <div className="stack-chips">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="case-cta">
        <p>Want to see beneath the surface?</p>
        <h2>Explore the work,<br />or request a walkthrough.</h2>
        <div>
          <a className="button button-gold" href="https://github.com/moekyawaung" target="_blank" rel="noreferrer"><Github size={16} /> View GitHub</a>
          <a className="button button-ghost" href="mailto:hello@moekyawaung.dev?subject=Live%20demo%20request"><ArrowUpRight size={16} /> Request live demo</a>
        </div>
      </section>

      <section className="next-project">
        {(() => {
          const next = projects[(projects.indexOf(project) + 1) % projects.length]
          return <Link to={`/case-study/${next.slug}`}><span>Next case study</span><strong>{next.title}</strong><ArrowRight /></Link>
        })()}
      </section>
    </main>
  )
}

function NotFound() {
  return (
    <main className="not-found">
      <span>404 / Off the path</span><h1>Nothing here,<br /><em>beautifully.</em></h1>
      <Link className="button button-gold" to="/">Return home <ArrowRight size={16} /></Link>
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <Wordmark />
      <p>Senior Android Developer · Kotlin · Compose · Architecture</p>
      <span>© {new Date().getFullYear()} Moe Kyaw Aung</span>
    </footer>
  )
}

function PortfolioRoutes() {
  const location = useLocation()
  return (
    <div className="site-shell">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function App() {
  return <BrowserRouter><PortfolioRoutes /></BrowserRouter>
}

export default App
