import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Commandes from './pages/Commandes'
import Paiements from './pages/Paiements'
import NouvelleCommande from './pages/NouvelleCommande'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="commandes" element={<Commandes />} />
        <Route path="commandes/nouvelle" element={<NouvelleCommande />} />
        <Route path="paiements" element={<Paiements />} />
      </Route>
    </Routes>
  )
}

export default App