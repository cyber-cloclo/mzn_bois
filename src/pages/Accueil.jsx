import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ESSENCES = [
  {
    nom: 'Okoumé',
    latin: 'Aucoumea klaineana',
    icon: '🟤',
    origine: 'Gabon · Côte d\'Ivoire',
    densite: '430 kg/m³',
    usage: 'Contreplaqué, menuiserie intérieure, emballage',
    certif: 'FLEGT · EUDR',
    desc: 'Essence emblématique du Gabon, légère et facile à travailler. Parfaite pour la fabrication de contreplaqués haut de gamme et la menuiserie fine.',
    color: '#8B5E3C',
  },
  {
    nom: 'Azobé',
    latin: 'Lophira alata',
    icon: '🔴',
    origine: 'Gabon · Cameroun',
    densite: '1050 kg/m³',
    usage: 'Pontons, charpentes marines, traverses',
    certif: 'FLEGT · CITES',
    desc: 'Bois extrêmement dur et résistant à l\'eau. Utilisé pour les constructions marines, les pontons et les infrastructures soumises à de fortes contraintes.',
    color: '#7B2D00',
  },
  {
    nom: 'Padouk',
    latin: 'Pterocarpus soyauxii',
    icon: '🟠',
    origine: 'Gabon · Congo',
    densite: '740 kg/m³',
    usage: 'Parquet, mobilier haut de gamme, sculpture',
    certif: 'FLEGT · EUDR',
    desc: 'Reconnaissable à sa teinte rouge vif évoluant vers le brun doré. Très prisé pour les parquets nobles et le mobilier de luxe.',
    color: '#C84B00',
  },
  {
    nom: 'Sipo',
    latin: 'Entandrophragma utile',
    icon: '🟤',
    origine: 'Gabon · Côte d\'Ivoire',
    densite: '620 kg/m³',
    usage: 'Menuiserie extérieure, meubles, placage',
    certif: 'FLEGT',
    desc: 'Acajou africain par excellence. Grain fin, bonne stabilité dimensionnelle. Idéal pour la menuiserie extérieure et les ouvrages nécessitant durabilité et esthétique.',
    color: '#6B3A2A',
  },
]

const STATS = [
  { val: '25 ans', label: "d'expertise export" },
  { val: '40+',   label: 'pays livrés' },
  { val: '98%',   label: 'taux de satisfaction' },
  { val: '12',    label: 'essences certifiées' },
]

export default function Accueil() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeEssence, setActiveEssence] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#0a1a12', color: '#f5f0e8', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes shimmer { 0%,100% { opacity:.7; } 50% { opacity:1; } }
        .fade-up { animation: fadeUp .8s ease both; }
        .nav-link { color: rgba(245,240,232,.65); font-size:13px; font-weight:500; cursor:pointer; letter-spacing:.04em; transition: color .2s; text-decoration:none; }
        .nav-link:hover { color: #c9a84c; }
        .essence-card { transition: transform .3s, box-shadow .3s; cursor:pointer; }
        .essence-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,.4) !important; }
        .btn-gold { background: #c9a84c; color: #0a1a12; border: none; border-radius: 10px; padding: 13px 28px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background .2s, transform .15s; letter-spacing:.02em; }
        .btn-gold:hover { background: #e2c46e; transform: translateY(-1px); }
        .btn-outline-gold { background: transparent; color: #c9a84c; border: 1.5px solid rgba(201,168,76,.5); border-radius: 10px; padding: 12px 28px; font-family: inherit; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .2s; }
        .btn-outline-gold:hover { background: rgba(201,168,76,.1); border-color: #c9a84c; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a1a12; }
        ::-webkit-scrollbar-thumb { background: #1a3328; border-radius: 10px; }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 48px', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,26,18,.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,.12)' : 'none',
        transition: 'all .4s'
      }}>
        {/* Logo — clique revient à l'accueil */}
        <div onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer' }}>
          <div style={{ width:'38px', height:'38px', background:'#c9a84c', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', boxShadow:'0 4px 14px rgba(201,168,76,.35)' }}>🌳</div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', fontWeight:600, color:'#fff', lineHeight:1 }}>BoisGabon</div>
            <div style={{ fontSize:'9px', color:'#c9a84c', letterSpacing:'.14em', textTransform:'uppercase' }}>Négoce & Export · Port d'Owendo</div>
          </div>
        </div>

        {/* Liens nav desktop */}
        <div style={{ display:'flex', alignItems:'center', gap:'32px' }}>
          <span className="nav-link" onClick={() => scrollTo('essences')}>Essences</span>
          <span className="nav-link" onClick={() => scrollTo('about')}>Qui sommes-nous</span>
          <span className="nav-link" onClick={() => scrollTo('contact')}>Contact</span>
        </div>

        {/* Bouton connexion */}
        <button className="btn-gold" onClick={() => navigate('/login')} style={{ padding:'9px 22px', fontSize:'13px' }}>
          🔑 Connexion client
        </button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position:'relative', height:'100vh', minHeight:'680px', display:'flex', alignItems:'center', overflow:'hidden' }}>
        {/* Image de fond Unsplash — forêt tropicale / bois */}
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=80&auto=format&fit=crop"
          alt="Forêt tropicale Gabon"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'brightness(.65) saturate(.9)' }}
        />
        {/* Overlay dégradé */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(120deg, rgba(10,26,18,.75) 40%, rgba(10,26,18,.25) 100%)' }} />
        {/* Grain texture */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, opacity:.4 }} />

        <div style={{ position:'relative', zIndex:1, padding:'0 10vw', maxWidth:'800px' }}>
          {/* Tag */}
          <div className="fade-up" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(201,168,76,.12)', border:'1px solid rgba(201,168,76,.25)', borderRadius:'100px', padding:'6px 16px', fontSize:'11px', color:'#e2c46e', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'28px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#c9a84c', display:'inline-block' }} />
            Export certifié FLEGT & EUDR · Port d'Owendo, Gabon
          </div>

          {/* Titre */}
          <h1 className="fade-up" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(42px, 6vw, 76px)', fontWeight:300, lineHeight:1.1, color:'#f5f0e8', margin:'0 0 24px', animationDelay:'.1s' }}>
            L'excellence du bois<br />
            <em style={{ fontStyle:'italic', color:'#c9a84c' }}>tropical gabonais,</em><br />
            <span style={{ fontWeight:600 }}>livré dans le monde entier.</span>
          </h1>

          {/* Sous-titre */}
          <p className="fade-up" style={{ fontSize:'16px', fontWeight:300, lineHeight:1.8, color:'rgba(245,240,232,.65)', maxWidth:'520px', margin:'0 0 40px', animationDelay:'.2s' }}>
            Spécialiste de l'export de bois tropicaux depuis le Gabon. Traçabilité complète, conformité CITES et EUDR, livraison FOB / CIF dans tous les grands ports mondiaux.
          </p>

          {/* CTA */}
          <div className="fade-up" style={{ display:'flex', gap:'14px', flexWrap:'wrap', animationDelay:'.3s' }}>
            <button className="btn-gold" onClick={() => navigate('/login')}>🔑 Accéder à mon espace</button>
            <button className="btn-outline-gold" onClick={() => scrollTo('essences')}>Découvrir nos essences ↓</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', animation:'shimmer 2s ease infinite' }}>
          <div style={{ fontSize:'12px', color:'rgba(245,240,232,.4)', letterSpacing:'.1em', textTransform:'uppercase' }}>Défiler</div>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, rgba(201,168,76,.6), transparent)' }} />
        </div>
      </section>

      {/* ═══ STATS BAND ═══ */}
      <section style={{ background:'#c9a84c', padding:'28px 10vw' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign:'center', padding:'8px 0', borderRight: i < 3 ? '1px solid rgba(10,26,18,.2)' : 'none' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'36px', fontWeight:600, color:'#0a1a12', lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:'12px', fontWeight:500, color:'rgba(10,26,18,.65)', marginTop:'4px', letterSpacing:'.04em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ESSENCES ═══ */}
      <section id="essences" style={{ padding:'96px 10vw', background:'#0d1f15' }}>
        <div style={{ textAlign:'center', marginBottom:'64px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(201,168,76,.08)', border:'1px solid rgba(201,168,76,.2)', borderRadius:'100px', padding:'5px 16px', fontSize:'11px', color:'#c9a84c', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'20px' }}>
            Catalogue 2026
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4vw,52px)', fontWeight:300, color:'#f5f0e8', margin:'0 0 16px' }}>
            Nos <em style={{ fontStyle:'italic', color:'#c9a84c' }}>essences</em> de bois
          </h2>
          <p style={{ fontSize:'15px', fontWeight:300, color:'rgba(245,240,232,.55)', maxWidth:'520px', margin:'0 auto', lineHeight:1.8 }}>
            Toutes nos essences sont certifiées et tracées de la forêt au port d'embarquement, conformément aux réglementations FLEGT, CITES et EUDR.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'20px' }}>
          {ESSENCES.map((e, i) => (
            <div key={i} className="essence-card"
              onClick={() => setActiveEssence(activeEssence?.nom === e.nom ? null : e)}
              style={{ background:'#122a1e', border:`1px solid ${activeEssence?.nom===e.nom?'rgba(201,168,76,.5)':'rgba(255,255,255,.06)'}`, borderRadius:'16px', overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,.2)', position:'relative' }}>

              {/* Bande colorée */}
              <div style={{ height:'4px', background:`linear-gradient(90deg, ${e.color}, transparent)` }} />

              <div style={{ padding:'24px 28px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <span style={{ fontSize:'28px' }}>{e.icon}</span>
                    <div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'22px', fontWeight:600, color:'#f5f0e8', lineHeight:1 }}>{e.nom}</div>
                      <div style={{ fontSize:'11px', fontStyle:'italic', color:'rgba(245,240,232,.4)', marginTop:'2px' }}>{e.latin}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:'11px', color:'rgba(245,240,232,.4)', marginBottom:'4px' }}>Densité</div>
                    <div style={{ fontWeight:600, color:'#c9a84c', fontSize:'14px' }}>{e.densite}</div>
                  </div>
                </div>

                <p style={{ fontSize:'13px', fontWeight:300, lineHeight:1.75, color:'rgba(245,240,232,.6)', marginBottom:'16px' }}>{e.desc}</p>

                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'14px' }}>
                  <span style={{ padding:'3px 10px', background:'rgba(201,168,76,.1)', border:'1px solid rgba(201,168,76,.2)', borderRadius:'100px', fontSize:'11px', color:'#c9a84c' }}>📍 {e.origine}</span>
                  <span style={{ padding:'3px 10px', background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'100px', fontSize:'11px', color:'rgba(245,240,232,.6)' }}>✓ {e.certif}</span>
                </div>

                <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:'14px' }}>
                  <div style={{ fontSize:'11px', color:'rgba(245,240,232,.4)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'5px' }}>Applications principales</div>
                  <div style={{ fontSize:'13px', color:'rgba(245,240,232,.7)' }}>{e.usage}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA essences */}
        <div style={{ textAlign:'center', marginTop:'52px' }}>
          <p style={{ fontSize:'14px', color:'rgba(245,240,232,.45)', marginBottom:'20px' }}>Accédez au catalogue complet et passez vos commandes depuis votre espace client.</p>
          <button className="btn-gold" onClick={() => navigate('/login')}>🔑 Accéder à l'espace client →</button>
        </div>
      </section>

      {/* ═══ QUI SOMMES-NOUS ═══ */}
      <section id="about" style={{ padding:'96px 10vw', background:'#0a1a12', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
        {/* Texte */}
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(201,168,76,.08)', border:'1px solid rgba(201,168,76,.2)', borderRadius:'100px', padding:'5px 16px', fontSize:'11px', color:'#c9a84c', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'24px' }}>
            Notre histoire
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3.5vw,46px)', fontWeight:300, color:'#f5f0e8', margin:'0 0 24px', lineHeight:1.2 }}>
            Qui <em style={{ fontStyle:'italic', color:'#c9a84c' }}>sommes-nous</em> ?
          </h2>
          <p style={{ fontSize:'14px', fontWeight:300, lineHeight:1.9, color:'rgba(245,240,232,.6)', marginBottom:'18px' }}>
            Basée à <strong style={{ color:'#f5f0e8' }}>Port d'Owendo, Gabon</strong>, BoisGabon est une société spécialisée dans le négoce et l'export de bois tropicaux certifiés depuis plus de 25 ans. Nous travaillons en direct avec des producteurs forestiers gabonais responsables, garantissant une traçabilité complète de la chaîne d'approvisionnement.
          </p>
          <p style={{ fontSize:'14px', fontWeight:300, lineHeight:1.9, color:'rgba(245,240,232,.6)', marginBottom:'32px' }}>
            Nos clients — importateurs, négociants et industriels — bénéficient d'un <strong style={{ color:'#f5f0e8' }}>espace client sécurisé</strong> pour suivre leurs commandes en temps réel, accéder à leurs documents légaux (FLEGT, CITES, phytosanitaire) et gérer leurs paiements SWIFT.
          </p>

          {/* Certifications */}
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            {['✓ FLEGT certifié', '✓ Conformité EUDR', '✓ CITES autorisé', '✓ BGFIBank partenaire'].map((c, i) => (
              <span key={i} style={{ padding:'5px 14px', background:'rgba(201,168,76,.08)', border:'1px solid rgba(201,168,76,.2)', borderRadius:'100px', fontSize:'12px', color:'#c9a84c', fontWeight:500 }}>{c}</span>
            ))}
          </div>
        </div>

        {/* Bloc visuel */}
        <div style={{ position:'relative' }}>
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop"
            alt="Forêt tropicale"
            style={{ width:'100%', height:'420px', objectFit:'cover', borderRadius:'16px', filter:'brightness(.75) saturate(.9)' }} />
          <div style={{ position:'absolute', bottom:'20px', left:'20px', right:'20px', background:'rgba(10,26,18,.85)', backdropFilter:'blur(8px)', borderRadius:'12px', padding:'16px 20px', border:'1px solid rgba(201,168,76,.2)' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', fontWeight:600, color:'#c9a84c', marginBottom:'4px' }}>Port d'Owendo — Libreville, Gabon</div>
            <div style={{ fontSize:'12px', color:'rgba(245,240,232,.55)' }}>Terminal bois · Capacité 200 000 m³/an · Accès direct shipping lines</div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT / FOOTER ═══ */}
      <footer id="contact" style={{ background:'#071210', padding:'64px 10vw 32px', borderTop:'1px solid rgba(201,168,76,.1)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr', gap:'48px', marginBottom:'48px' }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
              <div style={{ width:'38px', height:'38px', background:'#c9a84c', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🌳</div>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', fontWeight:600, color:'#fff' }}>BoisGabon</div>
                <div style={{ fontSize:'9px', color:'#c9a84c', letterSpacing:'.14em', textTransform:'uppercase' }}>Négoce & Export</div>
              </div>
            </div>
            <p style={{ fontSize:'13px', fontWeight:300, lineHeight:1.8, color:'rgba(245,240,232,.45)', maxWidth:'300px' }}>
              Export de bois tropicaux certifiés depuis le Port d'Owendo. Partenaire de confiance pour les importateurs des 5 continents.
            </p>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize:'11px', fontWeight:600, color:'rgba(245,240,232,.4)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'16px' }}>Contact</div>
            {[
              { icon:'📍', txt:'Port d\'Owendo, BP 1234\nLibreville, Gabon' },
              { icon:'📧', txt:'export@boisgabon.ga' },
              { icon:'📞', txt:'+241 01 72 34 56' },
              { icon:'🕐', txt:'Lun–Ven · 8h–18h (GMT+1)' },
            ].map((c, i) => (
              <div key={i} style={{ display:'flex', gap:'10px', marginBottom:'10px' }}>
                <span style={{ fontSize:'14px', flexShrink:0, marginTop:'1px' }}>{c.icon}</span>
                <span style={{ fontSize:'13px', fontWeight:300, color:'rgba(245,240,232,.55)', lineHeight:1.6 }}>{c.txt}</span>
              </div>
            ))}
          </div>

          {/* Légal */}
          <div>
            <div style={{ fontSize:'11px', fontWeight:600, color:'rgba(245,240,232,.4)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:'16px' }}>Informations légales</div>
            {['Mentions légales', 'Politique de confidentialité', 'CGV / CGU', 'Conformité EUDR', 'Certifications FLEGT'].map((l, i) => (
              <div key={i} style={{ fontSize:'13px', fontWeight:300, color:'rgba(245,240,232,.45)', marginBottom:'8px', cursor:'pointer', transition:'color .2s' }}
                onMouseEnter={e => e.target.style.color='#c9a84c'}
                onMouseLeave={e => e.target.style.color='rgba(245,240,232,.45)'}
              >{l}</div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <div style={{ fontSize:'12px', color:'rgba(245,240,232,.3)' }}>
            © 2026 BoisGabon SARL — Tous droits réservés · RCCM GA-LBV-2001-B-12347
          </div>
          <div style={{ display:'flex', gap:'16px' }}>
            {['Mentions légales', 'Confidentialité', 'Cookies'].map((l, i) => (
              <span key={i} style={{ fontSize:'12px', color:'rgba(245,240,232,.3)', cursor:'pointer' }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
