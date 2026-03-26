import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Inscription() {
  const navigate = useNavigate()
  const [type, setType] = useState('') // 'acheteur' | 'fournisseur'
  const [logo, setLogo] = useState(null)
  const [step, setStep] = useState(1) // 1 = choix type, 2 = formulaire
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    entreprise: '', siren: '', email: '', telephone: '',
    nomResponsable: '', prenomResponsable: '',
    // Fournisseur (Gabon)
    adresseGabon: '', villeGabon: '', codePostalGabon: '', provinceGabon: '',
    // Acheteur (international)
    adresseInt: '', villeInt: '', codePostalInt: '', paysInt: '',
  })
  const [errors, setErrors] = useState({})

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.entreprise)      e.entreprise = true
    if (!form.siren)           e.siren = true
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true
    if (!form.telephone)       e.telephone = true
    if (!form.nomResponsable)  e.nomResponsable = true
    if (!form.prenomResponsable) e.prenomResponsable = true
    if (type === 'fournisseur') {
      if (!form.adresseGabon)  e.adresseGabon = true
      if (!form.villeGabon)    e.villeGabon = true
    }
    if (type === 'acheteur') {
      if (!form.adresseInt)    e.adresseInt = true
      if (!form.villeInt)      e.villeInt = true
      if (!form.paysInt)       e.paysInt = true
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (validate()) setSubmitted(true)
  }

  const handleLogo = (e) => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = ev => setLogo(ev.target.result)
    r.readAsDataURL(f)
  }

  const inp = (hasErr) => ({
    width: '100%', padding: '12px 14px',
    border: `1.5px solid ${hasErr ? '#dc2626' : 'rgba(26,51,40,.2)'}`,
    borderRadius: '10px', fontSize: '14px', outline: 'none',
    background: hasErr ? '#fef2f2' : '#fff',
    color: '#1a1a1a', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color .2s',
  })

  const Field = ({ label, k, type='text', placeholder, required=true }) => (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 600, color: '#555', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>
        {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <input type={type} value={form[k]} onChange={e => { setF(k, e.target.value); setErrors(er => ({ ...er, [k]: false })) }}
        placeholder={placeholder}
        style={inp(errors[k])}
        onFocus={e => { if (!errors[k]) e.target.style.borderColor = '#1a3328' }}
        onBlur={e => { if (!errors[k]) e.target.style.borderColor = 'rgba(26,51,40,.2)' }}
      />
      {errors[k] && <p style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>Champ requis.</p>}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", display: 'flex' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* PANEL GAUCHE */}
      <div style={{
        flex: 1, background: '#122620', padding: '52px 60px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Grain texture */}
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(102deg, transparent, transparent 38px, rgba(201,168,76,.03) 38px, rgba(201,168,76,.03) 40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-120px', left: '-80px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201,168,76,.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '44px', height: '44px', background: '#c9a84c', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🌳</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: '#fff' }}>BoisGabon</div>
            <div style={{ fontSize: '11px', color: '#c9a84c', letterSpacing: '.12em', textTransform: 'uppercase' }}>Négoce & Export · Port d'Owendo</div>
          </div>
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,168,76,.12)', border: '1px solid rgba(201,168,76,.25)', borderRadius: '100px', padding: '6px 14px', fontSize: '11px', color: '#e2c46e', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '28px' }}>
            <span style={{ width: '6px', height: '6px', background: '#c9a84c', borderRadius: '50%', display: 'inline-block' }} />
            Demande d'accès partenaire
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, lineHeight: 1.15, color: '#f5f0e8', marginBottom: '22px' }}>
            Rejoignez<br />
            <em style={{ fontStyle: 'italic', color: '#c9a84c' }}>notre réseau</em><br />
            de partenaires.
          </h1>
          <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(245,240,232,.6)', maxWidth: '380px' }}>
            Acheteurs internationaux ou fournisseurs gabonais — accédez à notre plateforme de négoce certifiée FLEGT & EUDR.
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
          {[
            { icon: '🔒', title: 'Espace sécurisé', desc: 'Accès après validation KYC par nos équipes' },
            { icon: '📦', title: 'Suivi en temps réel', desc: 'Commandes, documents, paiements centralisés' },
            { icon: '🌍', title: 'Export mondial', desc: 'FOB, CIF, CFR vers tous les grands ports' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,.1)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#f5f0e8', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(245,240,232,.5)' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL DROIT */}
      <div style={{ width: '520px', flexShrink: 0, background: '#f5f0e8', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {submitted ? (
          /* ── CONFIRMATION ── */
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Demande envoyée !</h2>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>
                Votre demande d'accès a bien été reçue. Notre équipe va vérifier vos informations et vous contactera dans les <strong>24–48h ouvrées</strong> pour finaliser votre accès.
              </p>
              <div style={{ padding: '14px 18px', background: 'rgba(26,51,40,.06)', borderRadius: '10px', fontSize: '13px', color: '#1a3328', marginBottom: '28px' }}>
                📧 Un email de confirmation a été envoyé à <strong>{form.email}</strong>
              </div>
              <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '14px', background: '#c9a84c', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', color: '#1a1a1a', cursor: 'pointer', fontFamily: 'inherit' }}>
                Retour à la connexion →
              </button>
            </div>
          </div>

        ) : step === 1 ? (
          /* ── ÉTAPE 1 : CHOIX TYPE ── */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '52px 48px' }}>
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(26,51,40,.08)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', fontWeight: 500, color: '#1a3328', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                🌿 Étape 1 sur 2
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Vous êtes…</h2>
              <p style={{ fontSize: '13px', color: '#888' }}>Sélectionnez votre profil pour adapter le formulaire.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {[
                { val: 'acheteur', icon: '🚢', title: 'Acheteur / Importateur', desc: 'Entreprise basée hors Gabon souhaitant importer du bois tropical certifié.' },
                { val: 'fournisseur', icon: '🌳', title: 'Fournisseur / Producteur', desc: 'Entreprise gabonaise productrice ou exploitante forestière souhaitant vendre via notre plateforme.' },
              ].map(t => (
                <div key={t.val} onClick={() => setType(t.val)}
                  style={{ padding: '20px 22px', borderRadius: '14px', border: `2px solid ${type === t.val ? '#1a3328' : 'rgba(26,51,40,.15)'}`, background: type === t.val ? 'rgba(26,51,40,.06)' : '#fff', cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: type === t.val ? '#1a3328' : '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, transition: 'background .2s' }}>{t.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: '#1a1a1a', marginBottom: '4px' }}>{t.title}</div>
                    <div style={{ fontSize: '12px', fontWeight: 300, color: '#888', lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${type === t.val ? '#1a3328' : '#ddd'}`, background: type === t.val ? '#1a3328' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    {type === t.val && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a84c' }} />}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { if (type) setStep(2) }} style={{ width: '100%', padding: '14px', background: type ? '#c9a84c' : '#e3ddd2', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', color: type ? '#1a1a1a' : '#aaa', cursor: type ? 'pointer' : 'default', fontFamily: 'inherit', transition: 'all .2s' }}>
              Continuer →
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
              Déjà un compte ? <span onClick={() => navigate('/login')} style={{ color: '#1a3328', fontWeight: 600, cursor: 'pointer' }}>Se connecter</span>
            </p>
          </div>

        ) : (
          /* ── ÉTAPE 2 : FORMULAIRE ── */
          <div style={{ padding: '40px 48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <button onClick={() => setStep(1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid rgba(26,51,40,.2)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>←</button>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(26,51,40,.08)', borderRadius: '100px', padding: '4px 10px', fontSize: '11px', fontWeight: 500, color: '#1a3328', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {type === 'acheteur' ? '🚢 Acheteur / Importateur' : '🌳 Fournisseur / Producteur'} · Étape 2/2
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Informations de votre entreprise</h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Entreprise */}
              <div style={{ padding: '16px', background: 'rgba(26,51,40,.04)', borderRadius: '12px', border: '1px solid rgba(26,51,40,.08)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a3328', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px' }}>🏢 Société</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Field label="Nom de l'entreprise" k="entreprise" placeholder="ex. Shanghai Timber Co. Ltd" />
                  <Field label="N° SIREN / Registre commerce" k="siren" placeholder="ex. 123 456 789 ou GA-LBV-2024-B-001" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <Field label="Email professionnel" k="email" type="email" placeholder="contact@societe.com" />
                    <Field label="Téléphone entreprise" k="telephone" type="tel" placeholder="+33 1 23 45 67 89" />
                  </div>
                </div>
              </div>

              {/* Responsable */}
              <div style={{ padding: '16px', background: 'rgba(26,51,40,.04)', borderRadius: '12px', border: '1px solid rgba(26,51,40,.08)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a3328', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '12px' }}>👤 Responsable du compte</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Field label="Nom" k="nomResponsable" placeholder="ex. Zhang" />
                  <Field label="Prénom" k="prenomResponsable" placeholder="ex. Wei" />
                </div>
              </div>

              {/* Adresse selon type */}
              {type === 'fournisseur' && (
                <div style={{ padding: '16px', background: 'rgba(201,168,76,.06)', borderRadius: '12px', border: '1px solid rgba(201,168,76,.2)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '4px' }}>📍 Adresse au Gabon</div>
                  <div style={{ fontSize: '12px', color: '#b45309', marginBottom: '12px' }}>Localisation de votre exploitation / entrepôt au Gabon</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Field label="Adresse" k="adresseGabon" placeholder="ex. Zone Industrielle d'Owendo, Lot 42" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <Field label="Ville" k="villeGabon" placeholder="ex. Libreville" />
                      <Field label="Province" k="provinceGabon" placeholder="ex. Estuaire" required={false} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#555', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>Pays</label>
                      <div style={{ padding: '12px 14px', background: '#f5f0e8', border: '1.5px solid rgba(26,51,40,.2)', borderRadius: '10px', fontSize: '14px', color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🇬🇦 Gabon
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === 'acheteur' && (
                <div style={{ padding: '16px', background: 'rgba(37,99,235,.05)', borderRadius: '12px', border: '1px solid rgba(37,99,235,.15)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '4px' }}>📍 Adresse de l'entreprise</div>
                  <div style={{ fontSize: '12px', color: '#3b82f6', marginBottom: '12px' }}>Adresse principale de votre société</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Field label="Adresse" k="adresseInt" placeholder="ex. 288 Pudong Avenue" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <Field label="Code postal" k="codePostalInt" placeholder="ex. 75001" required={false} />
                      <Field label="Ville" k="villeInt" placeholder="ex. Paris" />
                    </div>
                    <Field label="Pays" k="paysInt" placeholder="ex. France, Chine, Pays-Bas…" />
                  </div>
                </div>
              )}

              {/* Logo facultatif */}
              <div style={{ padding: '16px', background: 'rgba(26,51,40,.04)', borderRadius: '12px', border: '1px solid rgba(26,51,40,.08)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#1a3328', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '4px' }}>🖼️ Logo entreprise <span style={{ fontWeight: 400, color: '#aaa', textTransform: 'none', letterSpacing: 0 }}>(facultatif)</span></div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>Sera affiché dans votre espace client · JPG, PNG · max 2 Mo</div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                  <input type="file" accept="image/*" onChange={handleLogo} style={{ display: 'none' }} />
                  {logo ? (
                    <img src={logo} alt="Logo" style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '10px', border: '1.5px solid rgba(26,51,40,.2)', background: '#fff', padding: '4px' }} />
                  ) : (
                    <div style={{ width: '64px', height: '64px', borderRadius: '10px', border: '2px dashed rgba(26,51,40,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', background: '#fff' }}>+</div>
                  )}
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a3328' }}>{logo ? '✓ Logo chargé' : 'Cliquez pour ajouter votre logo'}</div>
                    <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>Format recommandé : carré, fond transparent</div>
                  </div>
                </label>
              </div>

              {/* Bouton submit */}
              <button onClick={handleSubmit} style={{ width: '100%', padding: '14px', background: '#c9a84c', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', color: '#1a1a1a', cursor: 'pointer', fontFamily: 'inherit', marginTop: '4px', transition: 'background .2s' }}
                onMouseEnter={e => e.target.style.background='#e2c46e'}
                onMouseLeave={e => e.target.style.background='#c9a84c'}
              >
                Envoyer ma demande d'accès →
              </button>

              <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', lineHeight: 1.6 }}>
                Votre demande sera examinée par notre équipe sous 24–48h. En soumettant ce formulaire, vous acceptez nos <span style={{ color: '#1a3328', cursor: 'pointer' }}>CGU</span> et notre <span style={{ color: '#1a3328', cursor: 'pointer' }}>politique de confidentialité</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}