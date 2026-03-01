import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "HTML5", level: 92, icon: "🌐", category: "Frontend" },
  { name: "CSS3", level: 88, icon: "🎨", category: "Frontend" },
  { name: "JavaScript", level: 72, icon: "⚡", category: "Frontend" },
  { name: "Bootstrap", level: 85, icon: "📐", category: "Frontend" },
  { name: "jQuery", level: 78, icon: "🔧", category: "Frontend" },
  { name: "PHP", level: 65, icon: "🖥️", category: "Backend" },
  { name: "Git/GitHub", level: 80, icon: "🌿", category: "Tools" },
  { name: "VS Code", level: 90, icon: "💻", category: "Tools" },
];

const PROJECTS = [
  { title: "E-Commerce UI", desc: "Fully responsive e-commerce front-end with cart UI, product grids, and dynamic filters.", tags: ["HTML5", "CSS3", "Bootstrap", "jQuery"], color: "#00e5ff", icon: "🛒" },
  { title: "Personal Blog Platform", desc: "A PHP-powered blog with CRUD operations, admin dashboard, and clean reading experience.", tags: ["PHP", "MySQL", "HTML5", "CSS3"], color: "#ff6b6b", icon: "📝" },
  { title: "University Portal UI", desc: "Student-facing university portal mockup with timetable, notices, and profile management.", tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"], color: "#a8ff78", icon: "🏫" },
  { title: "Weather Dashboard", desc: "Clean weather app UI with location-based search, animated icons, and responsive layout.", tags: ["HTML5", "CSS3", "JavaScript"], color: "#f7971e", icon: "🌤️" },
];

const INFO_ITEMS = [
  ["🎓", "Degree", "BSc in CSE"],
  ["🏛️", "University", "Metropolitan University"],
  ["📦", "Batch", "58"],
  ["📅", "Year", "4th Year"],
  ["💡", "Focus", "Frontend Development"],
  ["🌍", "Location", "Bangladesh"],
];

const CONTACT_ITEMS = [
  { icon: "📧", label: "Email", val: "yousuf.cse@metrouni.edu.bd" },
  { icon: "🎓", label: "University", val: "Metropolitan University" },
  { icon: "📍", label: "Location", val: "Bangladesh" },
  { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/yousuf-nazib" },
  { icon: "🐙", label: "GitHub", val: "github.com/yousuf-nazib" },
];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setAnimIn(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSkillsVisible(true),
      { threshold: 0.2 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={styles.root}>
      {/* Custom cursor - hidden on mobile */}
      <div style={{ ...styles.cursor, left: cursorPos.x, top: cursorPos.y, transform: `translate(-50%, -50%) scale(${hovering ? 2 : 1})`, display: window.innerWidth < 768 ? 'none' : 'block' }} />

      {/* Background elements */}
      <div style={styles.bgGrid} />
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      {/* Navigation */}
      <nav style={{ ...styles.nav, ...(scrolled && styles.navScrolled) }}>
        <div style={styles.navLogo}>
          <span style={styles.logoAngle}>&lt;</span>
          <span style={styles.logoName}>Yousuf</span>
          <span style={styles.logoAngle}>/&gt;</span>
        </div>
        <div style={styles.navLinks}>
          {NAV_LINKS.map(l => (
            <button key={l} style={{ ...styles.navBtn, ...(active === l && styles.navBtnActive) }} onClick={() => scrollTo(l)} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              {l}
            </button>
          ))}
        </div>
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map(l => <button key={l} style={styles.mobileNavBtn} onClick={() => scrollTo(l)}>{l}</button>)}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={{ ...styles.heroContent, opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(40px)" }}>
          <div style={styles.badge}>✦ Available for Internship & Projects</div>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroHi}>Hello, I'm</span><br />
            <span style={styles.heroName}>Md Yousuf</span><br />
            <span style={styles.heroName2}>Bin Nazib</span>
          </h1>
          <p style={styles.heroSub}>
            Frontend Developer · BSc CSE Student · Batch 58<br />
            <span style={styles.heroUni}>Metropolitan University</span>
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => scrollTo("Projects")}>View Projects →</button>
            <button style={styles.btnOutline} onClick={() => scrollTo("Contact")}>Hire Me</button>
          </div>
        </div>
        <div style={{ ...styles.heroIllustration, opacity: animIn ? 1 : 0, transform: animIn ? "scale(1)" : "scale(0.8)" }}>
          <div style={styles.avatarRing}>
            <div style={styles.avatarInner}>
              <img src="https://i.ibb.co.com/1JX3DtnY/image.png" alt="Md Yousuf Bin Nazib" style={styles.avatarImage} />
            </div>
          </div>
          <div style={styles.floatingTag1}>{"<Frontend />"}</div>
          <div style={styles.floatingTag2}>{"{ PHP }"}</div>
          <div style={styles.floatingTag3}>Bootstrap</div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.section}>
        <SectionLabel>About Me</SectionLabel>
        <div style={styles.aboutGrid}>
          <div style={styles.aboutText}>
            <h2 style={styles.sectionTitle}>Crafting digital experiences<br /><span style={styles.accent}>one pixel at a time.</span></h2>
            <p style={styles.bodyText}>I'm a 4th-year BSc student in Computer Science & Engineering at Metropolitan University (Batch 58), with a deep passion for building clean, responsive, and user-centric web applications.</p>
            <p style={styles.bodyText}>My journey in web development started with HTML & CSS, and has grown into a versatile skill set spanning JavaScript, Bootstrap, jQuery, and PHP backend development.</p>
            <div style={styles.statsRow}>
              {[
                { val: "4th", label: "Year" },
                { val: "58", label: "Batch" },
                { val: "5+", label: "Projects" },
                { val: "CSE", label: "Dept" },
              ].map(s => (
                <div key={s.label} style={styles.statBox}>
                  <span style={styles.statVal}>{s.val}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.aboutCard}>
            <div style={styles.infoCard}>
              <h3 style={styles.cardTitle}>Quick Info</h3>
              {INFO_ITEMS.map(([icon, key, val]) => (
                <div key={key} style={styles.infoRow}>
                  <span style={styles.infoIcon}>{icon}</span>
                  <span style={styles.infoKey}>{key}:</span>
                  <span style={styles.infoVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ ...styles.section, ...styles.sectionDark }} ref={skillsRef}>
        <SectionLabel>Skills</SectionLabel>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>My <span style={styles.accent}>Technical Arsenal</span></h2>
        <p style={{ ...styles.bodyText, textAlign: "center", marginBottom: 40 }}>Tools and technologies I work with daily</p>
        <div style={styles.skillsGrid}>
          {SKILLS.map((sk, i) => (
            <div key={sk.name} style={styles.skillCard}>
              <div style={styles.skillTop}>
                <span style={styles.skillIcon}>{sk.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={styles.skillName}>{sk.name}</div>
                  <div style={styles.skillCat}>{sk.category}</div>
                </div>
                <span style={styles.skillPct}>{sk.level}%</span>
              </div>
              <div style={styles.barBg}>
                <div style={{ ...styles.barFill, width: skillsVisible ? `${sk.level}%` : "0%", transition: `width 1s ease ${i * 0.1}s` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={styles.toolsRow}>
          {["Git", "GitHub", "VS Code", "XAMPP"].map(t => <span key={t} style={styles.toolChip}>{t}</span>)}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={styles.section}>
        <SectionLabel>Projects</SectionLabel>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center", marginBottom: 40 }}>Things I've <span style={styles.accent}>Built</span></h2>
        <div style={styles.projectsGrid}>
          {PROJECTS.map(p => (
            <div key={p.title} style={styles.projectCard}>
              <div style={{ ...styles.projectIconBox, background: `${p.color}18`, border: `1px solid ${p.color}44` }}>
                <span style={styles.projectIcon}>{p.icon}</span>
              </div>
              <div style={{ ...styles.projectAccentLine, background: p.color }} />
              <h3 style={styles.projectTitle}>{p.title}</h3>
              <p style={styles.projectDesc}>{p.desc}</p>
              <div style={styles.tagRow}>
                {p.tags.map(t => <span key={t} style={{ ...styles.tag, borderColor: `${p.color}66`, color: p.color }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ ...styles.section, ...styles.sectionDark }}>
        <SectionLabel>Contact</SectionLabel>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Let's <span style={styles.accent}>Connect</span></h2>
        <p style={{ ...styles.bodyText, textAlign: "center", marginBottom: 40 }}>Open for internships, collaborations, and exciting projects</p>
        <div style={styles.contactGrid}>
          <div style={styles.contactInfo}>
            {CONTACT_ITEMS.map(c => (
              <div key={c.label} style={styles.contactItem}>
                <span style={styles.contactIcon}>{c.icon}</span>
                <div>
                  <div style={styles.contactLabel}>{c.label}</div>
                  <div style={styles.contactVal}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={styles.contactForm}>
            <input style={styles.input} placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input style={styles.input} placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <textarea style={{ ...styles.input, ...styles.textarea }} placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
            <button type="submit" style={styles.btnPrimary}>{sent ? "✓ Message Sent!" : "Send Message →"}</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerText}>Designed & built with ❤️ by <span style={styles.accent}>Md Yousuf Bin Nazib</span></span>
        <span style={styles.footerSub}>BSc CSE · Batch 58 · Metropolitan University · © 2025</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @media (min-width: 769px) { * { cursor: none; } }
        html { scroll-behavior: smooth; }
        body { background: #080c14; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #00e5ff55; border-radius: 4px; }
        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-14px) rotate(-6deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(8deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        @keyframes float3 { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-18px) rotate(-3deg)} }
        @keyframes ringPulse { 0%,100%{box-shadow:0 0 0 0 #00e5ff33} 50%{box-shadow:0 0 0 20px #00e5ff00} }
      `}</style>
    </div>
  );
}

const SectionLabel = ({ children }) => (
  <div style={labelStyle}>
    <span style={labelDot} />{children}<span style={labelDot} />
  </div>
);

const labelStyle = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
  fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.2em",
  textTransform: "uppercase", color: "#00e5ff", marginBottom: 24,
};
const labelDot = { display: "inline-block", width: 24, height: 1, background: "#00e5ff" };

const styles = {
  root: { fontFamily: "'Syne', sans-serif", background: "#080c14", color: "#e8eaf0", minHeight: "100vh", overflowX: "hidden", position: "relative" },
  
  cursor: { position: "fixed", width: 14, height: 14, background: "#00e5ff", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "difference", transition: "transform 0.15s ease" },
  
  bgGrid: { position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 },
  bgGlow1: { position: "fixed", top: "-20%", right: "-10%", width: "min(700px, 80vw)", height: "min(700px, 80vw)", background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 },
  bgGlow2: { position: "fixed", bottom: "-20%", left: "-10%", width: "min(600px, 70vw)", height: "min(600px, 70vw)", background: "radial-gradient(circle, rgba(138,43,226,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 },

  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(20px, 5vw, 60px)", transition: "all 0.3s ease" },
  navScrolled: { background: "rgba(8,12,20,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,229,255,0.1)", padding: "14px clamp(20px, 5vw, 60px)" },
  navLogo: { fontFamily: "'DM Mono', monospace", fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 500, color: "#e8eaf0" },
  logoAngle: { color: "#00e5ff" },
  logoName: { margin: "0 4px", color: "#fff", fontWeight: 700 },
  navLinks: { display: "flex", gap: 8, "@media (max-width: 768px)": { display: "none" } },
  navBtn: { background: "none", border: "none", color: "#9da8c0", fontFamily: "'Syne', sans-serif", fontSize: "clamp(12px, 3vw, 14px)", fontWeight: 600, padding: "8px clamp(10px, 2vw, 18px)", borderRadius: 8, transition: "all 0.2s ease", letterSpacing: "0.05em" },
  navBtnActive: { color: "#00e5ff", background: "rgba(0,229,255,0.08)" },
  hamburger: { display: "none", background: "none", border: "none", color: "#00e5ff", fontSize: 24, "@media (max-width: 768px)": { display: "block" } },
  mobileMenu: { position: "fixed", top: 70, left: 0, right: 0, background: "#080c14", borderBottom: "1px solid rgba(0,229,255,0.15)", zIndex: 99, display: "flex", flexDirection: "column", padding: "20px", gap: 8 },
  mobileNavBtn: { background: "none", border: "none", color: "#e8eaf0", fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 600, padding: "12px 0", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)" },

  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(30px, 5vw, 80px)", padding: "100px clamp(20px, 5vw, 60px) 60px", position: "relative", zIndex: 1, flexWrap: "wrap" },
  heroContent: { maxWidth: "min(560px, 100%)" },
  badge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.25)", color: "#00e5ff", fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 2.5vw, 12px)", padding: "8px clamp(12px, 3vw, 18px)", borderRadius: 100, marginBottom: "clamp(20px, 4vw, 32px)", letterSpacing: "0.1em" },
  heroTitle: { fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: "clamp(16px, 3vw, 24px)" },
  heroHi: { fontSize: "clamp(14px, 3vw, 22px)", fontWeight: 400, color: "#9da8c0", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" },
  heroName: { background: "linear-gradient(135deg, #ffffff 0%, #00e5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroName2: { background: "linear-gradient(135deg, #00e5ff 0%, #8a2be2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSub: { fontSize: "clamp(14px, 3vw, 17px)", color: "#9da8c0", lineHeight: 1.7, marginBottom: "clamp(30px, 5vw, 40px)" },
  heroUni: { color: "#00e5ff", fontFamily: "'DM Mono', monospace", fontSize: "clamp(12px, 2.5vw, 14px)" },
  heroBtns: { display: "flex", gap: "clamp(12px, 3vw, 16px)", flexWrap: "wrap" },
  btnPrimary: { background: "linear-gradient(135deg, #00e5ff, #0090a8)", color: "#080c14", border: "none", padding: "clamp(10px, 2.5vw, 14px) clamp(20px, 4vw, 32px)", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(13px, 2.5vw, 15px)", letterSpacing: "0.05em", transition: "all 0.2s ease", boxShadow: "0 0 30px rgba(0,229,255,0.25)" },
  btnOutline: { background: "transparent", color: "#00e5ff", border: "1px solid rgba(0,229,255,0.4)", padding: "clamp(10px, 2.5vw, 14px) clamp(20px, 4vw, 32px)", borderRadius: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(13px, 2.5vw, 15px)", letterSpacing: "0.05em", transition: "all 0.2s ease" },

  heroIllustration: { position: "relative", width: "min(320px, 80vw)", height: "min(320px, 80vw)", display: "flex", alignItems: "center", justifyContent: "center" },
  avatarRing: { width: "min(220px, 55vw)", height: "min(220px, 55vw)", borderRadius: "50%", border: "2px solid rgba(0,229,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "ringPulse 3s ease-in-out infinite", background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)" },
  avatarInner: { width: "min(160px, 40vw)", height: "min(160px, 40vw)", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(0,229,255,0.5)", boxShadow: "0 0 60px rgba(0,229,255,0.2)" },
  avatarImage: { width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" },
  floatingTag1: { position: "absolute", top: "clamp(0px, 2vw, 20px)", right: "clamp(-20px, -2vw, -10px)", background: "rgba(0,229,255,0.12)", border: "1px solid rgba(0,229,255,0.3)", color: "#00e5ff", fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 2vw, 13px)", padding: "clamp(4px, 1.5vw, 8px) clamp(8px, 2vw, 16px)", borderRadius: 8, animation: "float1 4s ease-in-out infinite", whiteSpace: "nowrap" },
  floatingTag2: { position: "absolute", bottom: "clamp(10px, 3vw, 30px)", left: "clamp(-30px, -4vw, -20px)", background: "rgba(138,43,226,0.12)", border: "1px solid rgba(138,43,226,0.3)", color: "#c084fc", fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 2vw, 13px)", padding: "clamp(4px, 1.5vw, 8px) clamp(8px, 2vw, 16px)", borderRadius: 8, animation: "float2 3.5s ease-in-out infinite", whiteSpace: "nowrap" },
  floatingTag3: { position: "absolute", top: "clamp(40px, 8vw, 80px)", left: "clamp(-40px, -5vw, -30px)", background: "rgba(255,107,107,0.12)", border: "1px solid rgba(255,107,107,0.3)", color: "#ff6b6b", fontFamily: "'DM Mono', monospace", fontSize: "clamp(10px, 2vw, 12px)", padding: "clamp(4px, 1.5vw, 8px) clamp(8px, 2vw, 14px)", borderRadius: 8, animation: "float3 5s ease-in-out infinite", whiteSpace: "nowrap" },

  section: { padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 60px)", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 },
  sectionDark: { maxWidth: "100%", background: "rgba(0,229,255,0.02)", borderTop: "1px solid rgba(0,229,255,0.07)", borderBottom: "1px solid rgba(0,229,255,0.07)" },
  sectionTitle: { fontSize: "clamp(24px, 6vw, 46px)", fontWeight: 800, lineHeight: 1.2, marginBottom: 24 },
  accent: { background: "linear-gradient(135deg, #00e5ff, #8a2be2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  bodyText: { fontSize: "clamp(14px, 3vw, 16px)", color: "#9da8c0", lineHeight: 1.8, marginBottom: 20 },

  aboutGrid: { display: "flex", gap: "clamp(30px, 5vw, 60px)", alignItems: "flex-start", flexWrap: "wrap" },
  aboutText: { flex: "1 1 300px" },
  aboutCard: { flex: "0 1 320px", width: "100%" },

  statsRow: { display: "flex", gap: "clamp(10px, 2vw, 20px)", marginTop: 40, flexWrap: "wrap" },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 14, padding: "clamp(12px, 2vw, 18px) clamp(16px, 3vw, 24px)", flex: "1 1 auto", minWidth: "80px" },
  statVal: { fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, color: "#00e5ff" },
  statLabel: { fontSize: "clamp(10px, 2vw, 12px)", color: "#9da8c0", marginTop: 4, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" },

  infoCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,229,255,0.12)", borderRadius: 18, padding: "clamp(20px, 4vw, 32px)" },
  cardTitle: { fontSize: "clamp(14px, 3vw, 16px)", fontWeight: 700, color: "#00e5ff", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", marginBottom: 24, textTransform: "uppercase" },
  infoRow: { display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 12px)", marginBottom: 14, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" },
  infoIcon: { fontSize: "clamp(16px, 3vw, 18px)", minWidth: 24 },
  infoKey: { color: "#9da8c0", fontSize: "clamp(12px, 2.5vw, 13px)", fontFamily: "'DM Mono', monospace", minWidth: 70 },
  infoVal: { color: "#e8eaf0", fontSize: "clamp(13px, 2.5vw, 14px)", fontWeight: 600 },

  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto 40px" },
  skillCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,229,255,0.1)", borderRadius: 16, padding: "clamp(16px, 3vw, 24px)" },
  skillTop: { display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 14px)", marginBottom: 16, flexWrap: "wrap" },
  skillIcon: { fontSize: "clamp(24px, 4vw, 28px)" },
  skillName: { fontWeight: 700, fontSize: "clamp(14px, 2.5vw, 15px)", color: "#e8eaf0" },
  skillCat: { fontSize: "clamp(11px, 2vw, 12px)", color: "#9da8c0", fontFamily: "'DM Mono', monospace", marginTop: 2 },
  skillPct: { fontFamily: "'DM Mono', monospace", fontSize: "clamp(13px, 2.5vw, 14px)", color: "#00e5ff", fontWeight: 500 },
  barBg: { height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" },
  barFill: { height: "100%", background: "linear-gradient(90deg, #00e5ff, #8a2be2)", borderRadius: 100 },

  toolsRow: { display: "flex", gap: "clamp(8px, 2vw, 12px)", justifyContent: "center", flexWrap: "wrap" },
  toolChip: { background: "rgba(138,43,226,0.1)", border: "1px solid rgba(138,43,226,0.3)", color: "#c084fc", fontFamily: "'DM Mono', monospace", fontSize: "clamp(11px, 2vw, 13px)", padding: "clamp(6px, 1.5vw, 10px) clamp(16px, 3vw, 24px)", borderRadius: 100, letterSpacing: "0.1em" },

  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 24 },
  projectCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(20px, 4vw, 32px)", position: "relative", overflow: "hidden", transition: "all 0.3s ease", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" },
  projectIconBox: { width: "clamp(44px, 8vw, 56px)", height: "clamp(44px, 8vw, 56px)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  projectIcon: { fontSize: "clamp(24px, 4vw, 28px)" },
  projectAccentLine: { position: "absolute", top: 0, left: 0, right: 0, height: 2, opacity: 0.6 },
  projectTitle: { fontSize: "clamp(18px, 3.5vw, 20px)", fontWeight: 800, color: "#e8eaf0", marginBottom: 12 },
  projectDesc: { fontSize: "clamp(13px, 2.5vw, 14px)", color: "#9da8c0", lineHeight: 1.7, marginBottom: 20 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: { border: "1px solid", fontSize: "clamp(10px, 2vw, 11px)", padding: "4px clamp(8px, 1.5vw, 12px)", borderRadius: 100, fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" },

  contactGrid: { display: "flex", gap: "clamp(30px, 5vw, 60px)", flexWrap: "wrap" },
  contactInfo: { flex: "1 1 300px" },
  contactItem: { display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,229,255,0.08)", borderRadius: 12 },
  contactIcon: { fontSize: "clamp(18px, 3vw, 22px)", marginTop: 2 },
  contactLabel: { fontSize: "clamp(10px, 2vw, 11px)", color: "#9da8c0", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 },
  contactVal: { fontSize: "clamp(13px, 2.5vw, 14px)", color: "#e8eaf0", fontWeight: 600, wordBreak: "break-all" },
  contactForm: { flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 16 },
  input: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 10, padding: "14px 20px", color: "#e8eaf0", fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 2.5vw, 14px)", outline: "none", transition: "border-color 0.2s ease", width: "100%" },
  textarea: { minHeight: 140, resize: "vertical" },

  footer: { textAlign: "center", padding: "40px 20px", borderTop: "1px solid rgba(0,229,255,0.08)", display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 1 },
  footerText: { fontSize: "clamp(13px, 2.5vw, 15px)", color: "#9da8c0" },
  footerSub: { fontSize: "clamp(11px, 2vw, 12px)", color: "#4a5568", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" },
};

// Media query overrides for mobile
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .navLinks { display: none; }
    .hamburger { display: block; }
    .hero { flex-direction: column; text-align: center; }
    .heroBtns { justify-content: center; }
    .statsRow { justify-content: center; }
    .contactItem { flex-wrap: wrap; }
  }
`;
document.head.appendChild(style);