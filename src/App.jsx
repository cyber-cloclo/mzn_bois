import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Accueil from './pages/Accueil'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Commandes from './pages/Commandes'
import Paiements from './pages/Paiements'
import NouvelleCommande from './pages/NouvelleCommande'
import Documents from './pages/Documents'
import Notifications from './pages/Notifications'
import Profil from './pages/Profil'
import Inscription from './pages/Inscription'

function App() {
  return (
    <Routes>
      {/* Pages SANS sidebar */}
      <Route path="/"        element={<Accueil />} />
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/inscription" element={<Inscription />} />

      {/* Pages AVEC sidebar */}
      <Route path="/app" element={<Layout />}>
        <Route index        element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard"          element={<Dashboard />} />
        <Route path="commandes"          element={<Commandes />} />
        <Route path="commandes/nouvelle" element={<NouvelleCommande />} />
        <Route path="paiements"          element={<Paiements />} />
        <Route path="documents"          element={<Documents />} />
        <Route path="notifications"      element={<Notifications />} />
        <Route path="profil"             element={<Profil />} />
      </Route>
    </Routes>
  )
}

export default App