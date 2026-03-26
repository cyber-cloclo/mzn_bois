import { useState, useMemo } from 'react'

const DOCS = [
  { id:'DOC-001', ref:'MBG-9851', type:'FLEGT',          label:'Licence FLEGT',             date:'17/03/2026', statut:'manquant',  size:'—',       icon:'📄' },
  { id:'DOC-002', ref:'MBG-9851', type:'phytosanitaire', label:'Certificat Phytosanitaire', date:'16/03/2026', statut:'valide',    size:'1.2 Mo',  icon:'🌿' },
  { id:'DOC-003', ref:'MBG-9851', type:'douane',         label:'Déclaration Douanière',     date:'17/03/2026', statut:'valide',    size:'842 Ko',  icon:'🏛️' },
  { id:'DOC-004', ref:'MBG-9848', type:'FLEGT',          label:'Licence FLEGT',             date:'12/03/2026', statut:'valide',    size:'1.1 Mo',  icon:'📄' },
  { id:'DOC-005', ref:'MBG-9848', type:'phytosanitaire', label:'Certificat Phytosanitaire', date:'11/03/2026', statut:'expire',    size:'980 Ko',  icon:'🌿' },
  { id:'DOC-006', ref:'MBG-9839', type:'douane',         label:'Déclaration Douanière',     date:'05/03/2026', statut:'valide',    size:'756 Ko',  icon:'🏛️' },
  { id:'DOC-007', ref:'MBG-9829', type:'FLEGT',          label:'Licence FLEGT',             date:'22/02/2026', statut:'valide',    size:'1.3 Mo',  icon:'📄' },
  { id:'DOC-008', ref:'MBG-9829', type:'CITES',          label:'Permis CITES',              date:'20/02/2026', statut:'valide',    size:'2.1 Mo',  icon:'🦜' },
  { id:'DOC-009', ref:'MBG-9810', type:'FLEGT',          label:'Licence FLEGT',             date:'10/02/2026', statut:'valide',    size:'1.0 Mo',  icon:'📄' },
  { id:'DOC-010', ref:'MBG-9862', type:'FLEGT',          label:'Licence FLEGT',             date:'24/03/2026', statut:'manquant',  size:'—',       icon:'📄' },
]

const STATUT_COLORS = {
  valide:   { bg:'#dcfce7', color:'#15803d', label:'Valide' },
  manquant: { bg:'#fee2e2', color:'#dc2626', label:'Manquant' },
  expire:   { bg:'#fef3c7', color:'#b45309', label:'Expiré' },
}

const TYPES = ['tous','FLEGT','phytosanitaire','douane','CITES']

export default function Documents() {
  const [search, setSearch]     = useState('')
  const [typeF, setTypeF]       = useState('tous')
  const [statutF, setStatutF]   = useState('tous')

  const filtered = useMemo(() => DOCS.filter(d => {
    const mt = typeF   === 'tous' || d.type   === typeF
    const ms = statutF === 'tous' || d.statut === statutF
    const q  = search.toLowerCase()
    const mq = !q || d.ref.toLowerCase().includes(q) || d.label.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
    return mt && ms && mq
  }), [search, typeF, statutF])

  const chip = (active) => ({
    padding: '5px 12px', borderRadius: '100px', fontSize: '12px',
    fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all .15s',
    border: active ? '1.5px solid #1a3328' : '1.5px solid #e3ddd2',
    background: active ? '#1a3328' : '#fff', color: active ? '#fff' : '#555',
  })

  return (
    <div style={{ background:'#f5f0e8', minHeight:'100vh', fontFamily:"'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

      {/* TOPBAR */}
      <header style={{ height:'64px', background:'#fff', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 8px rgba(0,0,0,.05)' }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontWeight:600 }}>Documents légaux</div>
          <div style={{ fontSize:'12px', color:'#909090' }}>Shanghai Timber Co. — FLEGT, CITES, Phytosanitaire, Douane</div>
        </div>
        <div style={{ display:'flex', gap:'10px' }}>
          <button style={{ padding:'8px 16px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background:'#fff', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>⬇ Tout télécharger</button>
        </div>
      </header>

      <div style={{ padding:'24px 28px', display:'flex', flexDirection:'column', gap:'20px' }}>

        {/* KPI BAND */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
          {[
            { icon:'📄', val: DOCS.length,                                          label:'Total documents',  color:'#1a3328' },
            { icon:'✅', val: DOCS.filter(d=>d.statut==='valide').length,            label:'Valides',          color:'#15803d' },
            { icon:'🚨', val: DOCS.filter(d=>d.statut==='manquant').length,          label:'Manquants',        color:'#dc2626' },
            { icon:'⚠️', val: DOCS.filter(d=>d.statut==='expire').length,            label:'Expirés',          color:'#b45309' },
          ].map((k,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:'14px', padding:'18px 20px', boxShadow:'0 2px 10px rgba(0,0,0,.06)', border: i>1?`1.5px solid ${i===2?'#fca5a5':'#fcd34d'}`:'1px solid #e3ddd2' }}>
              <div style={{ fontSize:'24px', marginBottom:'8px' }}>{k.icon}</div>
              <div style={{ fontSize:'28px', fontWeight:700, color:k.color, lineHeight:1 }}>{k.val}</div>
              <div style={{ fontSize:'12px', color:'#909090', marginTop:'4px' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* ALERTE */}
        {DOCS.filter(d=>d.statut==='manquant').length > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:'12px', background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:'12px', padding:'14px 18px' }}>
            <span style={{ fontSize:'20px' }}>🚨</span>
            <div>
              <div style={{ fontWeight:600, fontSize:'14px', color:'#991b1b' }}>Documents manquants détectés</div>
              <div style={{ fontSize:'12px', color:'#b91c1c' }}>
                {DOCS.filter(d=>d.statut==='manquant').map(d=>`#${d.ref} — ${d.label}`).join(' · ')}
              </div>
            </div>
          </div>
        )}

        {/* TOOLBAR */}
        <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:'200px', position:'relative' }}>
            <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#909090' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Référence, type de document…"
              style={{ width:'100%', padding:'9px 14px 9px 38px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background:'#f5f0e8', fontSize:'13px', outline:'none', boxSizing:'border-box' }} />
          </div>
          <div style={{ width:'1px', height:'28px', background:'#e3ddd2' }} />
          <span style={{ fontSize:'11px', fontWeight:500, color:'#909090', textTransform:'uppercase', letterSpacing:'.08em' }}>Type</span>
          {TYPES.map(t => (
            <button key={t} onClick={() => setTypeF(t)} style={chip(typeF===t)}>
              {t === 'tous' ? 'Tous' : t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
          <div style={{ width:'1px', height:'28px', background:'#e3ddd2' }} />
          <span style={{ fontSize:'11px', fontWeight:500, color:'#909090', textTransform:'uppercase', letterSpacing:'.08em' }}>Statut</span>
          {['tous','valide','manquant','expire'].map(s => (
            <button key={s} onClick={() => setStatutF(s)} style={chip(statutF===s)}>
              {s==='tous'?'Tous':STATUT_COLORS[s]?.label}
            </button>
          ))}
          <span style={{ fontSize:'13px', color:'#909090', fontWeight:500 }}>{filtered.length} doc{filtered.length!==1?'s':''}</span>
        </div>

        {/* TABLE */}
        <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #e3ddd2', overflow:'hidden' }}>
          {/* Header */}
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr 1fr 1fr 1fr auto', gap:'12px', padding:'12px 20px', background:'#faf9f7', borderBottom:'1px solid #e3ddd2' }}>
            {['','Document','Commande','Date','Statut','Actions'].map((h,i) => (
              <div key={i} style={{ fontSize:'11px', fontWeight:600, color:'#909090', letterSpacing:'.08em', textTransform:'uppercase' }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'48px' }}>
              <div style={{ fontSize:'36px', marginBottom:'10px' }}>📁</div>
              <div style={{ fontWeight:600, color:'#1a1a1a' }}>Aucun document trouvé</div>
              <div style={{ fontSize:'13px', color:'#909090', marginTop:'6px' }}>Modifiez vos filtres.</div>
            </div>
          ) : filtered.map((d, i) => (
            <div key={d.id} style={{ display:'grid', gridTemplateColumns:'auto 1fr 1fr 1fr 1fr auto', gap:'12px', padding:'14px 20px', borderBottom: i < filtered.length-1 ? '1px solid #f5f0e8':'none', alignItems:'center', transition:'background .15s', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background='#faf9f7'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <span style={{ fontSize:'22px' }}>{d.icon}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:'13px', color:'#1a1a1a' }}>{d.label}</div>
                <div style={{ fontSize:'11px', color:'#909090', marginTop:'2px' }}>{d.type.toUpperCase()} · {d.size}</div>
              </div>
              <div style={{ fontSize:'13px', color:'#555', fontWeight:500 }}>#{d.ref}</div>
              <div style={{ fontSize:'13px', color:'#555' }}>{d.date}</div>
              <span style={{ padding:'4px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:600, background:STATUT_COLORS[d.statut]?.bg, color:STATUT_COLORS[d.statut]?.color, display:'inline-block' }}>
                {STATUT_COLORS[d.statut]?.label}
              </span>
              <div style={{ display:'flex', gap:'6px' }}>
                {d.statut !== 'manquant' ? (
                  <button style={{ padding:'6px 12px', background:'#1a3328', color:'#fff', border:'none', borderRadius:'7px', fontSize:'12px', fontWeight:500, cursor:'pointer' }}>⬇ Télécharger</button>
                ) : (
                  <button style={{ padding:'6px 12px', background:'#fee2e2', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'7px', fontSize:'12px', fontWeight:500, cursor:'pointer' }}>⬆ Soumettre</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}