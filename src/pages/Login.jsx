//import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'

const i18n = {
  fr: {
    badge: 'Connexion sécurisée', title: 'Bon retour,',
    subtitle: 'Accédez à vos commandes, documents et paiements.',
    email: 'Adresse e-mail', password: 'Mot de passe',
    remember: 'Rester connecté', forgot: 'Mot de passe oublié ?',
    submit: 'Se connecter →', divider: 'Ou continuer avec',
    sso: 'Connexion SSO Entreprise', noAccount: 'Pas encore de compte ?',
    request: 'Demander un accès', legal: 'Mentions légales & Confidentialité',
    errEmail: 'Veuillez saisir une adresse valide.', errPwd: 'Mot de passe incorrect.',
  },
  en: {
    badge: 'Secure login', title: 'Welcome back,',
    subtitle: 'Access your orders, documents and payments.',
    email: 'Email address', password: 'Password',
    remember: 'Stay logged in', forgot: 'Forgot password?',
    submit: 'Log in →', divider: 'Or continue with',
    sso: 'Enterprise SSO Login', noAccount: "Don't have an account?",
    request: 'Request access', legal: 'Legal & Privacy',
    errEmail: 'Please enter a valid email address.', errPwd: 'Incorrect password.',
  }
}

export default function Login() {
  const navigate = useNavigate()
  const [lang, setLang] = useState('fr')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [errEmail, setErrEmail] = useState(false)
  const [errPwd, setErrPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const t = i18n[lang]

  function handleLogin() {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    const pwdOk = password.length >= 1
    setErrEmail(!emailOk)
    setErrPwd(!pwdOk)
    if (!emailOk || !pwdOk) return
    setLoading(true)
    setTimeout(() => { setSuccess(true); setTimeout(() => navigate('/dashboard'), 800) }, 1200)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* PANEL GAUCHE */}
      <div style={{
        flex: 1, background: '#122620', padding: '52px 60px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '44px', height: '44px', background: '#c9a84c', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
          }}>🌳</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: '#fff' }}>BoisGabon</div>
            <div style={{ fontSize: '11px', color: '#c9a84c', letterSpacing: '.12em', textTransform: 'uppercase' }}>Négoce & Export · Port d'Owendo</div>
          </div>
        </div>

        {/* Hero */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(201,168,76,.12)', border: '1px solid rgba(201,168,76,.25)',
            borderRadius: '100px', padding: '6px 14px', fontSize: '11px',
            color: '#e2c46e', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '28px'
          }}>
            <span style={{ width: '6px', height: '6px', background: '#c9a84c', borderRadius: '50%', display: 'inline-block' }} />
            Espace Client Sécurisé
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: '54px',
            fontWeight: 300, lineHeight: 1.15, color: '#f5f0e8', marginBottom: '22px'
          }}>
            Votre bois,<br /><em style={{ fontStyle: 'italic', color: '#e2c46e' }}>tracé à la<br />source.</em>
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(245,240,232,.6)', maxWidth: '380px' }}>
            Gérez vos commandes d'export depuis le dépôt gabonais jusqu'à la livraison dans votre port, en temps réel et en toute conformité.
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
          {[
            { icon: '📍', title: 'Suivi en temps réel', desc: "De l'abattage à la livraison — 6 étapes visibles en un coup d'œil" },
            { icon: '📄', title: 'Documents légaux centralisés', desc: 'FLEGT, phytosanitaire, douane — accessibles et téléchargeables' },
            { icon: '💳', title: 'Paiements sécurisés', desc: 'Acomptes, soldes, SWIFT — historique complet et alertes' },
            { icon: '✅', title: 'Essences certifiées', desc: 'Conformité CITES & EUDR vérifiée à chaque commande' },
          ].map(f => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '36px', height: '36px', background: 'rgba(201,168,76,.1)',
                border: '1px solid rgba(201,168,76,.2)', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0
              }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#f5f0e8', marginBottom: '3px' }}>{f.title}</div>
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(245,240,232,.5)', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL DROIT */}
      <div style={{
        width: '480px', flexShrink: 0, background: '#f5f0e8',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '52px 48px'
      }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>

          {/* Lang switch */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '36px' }}>
            <div style={{ border: '1px solid rgba(26,51,40,.18)', borderRadius: '8px', overflow: 'hidden', display: 'flex' }}>
              {['fr', 'en'].map(l => (
                <span key={l} onClick={() => setLang(l)} style={{
                  padding: '6px 14px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                  background: lang === l ? '#1a3328' : 'transparent',
                  color: lang === l ? '#fff' : '#555', transition: 'all .2s'
                }}>{l.toUpperCase()}</span>
              ))}
            </div>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(26,51,40,.08)', borderRadius: '100px',
              padding: '5px 12px', fontSize: '11px', fontWeight: 500,
              color: '#1a3328', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '16px'
            }}>🔒 {t.badge}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>{t.title}</h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: '#888' }}>{t.subtitle}</p>
          </div>

          {/* Champs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '22px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#555', letterSpacing: '.06em', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>{t.email}</label>
              <div style={{ position: 'relative' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="vous@societe.com"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{
                    width: '100%', padding: '13px 44px 13px 16px', fontSize: '14px',
                    border: `1.5px solid ${errEmail ? '#c0392b' : 'rgba(26,51,40,.18)'}`,
                    borderRadius: '10px', background: '#fff', color: '#1a1a1a',
                    boxSizing: 'border-box', outline: 'none'
                  }} />
                <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>✉</span>
              </div>
              {errEmail && <p style={{ fontSize: '11px', color: '#c0392b', marginTop: '5px' }}>{t.errEmail}</p>}
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#555', letterSpacing: '.06em', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>{t.password}</label>
              <div style={{ position: 'relative' }}>
                <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{
                    width: '100%', padding: '13px 44px 13px 16px', fontSize: '14px',
                    border: `1.5px solid ${errPwd ? '#c0392b' : 'rgba(26,51,40,.18)'}`,
                    borderRadius: '10px', background: '#fff', color: '#1a1a1a',
                    boxSizing: 'border-box', outline: 'none'
                  }} />
                <button onClick={() => setShowPwd(!showPwd)} type="button"
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                  {showPwd ? '🙈' : '👁'}
                </button>
              </div>
              {errPwd && <p style={{ fontSize: '11px', color: '#c0392b', marginTop: '5px' }}>{t.errPwd}</p>}
            </div>
          </div>

          {/* Remember + forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555', cursor: 'pointer' }}>
              <input type="checkbox" /> {t.remember}
            </label>
            <a href="#" style={{ fontSize: '13px', color: '#1a3328', fontWeight: 500 }}>{t.forgot}</a>
          </div>

          {/* Bouton */}
          <button onClick={handleLogin} style={{
            width: '100%', padding: '14px',
            background: success ? '#2d6a4f' : '#c9a84c',
            border: 'none', borderRadius: '10px',
            color: success ? '#fff' : '#1a1a1a',
            fontWeight: 600, fontSize: '15px', cursor: 'pointer',
            transition: 'all .3s', marginBottom: '24px'
          }}>
            {loading && !success ? '⏳' : success ? '✓ Connexion réussie' : t.submit}
          </button>

          {/* Divider */}
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', margin: '0 0 20px', position: 'relative' }}>
            <span style={{ background: '#f5f0e8', padding: '0 12px', position: 'relative', zIndex: 1 }}>{t.divider}</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(26,51,40,.12)' }} />
          </div>

          {/* SSO */}
          <button onClick={() => alert('Redirection SSO entreprise…')} style={{
            width: '100%', padding: '13px', background: '#fff',
            border: '1.5px solid rgba(26,51,40,.18)', borderRadius: '10px',
            display: 'flex', alignItems: 'center', gap: '12px',
            cursor: 'pointer', fontSize: '14px', color: '#1a1a1a', fontWeight: 500, marginBottom: '28px'
          }}>
            <div style={{ width: '28px', height: '28px', background: '#1a3328', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c9a84c', fontWeight: 700, fontSize: '13px' }}>B</div>
            {t.sso}
          </button>

          {/* Footer */}
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
            <p style={{ marginBottom: '6px' }}>{t.noAccount} <a href="#" style={{ color: '#1a3328', fontWeight: 600 }}>{t.request}</a></p>
            <a href="#" style={{ color: '#aaa' }}>{t.legal}</a>
          </div>
        </div>
      </div>
    </div>
  )
}