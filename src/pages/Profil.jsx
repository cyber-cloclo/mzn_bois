import { useState } from 'react'

export default function Profil() {
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const field = (label, value, type='text') => (
    <div>
      <label style={{ fontSize:'12px', fontWeight:600, color:'#555', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:'7px' }}>{label}</label>
      <input type={type} defaultValue={value} style={{ width:'100%', padding:'11px 14px', border:'1.5px solid #e3ddd2', borderRadius:'9px', fontSize:'14px', outline:'none', boxSizing:'border-box', fontFamily:'inherit', background:'#fff' }}
        onFocus={e => e.target.style.borderColor='#1a3328'}
        onBlur={e => e.target.style.borderColor='#e3ddd2'} />
    </div>
  )

  return (
    <div style={{ background:'#f5f0e8', minHeight:'100vh', fontFamily:"'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

      {/* TOPBAR */}
      <header style={{ height:'64px', background:'#fff', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 8px rgba(0,0,0,.05)' }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontWeight:600 }}>Mon Profil</div>
          <div style={{ fontSize:'12px', color:'#909090' }}>Shanghai Timber Co. — Paramètres du compte</div>
        </div>
        <button onClick={save} style={{ padding:'9px 20px', background: saved?'#16a34a':'#c9a84c', border:'none', borderRadius:'9px', fontSize:'13px', fontWeight:600, color: saved?'#fff':'#1a1a1a', cursor:'pointer', transition:'all .3s' }}>
          {saved ? '✓ Sauvegardé !' : 'Sauvegarder'}
        </button>
      </header>

      <div style={{ padding:'28px', maxWidth:'900px', display:'flex', flexDirection:'column', gap:'20px' }}>

        {/* EN-TÊTE PROFIL */}
        <div style={{ background:'#1a3328', borderRadius:'14px', padding:'28px 32px', display:'flex', alignItems:'center', gap:'24px' }}>
          <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#c9a84c,#a07828)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', fontWeight:700, color:'#0f1f18', flexShrink:0 }}>ST</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'24px', fontWeight:600, color:'#fff' }}>Shanghai Timber Co.</div>
            <div style={{ fontSize:'13px', color:'rgba(255,255,255,.55)', marginTop:'4px' }}>Client Admin · Chine (CN) · Membre depuis janv. 2024</div>
            <div style={{ display:'flex', gap:'10px', marginTop:'10px' }}>
              <span style={{ padding:'3px 12px', background:'rgba(34,197,94,.15)', border:'1px solid rgba(34,197,94,.3)', borderRadius:'100px', fontSize:'11px', fontWeight:600, color:'#4ade80' }}>✓ KYC validé</span>
              <span style={{ padding:'3px 12px', background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.3)', borderRadius:'100px', fontSize:'11px', fontWeight:600, color:'#c9a84c' }}>⭐ Client Premium</span>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,.4)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'4px' }}>Volume 2026</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'32px', fontWeight:600, color:'#c9a84c' }}>4 820 <span style={{ fontSize:'18px', fontWeight:300 }}>m³</span></div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>

          {/* INFOS SOCIÉTÉ */}
          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #e3ddd2', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🏢</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Informations société</div>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:'14px' }}>
              {field('Raison sociale',     'Shanghai Timber Co. Ltd')}
              {field('N° SIRET / Reg.',   'CN-3100-2019-8847')}
              {field('Adresse',            '288 Pudong Avenue, Shanghai')}
              {field('Code postal / Ville','200120 Shanghai')}
              {field('Pays',               'Chine (CN)')}
            </div>
          </div>

          {/* CONTACT */}
          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #e3ddd2', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>👤</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Contact principal</div>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:'14px' }}>
              {field('Prénom',        'Wei')}
              {field('Nom',           'Zhang')}
              {field('Email',         'w.zhang@shanghaitimber.cn', 'email')}
              {field('Téléphone',     '+86 21 5888 0099', 'tel')}
              {field('Poste',         'Directeur des achats')}
            </div>
          </div>

          {/* STATS */}
          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #e3ddd2', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>📊</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Statistiques annuelles</div>
            </div>
            <div style={{ padding:'20px 24px' }}>
              {[
                { label:'Commandes passées',  val:'23', icon:'📦' },
                { label:'Volume total exporté', val:'18 420 m³', icon:'🪵' },
                { label:'CA total 2024–2026',  val:'3 240 000 €', icon:'💶' },
                { label:'Taux de livraison',   val:'98.6 %', icon:'✅' },
                { label:'Délai moyen',          val:'34 jours', icon:'⏱️' },
              ].map((s, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom: i < 4 ? '1px solid #f5f0e8' : 'none' }}>
                  <span style={{ fontSize:'13px', color:'#555' }}>{s.icon} {s.label}</span>
                  <span style={{ fontSize:'14px', fontWeight:700, color:'#1a3328' }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SÉCURITÉ */}
          <div style={{ background:'#fff', borderRadius:'14px', border:'1px solid #e3ddd2', overflow:'hidden' }}>
            <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🔒</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Sécurité</div>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:'14px' }}>
              {field('Mot de passe actuel',   '••••••••', 'password')}
              {field('Nouveau mot de passe',  '', 'password')}
              {field('Confirmer',             '', 'password')}
              <button style={{ padding:'11px', background:'#1a3328', color:'#fff', border:'none', borderRadius:'9px', fontSize:'14px', fontWeight:600, cursor:'pointer', marginTop:'4px' }}>
                🔒 Mettre à jour le mot de passe
              </button>
              <div style={{ padding:'12px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'9px', fontSize:'12px', color:'#15803d' }}>
                ✓ Authentification SSO entreprise active · Dernière connexion : aujourd'hui
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}