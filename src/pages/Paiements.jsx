import { useState, useMemo, useEffect } from 'react'

const TXS = [
  { id:'PAY-2641', cmd:'MBG-9829', essence:'Padouk 448m³',   date:'22/02/2026', type:'solde',   amount:51600, statut:'recu' },
  { id:'PAY-2638', cmd:'MBG-9829', essence:'Padouk 448m³',   date:'10/02/2026', type:'acompte', amount:34400, statut:'recu' },
  { id:'PAY-2635', cmd:'MBG-9810', essence:'Okoumé 260m³',   date:'05/02/2026', type:'solde',   amount:30600, statut:'recu' },
  { id:'PAY-2630', cmd:'MBG-9810', essence:'Okoumé 260m³',   date:'28/01/2026', type:'acompte', amount:20400, statut:'recu' },
  { id:'PAY-2628', cmd:'MBG-9821', essence:'Niangon 190m³',  date:'20/01/2026', type:'solde',   amount:27600, statut:'recu' },
  { id:'PAY-2624', cmd:'MBG-9821', essence:'Niangon 190m³',  date:'10/01/2026', type:'acompte', amount:18400, statut:'recu' },
  { id:'PAY-2648', cmd:'MBG-9839', essence:'Azobé 95m³',     date:'15/03/2026', type:'acompte', amount:9800,  statut:'recu' },
  { id:'PAY-2651', cmd:'MBG-9839', essence:'Azobé 95m³',     date:'05/03/2026', type:'solde',   amount:8400,  statut:'retard' },
  { id:'PAY-2655', cmd:'MBG-9848', essence:'Niangon 188m³',  date:'12/03/2026', type:'acompte', amount:17250, statut:'recu' },
  { id:'PAY-2658', cmd:'MBG-9851', essence:'Okoumé 329m³',   date:'17/03/2026', type:'acompte', amount:30000, statut:'attente' },
]

const UPCOMING = [
  { ref:'Solde · #MBG-9851',   desc:'Okoumé · 329 m³ · Shanghai',  amount:'38 400 €', due:'⚠ Échéance 28/03', urgent:true },
  { ref:'Acompte · #MBG-9858', desc:'Niangon · 215 m³ · Hambourg',  amount:'21 250 €', due:'Échéance 02/04',   urgent:false },
  { ref:'Acompte · #MBG-9862', desc:'Sipo · 180 m³ · Rotterdam',    amount:'19 000 €', due:'Échéance 15/04',   urgent:false },
  { ref:'Retard · #MBG-9839',  desc:'Azobé · 95 m³ · Dubaï',        amount:'8 400 €',  due:'🚨 Retard 12 jours', overdue:true },
]

const ST_COLORS = {
  recu:    { bg:'#dcfce7', color:'#15803d' },
  attente: { bg:'#fef3c7', color:'#b45309' },
  retard:  { bg:'#fee2e2', color:'#dc2626' },
}
const ST_LABELS  = { recu:'Reçu', attente:'En attente', retard:'En retard' }
const TYPE_COLORS = {
  acompte: { bg:'#eff6ff', color:'#1d4ed8' },
  solde:   { bg:'#f0fdf4', color:'#15803d' },
}
const TYPE_LABELS = { acompte:'Acompte', solde:'Solde' }
const PER_PAGE = 5

function useCounter(target, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setVal(Math.round(start))
      if (start >= target) clearInterval(timer)
    }, duration / 60)
    return () => clearInterval(timer)
  }, [target])
  return val
}

export default function Paiements() {
  const [search, setSearch] = useState('')
  const [statutF, setStatutF] = useState('tous')
  const [typeF, setTypeF] = useState('tous')
  const [sort, setSort] = useState('date-desc')
  const [page, setPage] = useState(1)
  const [copied, setCopied] = useState(false)
  const total = useCounter(282300)

  const filtered = useMemo(() => {
    let list = TXS.filter(t => {
      const ms = statutF === 'tous' || t.statut === statutF
      const mt = typeF   === 'tous' || t.type   === typeF
      const q  = search.toLowerCase()
      const mq = !q || t.id.toLowerCase().includes(q) || t.cmd.toLowerCase().includes(q) || t.essence.toLowerCase().includes(q) || String(t.amount).includes(q)
      return ms && mt && mq
    })
    if (sort === 'amount-desc') list = [...list].sort((a,b) => b.amount - a.amount)
    if (sort === 'amount-asc')  list = [...list].sort((a,b) => a.amount - b.amount)
    if (sort === 'date-asc')    list = [...list].reverse()
    return list
  }, [search, statutF, typeF, sort])

  const pages   = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, pages)
  const paged   = filtered.slice((safePage-1)*PER_PAGE, safePage*PER_PAGE)

  function copy(txt) {
    navigator.clipboard?.writeText(txt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function exportCSV() {
    const rows = [['ID','Commande','Essence','Date','Type','Montant','Statut']]
    TXS.forEach(t => rows.push([t.id, t.cmd, t.essence, t.date, t.type, t.amount, t.statut]))
    const csv = rows.map(r => r.join(';')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'paiements_boisgabon.csv'
    a.click()
  }

  const chip = (active) => ({
    padding: '5px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: active ? 600 : 400,
    border: active ? '1.5px solid #1a3328' : '1.5px solid #e3ddd2',
    background: active ? '#1a3328' : '#fff', color: active ? '#fff' : '#555',
    cursor: 'pointer', transition: 'all .15s'
  })

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* TOPBAR */}
      <header style={{ height:'64px', background:'#fff', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 8px rgba(0,0,0,.05)' }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontWeight:600 }}>Paiements & Facturation</div>
          <div style={{ fontSize:'12px', color:'#909090' }}>Shanghai Timber Co. — Historique complet 2026</div>
        </div>
        <div style={{ display:'flex', gap:'10px' }}>
          <button onClick={exportCSV} style={{ padding:'8px 16px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background:'#fff', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>⬇ Export CSV</button>
          <button style={{ padding:'9px 18px', background:'#1a3328', color:'#fff', border:'none', borderRadius:'9px', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>📄 Télécharger relevé</button>
        </div>
      </header>

      <div style={{ padding:'28px', display:'flex', flexDirection:'column', gap:'22px' }}>

        {/* FINANCE BAND */}
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', background:'#1a3328', borderRadius:'14px', overflow:'hidden', position:'relative' }}>
          {/* Main */}
          <div style={{ padding:'32px', borderRight:'1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize:'11px', fontWeight:300, color:'rgba(255,255,255,.45)', letterSpacing:'.12em', textTransform:'uppercase', marginBottom:'10px' }}>Total facturé 2026</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'52px', fontWeight:600, color:'#fff', lineHeight:1, marginBottom:'6px' }}>
              {total.toLocaleString('fr-FR')} <span style={{ fontSize:'28px', fontWeight:300 }}>€</span>
            </div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,.4)', marginBottom:'18px' }}>Janvier — Mars 2026</div>
            <div style={{ height:'6px', background:'rgba(255,255,255,.1)', borderRadius:'3px', overflow:'hidden' }}>
              <div style={{ height:'100%', width:'74%', background:'linear-gradient(90deg,#c9a84c,#e2c46e)', borderRadius:'3px', transition:'width 1.2s' }} />
            </div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,.35)', marginTop:'6px' }}>74% encaissé</div>
          </div>
          {/* Stats */}
          {[
            { icon:'✅', val:'207 600 €', label:'Encaissé', tag:'74% du total', tagColor:'#4ade80', tagBg:'rgba(34,197,94,.15)' },
            { icon:'⏳', val:'66 300 €',  label:'En attente', tag:'23% du total', tagColor:'#fbbf24', tagBg:'rgba(251,191,36,.15)' },
            { icon:'🚨', val:'8 400 €',   label:'En retard',  tag:'3% du total',  tagColor:'#f87171', tagBg:'rgba(248,113,113,.15)' },
          ].map((s, i) => (
            <div key={i} style={{ padding:'24px', borderRight: i < 2 ? '1px solid rgba(255,255,255,.08)' : 'none', display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <div style={{ fontSize:'22px', marginBottom:'10px' }}>{s.icon}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'28px', fontWeight:600, color:'#fff', lineHeight:1, marginBottom:'4px' }}>{s.val}</div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,.45)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'8px' }}>{s.label}</div>
              <span style={{ padding:'3px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:500, background:s.tagBg, color:s.tagColor, display:'inline-block' }}>{s.tag}</span>
            </div>
          ))}
        </div>

        {/* BREAKDOWN BAR */}
        <div style={{ background:'#fff', borderRadius:'14px', padding:'22px 24px', border:'1px solid #e3ddd2' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Répartition des paiements</div>
            <div style={{ fontSize:'12px', color:'#909090' }}>Janvier — Mars 2026</div>
          </div>
          <div style={{ display:'flex', height:'10px', borderRadius:'5px', overflow:'hidden', marginBottom:'14px' }}>
            <div style={{ width:'74%', background:'#16a34a', transition:'width 1s' }} />
            <div style={{ width:'23%', background:'#d97706', transition:'width 1s' }} />
            <div style={{ width:'3%',  background:'#dc2626', transition:'width 1s' }} />
          </div>
          <div style={{ display:'flex', gap:'24px', flexWrap:'wrap' }}>
            {[
              { color:'#16a34a', label:'Payé',        val:'207 600 €', pct:'74%' },
              { color:'#d97706', label:'En attente',  val:'66 300 €',  pct:'23%' },
              { color:'#dc2626', label:'En retard',   val:'8 400 €',   pct:'3%' },
              { color:'#1a3328', label:'Total facturé', val:'282 300 €', pct:'' },
            ].map((l, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:l.color, flexShrink:0 }} />
                <span style={{ color:'#909090' }}>{l.label}</span>
                <span style={{ fontWeight:600, color:'#1a1a1a' }}>{l.val}</span>
                {l.pct && <span style={{ color:'#b0b0b0', fontSize:'11px' }}>{l.pct}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* TOOLBAR */}
        <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:'200px', position:'relative' }}>
            <span style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#909090' }}>🔍</span>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Référence, commande, montant…"
              style={{ width:'100%', padding:'9px 14px 9px 38px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background:'#f5f0e8', fontSize:'13px', outline:'none', boxSizing:'border-box' }} />
          </div>
          <div style={{ width:'1px', height:'28px', background:'#e3ddd2' }} />
          {['tous','recu','attente','retard'].map(s => (
            <button key={s} onClick={() => { setStatutF(s); setPage(1) }} style={chip(statutF === s)}>
              {s === 'tous' ? 'Tous' : ST_LABELS[s]}
            </button>
          ))}
          <div style={{ width:'1px', height:'28px', background:'#e3ddd2' }} />
          {['tous','acompte','solde'].map(t => (
            <button key={t} onClick={() => { setTypeF(t); setPage(1) }} style={chip(typeF === t)}>
              {t === 'tous' ? 'Tous types' : TYPE_LABELS[t]}
            </button>
          ))}
          <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}
            style={{ padding:'8px 12px', border:'1.5px solid #e3ddd2', borderRadius:'9px', fontSize:'13px', background:'#fff', outline:'none', cursor:'pointer' }}>
            <option value="date-desc">↓ Date (récent)</option>
            <option value="date-asc">↑ Date (ancien)</option>
            <option value="amount-desc">↓ Montant</option>
            <option value="amount-asc">↑ Montant</option>
          </select>
          <span style={{ fontSize:'13px', color:'#909090', fontWeight:500 }}>{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* 2 COLONNES */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'20px' }}>

          {/* TABLE */}
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #e3ddd2', overflow:'hidden' }}>
              {/* Header */}
              <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1fr 1fr 1fr 1fr auto', gap:'12px', padding:'12px 20px', background:'#faf9f7', borderBottom:'1px solid #e3ddd2' }}>
                {['Référence','Date','Type','Montant','Statut',''].map((h, i) => (
                  <div key={i} style={{ fontSize:'11px', fontWeight:600, color:'#909090', letterSpacing:'.08em', textTransform:'uppercase', textAlign: i === 5 ? 'right' : 'left' }}>{h}</div>
                ))}
              </div>
              {/* Rows */}
              {paged.length === 0 ? (
                <div style={{ textAlign:'center', padding:'48px' }}>
                  <div style={{ fontSize:'36px', marginBottom:'10px' }}>💳</div>
                  <div style={{ fontWeight:600, color:'#1a1a1a' }}>Aucune transaction trouvée</div>
                  <div style={{ fontSize:'13px', color:'#909090', marginTop:'6px' }}>Modifiez vos filtres.</div>
                </div>
              ) : paged.map(t => (
                <div key={t.id} style={{ display:'grid', gridTemplateColumns:'1.8fr 1fr 1fr 1fr 1fr auto', gap:'12px', padding:'14px 20px', borderBottom:'1px solid #f5f0e8', cursor:'pointer', transition:'background .15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <div style={{ fontWeight:600, fontSize:'13px', color:'#1a1a1a' }}>{t.id}</div>
                    <div style={{ fontSize:'11px', color:'#909090', marginTop:'2px' }}>#{t.cmd} · {t.essence}</div>
                  </div>
                  <div style={{ fontSize:'13px', color:'#555', alignSelf:'center' }}>{t.date}</div>
                  <div style={{ alignSelf:'center' }}>
                    <span style={{ padding:'3px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:600, background:TYPE_COLORS[t.type]?.bg, color:TYPE_COLORS[t.type]?.color }}>{TYPE_LABELS[t.type]}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:'14px', color: t.statut === 'retard' ? '#dc2626' : '#1a1a1a', alignSelf:'center' }}>
                    {t.amount.toLocaleString('fr-FR')} €
                  </div>
                  <div style={{ alignSelf:'center' }}>
                    <span style={{ padding:'4px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:600, background:ST_COLORS[t.statut]?.bg, color:ST_COLORS[t.statut]?.color }}>{ST_LABELS[t.statut]}</span>
                  </div>
                  <div style={{ alignSelf:'center', textAlign:'right' }}>
                    <button style={{ padding:'6px 10px', border:'1.5px solid #e3ddd2', borderRadius:'7px', background:'#fff', fontSize:'13px', cursor:'pointer' }} title="Télécharger la facture">📄</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', borderRadius:'12px', padding:'12px 20px', border:'1px solid #e3ddd2' }}>
                <span style={{ fontSize:'13px', color:'#909090' }}>
                  Affichage {(safePage-1)*PER_PAGE+1}–{Math.min(safePage*PER_PAGE, filtered.length)} sur {filtered.length}
                </span>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={safePage<=1}
                    style={{ padding:'6px 12px', border:'1.5px solid #e3ddd2', borderRadius:'7px', background: safePage<=1?'#f9f9f9':'#fff', color: safePage<=1?'#ccc':'#555', cursor: safePage<=1?'default':'pointer', fontSize:'14px' }}>‹</button>
                  {Array.from({ length:pages },(_,i)=>i+1).map(n => (
                    <button key={n} onClick={() => setPage(n)}
                      style={{ padding:'6px 12px', border:'1.5px solid', borderRadius:'7px', fontSize:'13px', fontWeight: safePage===n?600:400, cursor:'pointer', background: safePage===n?'#1a3328':'#fff', color: safePage===n?'#fff':'#555', borderColor: safePage===n?'#1a3328':'#e3ddd2' }}>{n}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(pages,p+1))} disabled={safePage>=pages}
                    style={{ padding:'6px 12px', border:'1.5px solid #e3ddd2', borderRadius:'7px', background: safePage>=pages?'#f9f9f9':'#fff', color: safePage>=pages?'#ccc':'#555', cursor: safePage>=pages?'default':'pointer', fontSize:'14px' }}>›</button>
                </div>
              </div>
            )}
          </div>

          {/* COLONNE DROITE */}
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

            {/* À VENIR */}
            <div style={{ background:'#fff', borderRadius:'14px', padding:'20px', border:'1px solid #e3ddd2' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', fontWeight:600 }}>À venir</div>
                <button style={{ background:'none', border:'none', fontSize:'12px', color:'#c9a84c', fontWeight:600, cursor:'pointer' }}>Tout voir →</button>
              </div>
              {UPCOMING.map((u, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'10px 0', borderBottom: i < UPCOMING.length-1 ? '1px solid #f5f0e8' : 'none', cursor:'pointer' }}>
                  <div>
                    <div style={{ fontSize:'13px', fontWeight:600, color:'#1a1a1a' }}>{u.ref}</div>
                    <div style={{ fontSize:'11px', color:'#909090', marginTop:'2px' }}>{u.desc}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontWeight:700, fontSize:'14px', color:'#1a1a1a' }}>{u.amount}</div>
                    <div style={{ fontSize:'11px', marginTop:'3px', color: u.overdue ? '#dc2626' : u.urgent ? '#d97706' : '#16a34a', fontWeight:500 }}>{u.due}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* SWIFT */}
            <div style={{ background:'#1a3328', borderRadius:'14px', padding:'20px' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'16px', fontWeight:600, color:'#fff', marginBottom:'16px' }}>Coordonnées bancaires</div>
              {[
                { label:'Bénéficiaire', val:'Tropical-wood SARL', copy:true },
                { label:'IBAN', val:'GA76 4001 0000 1234 5678 9012', copy:true },
                { label:'SWIFT / BIC', val:'BGFIGALI', copy:true },
                { label:'Banque', val:'BGFIBank Gabon — Libreville', copy:false },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom:'12px' }}>
                  <div style={{ fontSize:'10px', fontWeight:500, color:'rgba(255,255,255,.4)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:'4px' }}>{f.label}</div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:'13px', color:'rgba(255,255,255,.85)', fontWeight:500 }}>{f.val}</span>
                    {f.copy && <button onClick={() => copy(f.val)} style={{ padding:'3px 10px', background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.3)', borderRadius:'6px', fontSize:'11px', color:'#c9a84c', fontWeight:600, cursor:'pointer' }}>Copier</button>}
                  </div>
                </div>
              ))}
              <div style={{ marginTop:'14px', padding:'10px 12px', background:'rgba(217,119,6,.12)', border:'1px solid rgba(217,119,6,.25)', borderRadius:'8px', fontSize:'12px', color:'#fbbf24', lineHeight:1.5 }}>
                ⚠ Toujours indiquer la référence (#MBG-XXXX) dans le libellé du virement.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast copié */}
      {copied && (
        <div style={{ position:'fixed', bottom:'24px', right:'24px', background:'#1a3328', color:'#fff', padding:'10px 18px', borderRadius:'9px', fontSize:'13px', zIndex:999, boxShadow:'0 4px 16px rgba(0,0,0,.2)' }}>
          ✓ Copié !
        </div>
      )}
    </div>
  )
}