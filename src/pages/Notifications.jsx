import { useState } from 'react'

const NOTIFS = [
  { id:1,  icon:'🚨', title:'Document FLEGT manquant',      desc:'Commande #MBG-9851 — délai dépassé depuis 3 jours',     time:'Il y a 2h',      unread:true,  type:'alerte' },
  { id:2,  icon:'⏳', title:'Paiement SWIFT attendu',        desc:'37 500 € · Acompte commande #MBG-9848',                 time:'Hier',           unread:true,  type:'paiement' },
  { id:3,  icon:'🚨', title:'Document FLEGT manquant',      desc:'Commande #MBG-9862 — soumission requise',               time:'Il y a 1 jour',  unread:true,  type:'alerte' },
  { id:4,  icon:'✅', title:'Livraison confirmée',           desc:'#MBG-9829 · Osaka — 448 m³ livrés',                    time:'Il y a 3 jours', unread:false, type:'livraison' },
  { id:5,  icon:'📋', title:'Nouveau devis validé',          desc:'#MBG-9862 · Sipo Grade A — 180 m³',                    time:'Il y a 4 jours', unread:false, type:'commande' },
  { id:6,  icon:'🚢', title:'Embarquement confirmé',         desc:'#MBG-9851 · Shanghai — départ 17/03',                  time:'Il y a 5 jours', unread:false, type:'livraison' },
  { id:7,  icon:'💳', title:'Paiement reçu',                 desc:'PAY-2655 · 17 250 € · Niangon #MBG-9848',              time:'Il y a 6 jours', unread:false, type:'paiement' },
  { id:8,  icon:'📦', title:'Commande en cours de traitement', desc:'#MBG-9858 · Niangon 215 m³ — dépôt confirmé',        time:'Il y a 1 sem.',  unread:false, type:'commande' },
]

const TYPE_COLORS = {
  alerte:   { bg:'#fee2e2', color:'#dc2626' },
  paiement: { bg:'#fef3c7', color:'#b45309' },
  livraison:{ bg:'#dcfce7', color:'#15803d' },
  commande: { bg:'#dbeafe', color:'#1d4ed8' },
}

export default function Notifications() {
  const [notifs, setNotifs] = useState(NOTIFS)
  const [filter, setFilter] = useState('tous')

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, unread:false })))
  const markRead = (id) => setNotifs(n => n.map(x => x.id===id ? { ...x, unread:false } : x))

  const filtered = filter === 'tous' ? notifs : filter === 'nonlu' ? notifs.filter(n=>n.unread) : notifs.filter(n=>n.type===filter)
  const unreadCount = notifs.filter(n=>n.unread).length

  const chip = (active) => ({
    padding:'5px 12px', borderRadius:'100px', fontSize:'12px',
    fontWeight: active?600:400, cursor:'pointer', transition:'all .15s',
    border: active?'1.5px solid #1a3328':'1.5px solid #e3ddd2',
    background: active?'#1a3328':'#fff', color: active?'#fff':'#555',
  })

  return (
    <div style={{ background:'#f5f0e8', minHeight:'100vh', fontFamily:"'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

      {/* TOPBAR */}
      <header style={{ height:'64px', background:'#fff', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 8px rgba(0,0,0,.05)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontWeight:600 }}>Notifications</div>
            <div style={{ fontSize:'12px', color:'#909090' }}>Shanghai Timber Co.</div>
          </div>
          {unreadCount > 0 && (
            <span style={{ background:'#ef4444', color:'#fff', fontSize:'11px', fontWeight:700, padding:'3px 9px', borderRadius:'100px' }}>{unreadCount} non lues</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ padding:'8px 16px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background:'#fff', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>
            ✓ Tout marquer comme lu
          </button>
        )}
      </header>

      <div style={{ padding:'24px 28px', maxWidth:'800px', display:'flex', flexDirection:'column', gap:'16px' }}>

        {/* FILTRES */}
        <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
          {[
            { val:'tous',      label:'Toutes' },
            { val:'nonlu',     label:`Non lues (${unreadCount})` },
            { val:'alerte',    label:'Alertes' },
            { val:'paiement',  label:'Paiements' },
            { val:'livraison', label:'Livraisons' },
            { val:'commande',  label:'Commandes' },
          ].map(f => (
            <button key={f.val} onClick={() => setFilter(f.val)} style={chip(filter===f.val)}>{f.label}</button>
          ))}
        </div>

        {/* LISTE */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {filtered.length === 0 ? (
            <div style={{ background:'#fff', borderRadius:'14px', padding:'48px', textAlign:'center' }}>
              <div style={{ fontSize:'36px', marginBottom:'10px' }}>🔔</div>
              <div style={{ fontWeight:600, color:'#1a1a1a' }}>Aucune notification</div>
              <div style={{ fontSize:'13px', color:'#909090', marginTop:'6px' }}>Vous êtes à jour !</div>
            </div>
          ) : filtered.map(n => (
            <div key={n.id} onClick={() => markRead(n.id)}
              style={{ background:'#fff', borderRadius:'12px', padding:'16px 20px', border: n.unread?'1.5px solid #fbbf24':'1px solid #e3ddd2', display:'flex', alignItems:'flex-start', gap:'14px', cursor:'pointer', transition:'box-shadow .15s', boxShadow: n.unread?'0 2px 12px rgba(251,191,36,.15)':'none' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow=n.unread?'0 2px 12px rgba(251,191,36,.15)':'none'}
            >
              <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:TYPE_COLORS[n.type]?.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>{n.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ fontWeight: n.unread?700:500, fontSize:'14px', color:'#1a1a1a' }}>{n.title}</div>
                  <span style={{ fontSize:'11px', color:'#b0b0b0', flexShrink:0, marginLeft:'12px' }}>{n.time}</span>
                </div>
                <div style={{ fontSize:'12px', color:'#909090', marginTop:'3px' }}>{n.desc}</div>
                <div style={{ marginTop:'6px' }}>
                  <span style={{ padding:'2px 8px', borderRadius:'100px', fontSize:'10px', fontWeight:600, background:TYPE_COLORS[n.type]?.bg, color:TYPE_COLORS[n.type]?.color }}>
                    {n.type.charAt(0).toUpperCase()+n.type.slice(1)}
                  </span>
                </div>
              </div>
              {n.unread && <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#f59e0b', flexShrink:0, marginTop:'4px' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}