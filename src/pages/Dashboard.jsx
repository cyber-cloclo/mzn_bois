import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const orders = [
  { ref: '#MBG-9851', essence: 'Okoumé Grade A', icon: '🟤', date: '17 mars 2026', inco: 'FOB · Shanghai', vol: '329 m³', price: '68 400 €', status: 'embarque', statusLabel: 'Embarqué', steps: [1,1,1,1,1,0] },
  { ref: '#MBG-9848', essence: 'Niangon Grade B', icon: '🟡', date: '8 mars 2026', inco: 'CIF · Rotterdam', vol: '210 m³', price: '41 800 €', status: 'transport', statusLabel: 'Transport', steps: [1,1,0,0,0,0] },
  { ref: '#MBG-9843', essence: 'Azobé Grade A', icon: '🔴', date: '2 mars 2026', inco: 'CFR · Anvers', vol: '95 m³', price: '18 200 €', status: 'port', statusLabel: 'Au Port', steps: [1,1,1,0,0,0] },
  { ref: '#MBG-9829', essence: 'Padouk Grade C', icon: '🟠', date: '22 fév. 2026', inco: 'CIF · Osaka', vol: '448 m³', price: '86 000 €', status: 'livre', statusLabel: 'Livré', steps: [1,1,1,1,1,1] },
]

const stepLabels = ['Dépôt','Transport','Au Port','Empoté','Embarqué','Livré']

const statusColors = {
  embarque: { bg: '#dbeafe', color: '#1d4ed8' },
  transport: { bg: '#ffedd5', color: '#c2410c' },
  port:      { bg: '#fef3c7', color: '#b45309' },
  empote:    { bg: '#ede9fe', color: '#6d28d9' },
  livre:     { bg: '#dcfce7', color: '#15803d' },
  depot:     { bg: '#f3f4f6', color: '#4b5563' },
}

const chartData = [
  {m:'Jan',v:320,c:2},{m:'Fév',v:580,c:3},
  {m:'Mar',v:940,c:5},{m:'Avr',v:0,c:0},
  {m:'Mai',v:0,c:0},{m:'Juin',v:0,c:0},
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(true)
  const maxV = Math.max(...chartData.map(d => d.v), 1)
  const chartH = 130

  const months = ['jan.','fév.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.']
  const now = new Date()
  const todayStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

  const s = { // styles réutilisables
    card: { background: '#fff', borderRadius: '14px', padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,.07)' },
    cardTitle: { fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 600, color: '#1a1a1a' },
  }

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* TOPBAR */}
      <header style={{
        height: '64px', background: '#fff', borderBottom: '1px solid #ede7d9',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 8px rgba(0,0,0,.05)'
      }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>Tableau de bord</div>
          <div style={{ fontSize: '12px', color: '#8a8a8a' }}>Bienvenue, Shanghai Timber Co. — Port d'Owendo · Gabon</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#8a8a8a' }}>{todayStr}</span>
          <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', position: 'relative' }}>
            🔔<span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: '#dc2626', borderRadius: '50%', display: 'block' }} />
          </button>
          <button onClick={() => navigate('/commandes/nouvelle')} style={{
            background: '#c9a84c', border: 'none', borderRadius: '8px',
            padding: '8px 16px', fontWeight: 600, fontSize: '13px',
            color: '#1a1a1a', cursor: 'pointer'
          }}>＋ Nouvelle commande</button>
        </div>
      </header>

      <div style={{ padding: '24px 28px', maxWidth: '1400px', margin: '0 auto' }}>

        {/* ALERTE */}
        {showAlert && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            background: '#fffbeb', border: '1px solid #f59e0b',
            borderRadius: '12px', padding: '14px 18px', marginBottom: '24px'
          }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#92400e' }}>Document manquant — Licence FLEGT requise</div>
              <div style={{ fontSize: '12px', color: '#b45309' }}>Commande #MBG-9851 · Okoumé Grade A — délai d'envoi dépassé depuis 3 jours</div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#b45309', cursor: 'pointer' }}>Voir la commande →</span>
            <button onClick={() => setShowAlert(false)} style={{ background: 'none', border: 'none', fontSize: '16px', color: '#b45309', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: '📦', trend: '↑ +2', trendUp: true, value: '5', label: 'Commandes actives' },
            { icon: '🪵', trend: '↑ +12%', trendUp: true, value: '4 820 m³', label: 'Volume exporté (2026)' },
            { icon: '💶', trend: '= stable', trendUp: null, value: '892K€', label: 'CA en cours' },
            { icon: '📄', trend: '! urgent', trendUp: false, value: '2', label: 'Documents manquants', valueRed: true },
          ].map((k, i) => (
            <div key={i} style={{ ...s.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>{k.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '100px',
                  background: k.trendUp === true ? '#dcfce7' : k.trendUp === false ? '#fee2e2' : '#f3f4f6',
                  color: k.trendUp === true ? '#15803d' : k.trendUp === false ? '#dc2626' : '#555'
                }}>{k.trend}</span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: k.valueRed ? '#dc2626' : '#1a1a1a', lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: '12px', color: '#8a8a8a', marginTop: '6px' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* MAIN ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', marginBottom: '20px' }}>

          {/* COMMANDES */}
          <div style={{ ...s.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span style={{ ...s.cardTitle }}>Commandes récentes</span>
                <span style={{ fontSize: '13px', color: '#8a8a8a' }}> — 5 actives</span>
              </div>
              <button onClick={() => navigate('/commandes')} style={{ background: 'none', border: 'none', fontSize: '13px', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>Voir tout →</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {orders.map((o, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto auto',
                  alignItems: 'center', gap: '14px', padding: '14px 12px',
                  borderRadius: '10px', cursor: 'pointer', transition: 'background .15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '22px' }}>{o.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a1a1a' }}>{o.ref} — {o.essence}</div>
                    <div style={{ fontSize: '12px', color: '#8a8a8a', marginTop: '2px' }}>📅 {o.date} &nbsp;🚢 {o.inco}</div>
                    {/* Timeline */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', alignItems: 'center' }}>
                      {o.steps.map((done, si) => {
                        const isActive = done && (si === o.steps.length - 1 || !o.steps[si + 1])
                        return (
                          <div key={si} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{
                              width: '8px', height: '8px', borderRadius: '50%',
                              background: done ? (isActive ? '#c9a84c' : '#1a3328') : '#d1d5db',
                              border: isActive ? '2px solid #c9a84c' : 'none',
                              boxShadow: isActive ? '0 0 0 3px rgba(201,168,76,.2)' : 'none'
                            }} />
                            {si < 5 && <div style={{ width: '16px', height: '2px', background: done && o.steps[si+1] ? '#1a3328' : '#e5e7eb', borderRadius: '1px' }} />}
                          </div>
                        )
                      })}
                      <span style={{ fontSize: '11px', color: '#8a8a8a', marginLeft: '4px' }}>
                        {stepLabels[o.steps.lastIndexOf(1)]}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{o.vol}</div>
                    <div style={{ fontSize: '12px', color: '#8a8a8a' }}>{o.price}</div>
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
                    background: statusColors[o.status]?.bg, color: statusColors[o.status]?.color
                  }}>{o.statusLabel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* FINANCE */}
            <div style={{ background: '#1a3328', borderRadius: '14px', padding: '20px 22px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '16px', fontWeight: 600 }}>Situation financière</div>
                <button style={{ background: 'none', border: 'none', fontSize: '12px', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>Détails →</button>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Total facturé 2026</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#c9a84c', lineHeight: 1.1, margin: '6px 0 2px' }}>94 200 <span style={{ fontSize: '22px', fontWeight: 300 }}>€</span></div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', marginBottom: '18px' }}>Mis à jour aujourd'hui</div>
              {[
                { label: 'Payé', val: '56 700 €', color: '#22c55e' },
                { label: 'En attente', val: '37 500 €', color: '#f59e0b' },
                { label: 'En retard', val: '0 €', color: '#6b7280' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)' }}>{r.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: r.color }}>{r.val}</span>
                </div>
              ))}
              <button onClick={() => navigate('/paiements')} style={{
                width: '100%', marginTop: '16px', padding: '10px',
                background: 'rgba(201,168,76,.15)', border: '1px solid rgba(201,168,76,.3)',
                borderRadius: '8px', color: '#c9a84c', fontWeight: 600, fontSize: '13px', cursor: 'pointer'
              }}>💳 Voir les paiements</button>
            </div>

            {/* ALERTES */}
            <div style={{ ...s.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ ...s.cardTitle, fontSize: '16px' }}>Alertes</span>
                <button style={{ background: 'none', border: 'none', fontSize: '12px', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>Tout voir →</button>
              </div>
              {[
                { icon: '🚨', title: 'Document FLEGT manquant', desc: 'Commande #MBG-9851 — délai 3 jours', time: 'Il y a 2h', unread: true },
                { icon: '⏳', title: 'Paiement SWIFT attendu', desc: "37 500 € · Acompte commande #9848", time: 'Hier', unread: true },
                { icon: '✅', title: 'Livraison confirmée', desc: '#MBG-9829 · Osaka — 448 m³', time: 'Il y a 3 jours', unread: false },
                { icon: '📋', title: 'Nouveau devis validé', desc: '#MBG-9862 · Sipo 180 m³', time: 'Il y a 4 jours', unread: false },
              ].map((n, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '10px', padding: '10px 8px', borderRadius: '8px',
                  background: n.unread ? '#fffbeb' : 'transparent', marginBottom: '4px', cursor: 'pointer',
                  borderLeft: n.unread ? '3px solid #f59e0b' : '3px solid transparent'
                }}>
                  <span style={{ fontSize: '18px' }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{n.title}</div>
                    <div style={{ fontSize: '11px', color: '#8a8a8a' }}>{n.desc}</div>
                    <div style={{ fontSize: '10px', color: '#b0b0b0', marginTop: '2px' }}>{n.time}</div>
                  </div>
                  {n.unread && <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%', marginTop: '4px', flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRAPHIQUE */}
        <div style={{ ...s.card }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span style={{ ...s.cardTitle }}>Volume exporté</span>
              <span style={{ fontSize: '13px', color: '#8a8a8a' }}> — 2026, par mois (m³)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#555' }}>
                <span><span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#1a3328', borderRadius: '2px', marginRight: '5px' }} />Commandes</span>
                <span><span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#c9a84c', borderRadius: '2px', marginRight: '5px' }} />Volume</span>
              </div>
              <button style={{ background: 'none', border: 'none', fontSize: '13px', color: '#c9a84c', fontWeight: 600, cursor: 'pointer' }}>Exporter →</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '160px', padding: '0 8px' }}>
            {chartData.map((d, i) => {
              const cmdH = d.c ? Math.max(8, (d.c / 6) * chartH * 0.35) : 0
              const volH = d.v ? Math.max(8, (d.v / maxV) * chartH * 0.65) : 0
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#8a8a8a' }}>{d.v ? d.v + ' m³' : '—'}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', height: `${chartH}px`, gap: '2px' }}>
                    {d.v > 0 && <>
                      <div style={{ height: `${cmdH}px`, background: '#1a3328', borderRadius: '4px 4px 0 0', transition: 'height .5s' }} />
                      <div style={{ height: `${volH}px`, background: '#c9a84c', borderRadius: '4px 4px 0 0', transition: 'height .5s' }} />
                    </>}
                    {d.v === 0 && <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '2px' }} />}
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', fontWeight: 500 }}>{d.m}</div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}