import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, FileText, Bell, User } from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { to: '/commandes', icon: <ShoppingCart size={20} />, label: 'Commandes' },
  { to: '/documents', icon: <FileText size={20} />, label: 'Documents' },
  { to: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
  { to: '/profil', icon: <User size={20} />, label: 'Mon Profil' },
]

function Sidebar() {
  return (
    <aside style={{
      width: '220px', minHeight: '100vh',
      background: '#122a1e', borderRight: '1px solid #1e3d2a',
      display: 'flex', flexDirection: 'column', padding: '24px 0'
    }}>
      {/* Logo */}
      <div style={{ padding: '0 24px 32px', borderBottom: '1px solid #1e3d2a' }}>
        <h1 style={{ color: '#c9a84c', fontSize: '20px', fontWeight: '700', margin: 0 }}>
          🌳 MZN Bois
        </h1>
        <p style={{ color: '#5a8a6a', fontSize: '11px', margin: '4px 0 0' }}>
          Export & Négoce
        </p>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
            textDecoration: 'none',
            color: isActive ? '#c9a84c' : '#7aaa88',
            background: isActive ? '#1a3a2a' : 'transparent',
            fontWeight: isActive ? '600' : '400',
            fontSize: '14px',
            transition: 'all 0.2s'
          })}>
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer sidebar */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #1e3d2a' }}>
        <p style={{ color: '#3d6b4f', fontSize: '11px', margin: 0 }}>
          Port d'Owendo — Gabon
        </p>
      </div>
    </aside>
  )
}

export default Sidebar