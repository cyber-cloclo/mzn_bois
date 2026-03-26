import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, PlusCircle, CreditCard, FileText, Bell, User, LogOut } from 'lucide-react'

const navItems = [
  { to: '/app/dashboard',            icon: <LayoutDashboard size={18} />, label: 'Tableau de bord' },
  { to: '/app/commandes',            icon: <ShoppingCart size={18} />,    label: 'Mes Commandes',    badge: '7' },
  { to: '/app/commandes/nouvelle',   icon: <PlusCircle size={18} />,      label: 'Nouvelle commande' },
  { to: '/app/paiements',            icon: <CreditCard size={18} />,      label: 'Paiements' },
  { to: '/app/documents',            icon: <FileText size={18} />,        label: 'Documents', badge: '2', badgeRed: true },
]

const accountItems = [
  { to: '/app/notifications', icon: <Bell size={18} />,  label: 'Notifications', badge: '3', badgeRed: true },
  { to: '/app/profil',        icon: <User size={18} />,  label: 'Mon Profil' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside style={{
      width: '220px', minHeight: '100vh',
      background: '#0f1f18', borderRight: '1px solid #1a3328',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Logo → retour accueil */}
      <div onClick={() => navigate('/')}
        style={{ padding: '20px 20px 18px', borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
        <div style={{ width: '38px', height: '38px', background: '#c9a84c', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>🌳</div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 600, color: '#fff', lineHeight: 1 }}>BoisGabon</div>
          <div style={{ fontSize: '10px', color: '#c9a84c', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '2px' }}>Port d'Owendo</div>
        </div>
      </div>

      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', padding: '8px 10px 6px' }}>Menu principal</div>

        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/app/commandes'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '11px',
              padding: '10px 12px', borderRadius: '9px', marginBottom: '2px',
              textDecoration: 'none',
              color: isActive ? '#e2c46e' : 'rgba(255,255,255,.55)',
              background: isActive ? 'rgba(201,168,76,.10)' : 'transparent',
              border: isActive ? '1px solid rgba(201,168,76,.22)' : '1px solid transparent',
              fontWeight: isActive ? 500 : 400, fontSize: '13px', transition: 'all .18s'
            })}>
            {item.icon}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{ background: item.badgeRed ? '#ef4444' : '#c9a84c', color: item.badgeRed ? '#fff' : '#0f1f18', fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '100px' }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', padding: '14px 10px 6px' }}>Compte</div>

        {accountItems.map(item => (
          <NavLink key={item.to} to={item.to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '11px',
              padding: '10px 12px', borderRadius: '9px', marginBottom: '2px',
              textDecoration: 'none',
              color: isActive ? '#e2c46e' : 'rgba(255,255,255,.55)',
              background: isActive ? 'rgba(201,168,76,.10)' : 'transparent',
              border: isActive ? '1px solid rgba(201,168,76,.22)' : '1px solid transparent',
              fontWeight: isActive ? 500 : 400, fontSize: '13px', transition: 'all .18s'
            })}>
            {item.icon}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{ background: item.badgeRed ? '#ef4444' : '#c9a84c', color: item.badgeRed ? '#fff' : '#0f1f18', fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '100px' }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <button onClick={() => navigate('/')} style={{
          display: 'flex', alignItems: 'center', gap: '11px',
          padding: '10px 12px', borderRadius: '9px', marginTop: '8px',
          background: 'none', border: 'none', width: '100%',
          color: 'rgba(255,255,255,.35)', fontSize: '13px', cursor: 'pointer'
        }}
          onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,.7)'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,.35)'}
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </nav>

      <div style={{ margin: '12px', padding: '14px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#a07828)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#0f1f18', flexShrink: 0 }}>ST</div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>Shanghai Timber Co.</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)' }}>Client Admin · CN</div>
          </div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.25)', borderRadius: '100px', padding: '3px 10px', fontSize: '10px', fontWeight: 500, color: '#4ade80' }}>
          ✓ KYC validé · Client Premium
        </div>
      </div>
    </aside>
  )
}