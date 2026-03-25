import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1e16' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '32px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout