import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const ORDERS = [
  { id:'MBG-9862', essence:'Sipo', essenceKey:'sipo', grade:'Grade A', icon:'🟤', date:'24 mars 2026', vol:180, prix:38000, inco:'FOB', port:'Rotterdam', statutKey:'depot', activeStep:0, alert:true, alertMsg:'Document FLEGT en attente',
    steps:[{lbl:'Dépôt',date:'24/03'},{lbl:'Transport',date:null},{lbl:'Au Port',date:null},{lbl:'Empoté',date:null},{lbl:'Embarqué',date:null},{lbl:'Livré',date:null}] },
  { id:'MBG-9858', essence:'Niangon', essenceKey:'niangon', grade:'Grade B', icon:'🟡', date:'21 mars 2026', vol:215, prix:42500, inco:'CIF', port:'Hambourg', statutKey:'transport', activeStep:1, alert:false, alertMsg:'',
    steps:[{lbl:'Dépôt',date:'18/03'},{lbl:'Transport',date:'21/03'},{lbl:'Au Port',date:null},{lbl:'Empoté',date:null},{lbl:'Embarqué',date:null},{lbl:'Livré',date:null}] },
  { id:'MBG-9851', essence:'Okoumé', essenceKey:'okoume', grade:'Grade A', icon:'🟤', date:'17 mars 2026', vol:329, prix:68400, inco:'FOB', port:'Shanghai', statutKey:'embarque', activeStep:4, alert:true, alertMsg:'Licence FLEGT manquante — délai dépassé',
    steps:[{lbl:'Dépôt',date:'08/03'},{lbl:'Transport',date:'11/03'},{lbl:'Au Port',date:'14/03'},{lbl:'Empoté',date:'16/03'},{lbl:'Embarqué',date:'17/03'},{lbl:'Livré',date:null}] },
  { id:'MBG-9848', essence:'Niangon', essenceKey:'niangon', grade:'Grade B', icon:'🟡', date:'12 mars 2026', vol:188, prix:34500, inco:'CIF', port:'Hambourg', statutKey:'empote', activeStep:3, alert:false, alertMsg:'',
    steps:[{lbl:'Dépôt',date:'05/03'},{lbl:'Transport',date:'08/03'},{lbl:'Au Port',date:'10/03'},{lbl:'Empoté',date:'12/03'},{lbl:'Embarqué',date:null},{lbl:'Livré',date:null}] },
  { id:'MBG-9839', essence:'Azobé', essenceKey:'azobe', grade:'Grade A', icon:'🟢', date:'5 mars 2026', vol:95, prix:18200, inco:'FOB', port:'Dubaï', statutKey:'port', activeStep:2, alert:false, alertMsg:'',
    steps:[{lbl:'Dépôt',date:'26/02'},{lbl:'Transport',date:'01/03'},{lbl:'Au Port',date:'05/03'},{lbl:'Empoté',date:null},{lbl:'Embarqué',date:null},{lbl:'Livré',date:null}] },
  { id:'MBG-9829', essence:'Padouk', essenceKey:'padouk', grade:'Grade C', icon:'🟠', date:'22 fév. 2026', vol:448, prix:86000, inco:'CIF', port:'Osaka', statutKey:'livre', activeStep:5, alert:false, alertMsg:'',
    steps:[{lbl:'Dépôt',date:'10/02'},{lbl:'Transport',date:'13/02'},{lbl:'Au Port',date:'16/02'},{lbl:'Empoté',date:'18/02'},{lbl:'Embarqué',date:'20/02'},{lbl:'Livré',date:'22/02'}] },
  { id:'MBG-9810', essence:'Okoumé', essenceKey:'okoume', grade:'Grade B', icon:'🟤', date:'10 fév. 2026', vol:260, prix:51000, inco:'EXW', port:'Rotterdam', statutKey:'livre', activeStep:5, alert:false, alertMsg:'',
    steps:[{lbl:'Dépôt',date:'28/01'},{lbl:'Transport',date:'31/01'},{lbl:'Au Port',date:'03/02'},{lbl:'Empoté',date:'06/02'},{lbl:'Embarqué',date:'08/02'},{lbl:'Livré',date:'10/02'}] },
]

const STATUT_LABELS = { depot:'Dépôt', transport:'Transport', port:'Au Port', empote:'Empoté', embarque:'Embarqué', livre:'Livré' }
const STATUT_COLORS = {
  depot:     { bg:'#f3f4f6', color:'#4b5563' },
  transport: { bg:'#ffedd5', color:'#c2410c' },
  port:      { bg:'#fef3c7', color:'#b45309' },
  empote:    { bg:'#ede9fe', color:'#6d28d9' },
  embarque:  { bg:'#dbeafe', color:'#1d4ed8' },
  livre:     { bg:'#dcfce7', color:'#15803d' },
}

const STATUTS = ['tous','depot','transport','port','empote','embarque','livre']
const ESSENCES = ['tous','okoume','niangon','azobe','padouk','sipo']
const STATUT_DOTS = { depot:'#9ca3af', transport:'#f97316', port:'#f59e0b', empote:'#8b5cf6', embarque:'#3b82f6', livre:'#22c55e' }

const PER_PAGE = 5

export default function Commandes() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statutFilter, setStatutFilter] = useState('tous')
  const [essenceFilter, setEssenceFilter] = useState('tous')
  const [sort, setSort] = useState('date-desc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let list = ORDERS.filter(o => {
      const matchStatut  = statutFilter  === 'tous' || o.statutKey  === statutFilter
      const matchEssence = essenceFilter === 'tous' || o.essenceKey === essenceFilter
      const q = search.toLowerCase()
      const matchSearch  = !q || o.id.toLowerCase().includes(q) || o.essence.toLowerCase().includes(q) || o.port.toLowerCase().includes(q)
      return matchStatut && matchEssence && matchSearch
    })
    if (sort === 'vol-desc')   list = [...list].sort((a,b) => b.vol  - a.vol)
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.prix - a.prix)
    if (sort === 'date-asc')   list = [...list].reverse()
    return list
  }, [search, statutFilter, essenceFilter, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(page, pages)
  const paged = filtered.slice((safePage-1)*PER_PAGE, safePage*PER_PAGE)

  function exportCSV() {
    const rows = [['Référence','Essence','Grade','Volume m³','Prix €','Incoterm','Port','Statut','Date']]
    ORDERS.forEach(o => rows.push([o.id, o.essence, o.grade, o.vol, o.prix, o.inco, o.port, STATUT_LABELS[o.statutKey], o.date]))
    const csv = rows.map(r => r.join(';')).join('\n')
    const a = document.createElement('a')
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    a.download = 'commandes_boisgabon.csv'
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
      <header style={{
        height: '64px', background: '#fff', borderBottom: '1px solid #e3ddd2',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,.05)'
      }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 600 }}>Mes Commandes</div>
          <div style={{ fontSize: '12px', color: '#909090' }}>Shanghai Timber Co. — 7 commandes actives · 2026</div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={exportCSV} style={{ padding: '8px 14px', border: '1.5px solid #e3ddd2', borderRadius: '9px', background: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>⬇ Export CSV</button>
          <button onClick={() => navigate('/app/commandes/nouvelle')} style={{ padding: '9px 18px', background: '#1a3328', color: '#fff', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>＋ Nouvelle commande</button>
        </div>
      </header>

      <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* TOOLBAR */}
        <div style={{ background: '#fff', border: '1px solid #e3ddd2', borderRadius: '14px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#909090' }}>🔍</span>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Ref., essence, statut, port…"
              style={{ width: '100%', padding: '9px 14px 9px 38px', border: '1.5px solid #e3ddd2', borderRadius: '9px', background: '#f5f0e8', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ width: '1px', height: '28px', background: '#e3ddd2' }} />

          {/* Statut chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#909090', letterSpacing: '.08em', textTransform: 'uppercase' }}>Statut</span>
            {STATUTS.map(s => (
              <button key={s} onClick={() => { setStatutFilter(s); setPage(1) }} style={chip(statutFilter === s)}>
                {s !== 'tous' && <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: STATUT_DOTS[s], marginRight: '5px' }} />}
                {s === 'tous' ? 'Tous' : STATUT_LABELS[s]}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '28px', background: '#e3ddd2' }} />

          {/* Essence chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#909090', letterSpacing: '.08em', textTransform: 'uppercase' }}>Essence</span>
            {ESSENCES.map(e => (
              <button key={e} onClick={() => { setEssenceFilter(e); setPage(1) }} style={chip(essenceFilter === e)}>
                {e === 'tous' ? 'Toutes' : e.charAt(0).toUpperCase() + e.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '28px', background: '#e3ddd2' }} />

          {/* Sort */}
          <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}
            style={{ padding: '8px 12px', border: '1.5px solid #e3ddd2', borderRadius: '9px', fontSize: '13px', background: '#fff', cursor: 'pointer', outline: 'none' }}>
            <option value="date-desc">↓ Date (récent)</option>
            <option value="date-asc">↑ Date (ancien)</option>
            <option value="vol-desc">↓ Volume</option>
            <option value="price-desc">↓ Montant</option>
          </select>

          <span style={{ fontSize: '13px', color: '#909090', fontWeight: 500 }}>{filtered.length} commande{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* LISTE */}
        {paged.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '14px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>Aucune commande trouvée</div>
            <div style={{ fontSize: '13px', color: '#909090', marginTop: '6px' }}>Essayez de modifier vos filtres ou votre recherche.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {paged.map(o => (
              <div key={o.id} style={{
                background: '#fff', borderRadius: '14px', padding: '20px 22px',
                border: o.alert ? '1.5px solid #fbbf24' : '1px solid #e3ddd2',
                boxShadow: '0 2px 10px rgba(0,0,0,.06)', cursor: 'pointer',
                transition: 'box-shadow .15s'
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,.06)'}
              >
                {/* TOP */}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto auto', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '28px' }}>{o.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '15px', color: '#181818' }}>#{o.id}</span>
                      <span style={{ fontSize: '14px', color: '#555' }}>— {o.essence} {o.grade}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ padding: '3px 10px', background: '#f5f0e8', borderRadius: '100px', fontSize: '12px', color: '#555' }}>📅 {o.date}</span>
                      <span style={{ padding: '3px 10px', background: '#f5f0e8', borderRadius: '100px', fontSize: '12px', color: '#555' }}>🚢 {o.inco} · {o.port}</span>
                      {o.alert && <span style={{ padding: '3px 10px', background: '#fff7e6', border: '1px solid #fbbf24', borderRadius: '100px', fontSize: '12px', color: '#b45309' }}>⚠ {o.alertMsg}</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700 }}>{o.vol} <span style={{ fontSize: '13px', fontWeight: 300 }}>m³</span></div>
                    <div style={{ fontSize: '11px', color: '#909090' }}>Volume</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 600 }}>{o.prix.toLocaleString('fr-FR')} €</div>
                    <div style={{ fontSize: '11px', color: '#909090' }}>{o.inco}</div>
                  </div>
                  <span style={{ padding: '5px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: STATUT_COLORS[o.statutKey]?.bg, color: STATUT_COLORS[o.statutKey]?.color }}>
                    {STATUT_LABELS[o.statutKey]}
                  </span>
                </div>

                {/* TIMELINE */}
                <div style={{ borderTop: '1px solid #f0ece4', margin: '16px 0 14px', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
                    {o.steps.map((step, si) => {
                      const isDone   = si < o.activeStep
                      const isActive = si === o.activeStep
                      return (
                        <div key={si} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                          {/* Ligne connectrice */}
                          {si < o.steps.length - 1 && (
                            <div style={{ position: 'absolute', top: '12px', left: '50%', width: '100%', height: '2px', background: isDone ? '#1a3328' : '#e3ddd2', zIndex: 0 }} />
                          )}
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%', zIndex: 1,
                            background: isDone ? '#1a3328' : isActive ? '#c9a84c' : '#e3ddd2',
                            border: isActive ? '2px solid #c9a84c' : 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', color: isDone ? '#fff' : isActive ? '#1a1a1a' : '#909090',
                            boxShadow: isActive ? '0 0 0 4px rgba(201,168,76,.2)' : 'none'
                          }}>{isDone ? '✓' : ''}</div>
                          <div style={{ fontSize: '11px', fontWeight: isActive ? 600 : 400, color: isActive ? '#c9a84c' : isDone ? '#1a3328' : '#909090', marginTop: '5px', textAlign: 'center' }}>{step.lbl}</div>
                          <div style={{ fontSize: '10px', color: '#b0b0b0', marginTop: '2px' }}>{step.date || ''}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* FOOTER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                  <span style={{ fontSize: '12px', color: '#909090' }}>Dernière mise à jour : {o.steps[o.activeStep]?.date || o.date}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '7px 14px', border: '1.5px solid #e3ddd2', borderRadius: '8px', background: '#fff', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>📄 Documents</button>
                    <button style={{ padding: '7px 14px', background: '#1a3328', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Détails →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {filtered.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: '12px', padding: '12px 20px', border: '1px solid #e3ddd2' }}>
            <span style={{ fontSize: '13px', color: '#909090' }}>
              Affichage {(safePage-1)*PER_PAGE+1}–{Math.min(safePage*PER_PAGE, filtered.length)} sur {filtered.length} commande{filtered.length !== 1 ? 's' : ''}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={safePage <= 1}
                style={{ padding: '6px 12px', border: '1.5px solid #e3ddd2', borderRadius: '7px', background: safePage <= 1 ? '#f9f9f9' : '#fff', color: safePage <= 1 ? '#ccc' : '#555', cursor: safePage <= 1 ? 'default' : 'pointer', fontSize: '14px' }}>‹</button>
              {Array.from({ length: pages }, (_, i) => i+1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  style={{ padding: '6px 12px', border: '1.5px solid', borderRadius: '7px', fontSize: '13px', fontWeight: safePage === n ? 600 : 400, cursor: 'pointer',
                    background: safePage === n ? '#1a3328' : '#fff', color: safePage === n ? '#fff' : '#555', borderColor: safePage === n ? '#1a3328' : '#e3ddd2' }}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(pages, p+1))} disabled={safePage >= pages}
                style={{ padding: '6px 12px', border: '1.5px solid #e3ddd2', borderRadius: '7px', background: safePage >= pages ? '#f9f9f9' : '#fff', color: safePage >= pages ? '#ccc' : '#555', cursor: safePage >= pages ? 'default' : 'pointer', fontSize: '14px' }}>›</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}