import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f0e8' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '220px', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout