import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const ESSENCES = [
  { key:'okoume',   label:'Okoumé',   icon:'🟤', desc:'Bois léger · Gabon', cites:false },
  { key:'niangon',  label:'Niangon',  icon:'🟡', desc:'Mi-lourd · Côte d\'Ivoire', cites:false },
  { key:'azobe',    label:'Azobé',    icon:'🔴', desc:'Très dur · Afrique Centrale', cites:false },
  { key:'padouk',   label:'Padouk',   icon:'🟠', desc:'Mi-dur · Gabon', cites:false },
  { key:'sipo',     label:'Sipo',     icon:'🟤', desc:'Acajou africain · Gabon', cites:false },
  { key:'movingui', label:'Movingui', icon:'🟡', desc:'Bois jaune · Gabon', cites:true },
]

const INCOTERMS = [
  { code:'FOB', name:'Free On Board',           resp:'Fret à votre charge' },
  { code:'CIF', name:'Cost, Insurance & Freight', resp:'Fret + assurance inclus' },
  { code:'CFR', name:'Cost & Freight',           resp:'Fret inclus' },
  { code:'EXW', name:'Ex Works',                 resp:'Enlèvement usine' },
]

const PRIX_BASE = { okoume:185, niangon:185, azobe:195, padouk:220, sipo:200, movingui:250 }
const ESSENCE_LABELS = { okoume:'Okoumé', niangon:'Niangon', azobe:'Azobé', padouk:'Padouk', sipo:'Sipo', movingui:'Movingui' }

const STEPS = ['Essence & Qualité','Volume & Dimensions','Incoterm & Livraison','Photos & Notes']

export default function NouvelleCommande() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ essence:'', grade:'', vol:'', inco:'', port:'', date:'', notes:'' })
  const [dims, setDims] = useState({ l:'', w:'', e:'', nb:'' })
  const [photos, setPhotos] = useState([])
  const [errors, setErrors] = useState({})
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved
  const [confirmed, setConfirmed] = useState(false)
  const [confirmRef, setConfirmRef] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef()
  const saveTimer = useRef()

  const triggerSave = useCallback(() => {
    setSaveState('saving')
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 3000)
    }, 900)
  }, [])

  const setF = (key, val) => { setForm(f => ({ ...f, [key]: val })); triggerSave() }

  const calcVol = (newDims) => {
    const { l, w, e, nb } = newDims
    if (l && w && e && nb) {
      const v = (parseFloat(l)*parseFloat(w)*parseFloat(e)*parseFloat(nb)).toFixed(2)
      setForm(f => ({ ...f, vol: v }))
    }
  }

  const estPrice = () => {
    if (!form.essence || !form.vol) return '—'
    const base = PRIX_BASE[form.essence] || 190
    const mult = form.grade==='A' ? 1 : form.grade==='B' ? 0.85 : 0.72
    return `≈ ${Math.round(base * parseFloat(form.vol) * mult).toLocaleString('fr-FR')} €`
  }

  const validate = () => {
    const errs = {}
    if (step === 0) { if (!form.essence) errs.essence = true; if (!form.grade) errs.grade = true }
    if (step === 1) { if (!form.vol || parseFloat(form.vol) <= 0) errs.vol = true }
    if (step === 2) { if (!form.inco) errs.inco = true; if (!form.port) errs.port = true; if (!form.date) errs.date = true }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => { if (validate()) { if (step === 3) submitOrder(); else setStep(s => s+1); triggerSave() } }
  const prev = () => { setStep(s => s-1); setErrors({}) }

  const submitOrder = () => {
    const ref = 'MBG-' + (9863 + Math.floor(Math.random()*10))
    setConfirmRef(`#${ref}`)
    setConfirmed(true)
  }

  const handleFiles = (files) => {
    const arr = Array.from(files).slice(0, 20 - photos.length)
    arr.forEach(f => {
      const r = new FileReader()
      r.onload = e => setPhotos(p => [...p, { name: f.name, src: e.target.result }])
      r.readAsDataURL(f)
    })
  }

  const inp = (hasErr) => ({
    width: '100%', padding: '11px 14px', border: `1.5px solid ${hasErr ? '#dc2626' : '#e3ddd2'}`,
    borderRadius: '9px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
    background: hasErr ? '#fef2f2' : '#fff', fontFamily: 'inherit'
  })

  return (
    <div style={{ background:'#f5f0e8', minHeight:'100vh', fontFamily:"'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

      {/* TOPBAR */}
      <header style={{ height:'64px', background:'#fff', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 8px rgba(0,0,0,.05)' }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'20px', fontWeight:600 }}>Nouvelle Commande</div>
          <div style={{ fontSize:'12px', color:'#909090' }}>Shanghai Timber Co. — Port d'Owendo · Gabon</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', color:'#909090', background:'#f5f0e8', border:'1px solid #e3ddd2', borderRadius:'8px', padding:'5px 12px' }}>
            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background: saveState==='saving'?'#c9a84c':saveState==='saved'?'#16a34a':'#9ca3af', transition:'background .3s' }} />
            {saveState==='saving'?'Sauvegarde…':saveState==='saved'?'Brouillon sauvegardé':'Brouillon'}
          </div>
          <button onClick={() => navigate('/app/commandes')} style={{ padding:'8px 16px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background:'#fff', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>← Annuler</button>
        </div>
      </header>

      <div style={{ padding:'28px', display:'grid', gridTemplateColumns:'1fr 280px', gap:'24px', alignItems:'start' }}>

        {/* COLONNE GAUCHE */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

          {/* STEPPER */}
          <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', padding:'20px 24px', display:'flex', alignItems:'center' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', flexShrink:0 }}>
                  <div style={{
                    width:'36px', height:'36px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'13px', fontWeight:600, flexShrink:0,
                    background: i < step ? '#1a3328' : i === step ? '#c9a84c' : '#fff',
                    border: `2px solid ${i < step ? '#1a3328' : i === step ? '#c9a84c' : '#e3ddd2'}`,
                    color: i < step ? '#fff' : i === step ? '#1a1a1a' : '#909090',
                    transition:'all .3s'
                  }}>{i < step ? '✓' : i+1}</div>
                  <div>
                    <div style={{ fontSize:'10px', color:'#909090', textTransform:'uppercase', letterSpacing:'.08em' }}>Étape {i+1}</div>
                    <div style={{ fontSize:'13px', fontWeight: i===step?600:400, color: i===step?'#1a3328':'#555' }}>{s}</div>
                  </div>
                </div>
                {i < STEPS.length-1 && <div style={{ flex:1, height:'2px', background: i < step ? '#1a3328' : '#e3ddd2', margin:'0 10px', transition:'background .4s' }} />}
              </div>
            ))}
          </div>

          {/* ÉTAPE 1 — Essence & Qualité */}
          {step === 0 && (
            <>
              <div style={{ background:'#fff', border:`1.5px solid ${errors.essence?'#dc2626':'#e3ddd2'}`, borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🌳</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Essence de bois</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>Sélectionnez l'essence souhaitée pour cette commande.</div>
                  </div>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
                    {ESSENCES.map(e => (
                      <div key={e.key} onClick={() => { setF('essence', e.key); setErrors(err => ({ ...err, essence:false })) }}
                        style={{ padding:'16px', borderRadius:'12px', border:`2px solid ${form.essence===e.key?'#c9a84c':'#e3ddd2'}`, background: form.essence===e.key?'rgba(201,168,76,.08)':'#fff', cursor:'pointer', transition:'all .2s', textAlign:'center' }}>
                        <div style={{ fontSize:'28px', marginBottom:'6px' }}>{e.icon}</div>
                        <div style={{ fontWeight:600, fontSize:'14px', color: form.essence===e.key?'#1a3328':'#1a1a1a' }}>{e.label}</div>
                        <div style={{ fontSize:'11px', color:'#909090', marginTop:'3px' }}>{e.desc}</div>
                        {e.cites && <div style={{ marginTop:'6px', fontSize:'10px', fontWeight:600, color:'#dc2626', background:'#fee2e2', padding:'2px 8px', borderRadius:'100px', display:'inline-block' }}>CITES ⚠</div>}
                      </div>
                    ))}
                  </div>

                  {/* Alerte CITES */}
                  {form.essence && ESSENCES.find(e=>e.key===form.essence)?.cites && (
                    <div style={{ marginTop:'16px', padding:'14px 16px', background:'#fef2f2', border:'1px solid #fca5a5', borderRadius:'10px', fontSize:'13px', color:'#991b1b' }}>
                      🚨 <strong>Alerte CITES :</strong> Cette essence est soumise à des restrictions d'export. Un permis CITES sera obligatoire.
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background:'#fff', border:`1.5px solid ${errors.grade?'#dc2626':'#e3ddd2'}`, borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🏆</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Grade de qualité</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>Choisissez le niveau de qualité requis.</div>
                  </div>
                </div>
                <div style={{ padding:'20px 24px', display:'flex', gap:'12px' }}>
                  {[
                    { g:'A', label:'Grade A', desc:'Qualité premium · Export certifié', color:'#c9a84c' },
                    { g:'B', label:'Grade B', desc:'Qualité standard · Usage général', color:'#6b7280' },
                    { g:'C', label:'Grade C', desc:'Qualité économique · Usage industriel', color:'#9ca3af' },
                  ].map(({ g, label, desc, color }) => (
                    <div key={g} onClick={() => { setF('grade', g); setErrors(err => ({ ...err, grade:false })) }}
                      style={{ flex:1, padding:'16px', borderRadius:'12px', border:`2px solid ${form.grade===g?color:'#e3ddd2'}`, background: form.grade===g?`rgba(201,168,76,.08)`:'#fff', cursor:'pointer', transition:'all .2s', textAlign:'center' }}>
                      <div style={{ fontSize:'22px', fontWeight:700, color: form.grade===g?color:'#909090', marginBottom:'4px' }}>{label}</div>
                      <div style={{ fontSize:'11px', color:'#909090' }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ÉTAPE 2 — Volume & Dimensions */}
          {step === 1 && (
            <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', overflow:'hidden' }}>
              <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>📐</div>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Volume & Dimensions</div>
                  <div style={{ fontSize:'12px', color:'#909090' }}>Saisissez le volume ou calculez-le via les dimensions.</div>
                </div>
              </div>
              <div style={{ padding:'20px 24px' }}>
                <div style={{ marginBottom:'20px' }}>
                  <label style={{ fontSize:'12px', fontWeight:600, color:'#555', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:'8px' }}>Volume estimé (m³) *</label>
                  <input type="number" value={form.vol} onChange={e => { setF('vol', e.target.value); setErrors(err=>({...err,vol:false})) }}
                    placeholder="ex. 250" style={inp(errors.vol)} />
                  {errors.vol && <p style={{ fontSize:'11px', color:'#dc2626', marginTop:'4px' }}>Veuillez saisir un volume valide.</p>}
                </div>
                <div style={{ padding:'16px', background:'#f5f0e8', borderRadius:'10px' }}>
                  <div style={{ fontSize:'12px', fontWeight:600, color:'#555', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:'12px' }}>Calculateur de volume</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'12px' }}>
                    {[['l','Longueur (m)'],['w','Largeur (m)'],['e','Épaisseur (m)'],['nb','Nb pièces']].map(([key, label]) => (
                      <div key={key}>
                        <label style={{ fontSize:'11px', color:'#909090', display:'block', marginBottom:'4px' }}>{label}</label>
                        <input type="number" value={dims[key]}
                          onChange={e => { const d = { ...dims, [key]: e.target.value }; setDims(d); calcVol(d) }}
                          placeholder="0" style={{ width:'100%', padding:'9px', border:'1.5px solid #e3ddd2', borderRadius:'8px', fontSize:'13px', outline:'none', boxSizing:'border-box' }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', background:'#fff', borderRadius:'8px', border:'1px solid #e3ddd2' }}>
                    <span style={{ fontSize:'12px', color:'#909090' }}>Volume calculé</span>
                    <span style={{ fontSize:'22px', fontWeight:700, color:'#1a3328' }}>{form.vol || '—'} <span style={{ fontSize:'14px', fontWeight:300 }}>m³</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 — Incoterm & Livraison */}
          {step === 2 && (
            <>
              <div style={{ background:'#fff', border:`1.5px solid ${errors.inco?'#dc2626':'#e3ddd2'}`, borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🚢</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Incoterm</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>Sélectionnez le terme de livraison international.</div>
                  </div>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
                    {INCOTERMS.map(inc => (
                      <div key={inc.code} onClick={() => { setF('inco', inc.code); setErrors(err=>({...err,inco:false})) }}
                        style={{ padding:'16px', borderRadius:'12px', border:`2px solid ${form.inco===inc.code?'#c9a84c':'#e3ddd2'}`, background: form.inco===inc.code?'rgba(201,168,76,.08)':'#fff', cursor:'pointer', transition:'all .2s', textAlign:'center' }}>
                        <div style={{ fontSize:'20px', fontWeight:700, color: form.inco===inc.code?'#1a3328':'#909090', marginBottom:'4px' }}>{inc.code}</div>
                        <div style={{ fontSize:'11px', fontWeight:600, color: form.inco===inc.code?'#555':'#909090', marginBottom:'4px' }}>{inc.name}</div>
                        <div style={{ fontSize:'11px', color:'#b0b0b0' }}>{inc.resp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>📍</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Port & Livraison</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>Précisez le port de destination et la date souhaitée.</div>
                  </div>
                </div>
                <div style={{ padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                  <div>
                    <label style={{ fontSize:'12px', fontWeight:600, color:'#555', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:'8px' }}>Port de destination *</label>
                    <input value={form.port} onChange={e => { setF('port', e.target.value); setErrors(err=>({...err,port:false})) }}
                      placeholder="ex. Shanghai, Hambourg, Dubaï…" style={inp(errors.port)} />
                    {errors.port && <p style={{ fontSize:'11px', color:'#dc2626', marginTop:'4px' }}>Champ requis.</p>}
                  </div>
                  <div>
                    <label style={{ fontSize:'12px', fontWeight:600, color:'#555', textTransform:'uppercase', letterSpacing:'.06em', display:'block', marginBottom:'8px' }}>Date de livraison souhaitée *</label>
                    <input type="date" value={form.date} onChange={e => { setF('date', e.target.value); setErrors(err=>({...err,date:false})) }}
                      style={inp(errors.date)} />
                    {errors.date && <p style={{ fontSize:'11px', color:'#dc2626', marginTop:'4px' }}>Champ requis.</p>}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ÉTAPE 4 — Photos & Notes */}
          {step === 3 && (
            <>
              <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>📸</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Photos du lot</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>Ajoutez jusqu'à 20 photos (drag & drop ou clic).</div>
                  </div>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <div onClick={() => fileRef.current.click()}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
                    style={{ border:`2px dashed ${dragOver?'#c9a84c':'#e3ddd2'}`, borderRadius:'12px', padding:'40px 20px', textAlign:'center', cursor:'pointer', background: dragOver?'rgba(201,168,76,.05)':'#faf9f7', transition:'all .2s', marginBottom:'16px' }}>
                    <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} style={{ display:'none' }} />
                    <div style={{ fontSize:'36px', marginBottom:'8px' }}>📷</div>
                    <div style={{ fontWeight:600, fontSize:'14px', color:'#1a1a1a', marginBottom:'4px' }}>Glissez vos photos ici</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>ou cliquez pour sélectionner · JPG, PNG · max 20 photos</div>
                    {photos.length > 0 && <div style={{ marginTop:'8px', fontSize:'12px', fontWeight:600, color:'#c9a84c' }}>{photos.length}/20 photo{photos.length > 1?'s':''} sélectionnée{photos.length > 1?'s':''}</div>}
                  </div>
                  {photos.length > 0 && (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'8px' }}>
                      {photos.map((p, i) => (
                        <div key={i} style={{ position:'relative', aspectRatio:'1', borderRadius:'8px', overflow:'hidden' }}>
                          <img src={p.src} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                          <button onClick={() => setPhotos(ph => ph.filter((_,j) => j !== i))}
                            style={{ position:'absolute', top:'4px', right:'4px', width:'20px', height:'20px', borderRadius:'50%', background:'rgba(0,0,0,.6)', border:'none', color:'#fff', fontSize:'11px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background:'#fff', border:'1px solid #e3ddd2', borderRadius:'14px', overflow:'hidden' }}>
                <div style={{ padding:'18px 24px', borderBottom:'1px solid #e3ddd2', display:'flex', alignItems:'center', gap:'12px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#f5f0e8', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>📝</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600 }}>Notes & Spécifications</div>
                    <div style={{ fontSize:'12px', color:'#909090' }}>Informations complémentaires, exigences particulières…</div>
                  </div>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <textarea value={form.notes} onChange={e => setF('notes', e.target.value)}
                    placeholder="Ex. : traitement anti-insectes requis, humidité max 18%, emballage sous vide…"
                    style={{ width:'100%', minHeight:'120px', padding:'12px', border:'1.5px solid #e3ddd2', borderRadius:'9px', fontSize:'14px', outline:'none', resize:'vertical', fontFamily:'inherit', boxSizing:'border-box' }} />
                </div>
              </div>
            </>
          )}

          {/* NAVIGATION */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', borderRadius:'14px', padding:'16px 24px', border:'1px solid #e3ddd2' }}>
            <button onClick={prev} disabled={step === 0}
              style={{ padding:'10px 20px', border:'1.5px solid #e3ddd2', borderRadius:'9px', background: step===0?'#f9f9f9':'#fff', color: step===0?'#ccc':'#555', fontSize:'14px', fontWeight:500, cursor: step===0?'default':'pointer' }}>← Précédent</button>
            <span style={{ fontSize:'12px', color:'#909090' }}>Étape {step+1} sur 4</span>
            <button onClick={next}
              style={{ padding:'10px 24px', background: step===3?'#16a34a':'#c9a84c', border:'none', borderRadius:'9px', color: step===3?'#fff':'#1a1a1a', fontSize:'14px', fontWeight:600, cursor:'pointer', transition:'background .2s' }}>
              {step === 3 ? 'Soumettre la commande ✓' : 'Suivant →'}
            </button>
          </div>
        </div>

        {/* RÉCAPITULATIF */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px', position:'sticky', top:'88px' }}>
          <div style={{ background:'#fff', borderRadius:'14px', padding:'20px', border:'1px solid #e3ddd2' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'17px', fontWeight:600, marginBottom:'16px' }}>
              Récapitulatif <span style={{ fontSize:'12px', fontWeight:300, color:'#909090' }}>— brouillon</span>
            </div>
            {[
              { key:'Essence',  val: form.essence ? ESSENCE_LABELS[form.essence] : null },
              { key:'Grade',    val: form.grade ? `Grade ${form.grade}` : null },
              { key:'Volume',   val: form.vol ? `${form.vol} m³` : null },
              { key:'Incoterm', val: form.inco || null, gold:true },
              { key:'Port dest.', val: form.port || null },
              { key:'Livraison',  val: form.date || null },
            ].map(({ key, val, gold }) => (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #f5f0e8' }}>
                <span style={{ fontSize:'12px', color:'#909090' }}>{key}</span>
                <span style={{ fontSize:'13px', fontWeight: val?600:400, color: gold&&val?'#c9a84c':val?'#1a1a1a':'#ccc' }}>{val || '—'}</span>
              </div>
            ))}
            <div style={{ marginTop:'16px', padding:'14px', background:'#1a3328', borderRadius:'10px', textAlign:'center' }}>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'6px' }}>Estimation prix (FOB)</div>
              <div style={{ fontSize:'24px', fontWeight:700, color:'#c9a84c' }}>{estPrice()}</div>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,.4)', marginTop:'4px' }}>Devis définitif après validation</div>
            </div>
          </div>

          {/* Progression */}
          <div style={{ background:'#fff', borderRadius:'14px', padding:'20px', border:'1px solid #e3ddd2' }}>
            <div style={{ fontSize:'12px', fontWeight:600, color:'#909090', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'12px' }}>Progression</div>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 10px', borderRadius:'8px', background: i===step?'rgba(201,168,76,.08)':'transparent', marginBottom:'4px' }}>
                <div style={{ width:'24px', height:'24px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:600, background: i<step?'#1a3328':i===step?'#c9a84c':'#f5f0e8', color: i<step?'#fff':i===step?'#1a1a1a':'#909090', flexShrink:0 }}>{i<step?'✓':i+1}</div>
                <span style={{ fontSize:'13px', fontWeight: i===step?600:400, color: i===step?'#1a3328':i<step?'#555':'#909090' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OVERLAY CONFIRMATION */}
      {confirmed && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:200 }}>
          <div style={{ background:'#fff', borderRadius:'20px', padding:'40px', maxWidth:'440px', width:'90%', textAlign:'center', boxShadow:'0 32px 80px rgba(0,0,0,.3)' }}>
            <div style={{ fontSize:'52px', marginBottom:'16px' }}>✅</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'28px', fontWeight:600, marginBottom:'8px' }}>Commande soumise !</div>
            <div style={{ fontSize:'22px', fontWeight:700, color:'#c9a84c', marginBottom:'16px' }}>{confirmRef}</div>
            <p style={{ fontSize:'14px', color:'#555', lineHeight:1.6, marginBottom:'24px' }}>
              Votre commande a été enregistrée avec succès. Notre équipe va préparer votre devis dans les <strong>24–48h ouvrées</strong>. Vous recevrez une notification dès validation.
            </p>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center' }}>
              <button onClick={() => { setConfirmed(false); setForm({essence:'',grade:'',vol:'',inco:'',port:'',date:'',notes:''}); setStep(0); setPhotos([]) }}
                style={{ padding:'12px 24px', background:'#c9a84c', border:'none', borderRadius:'10px', fontWeight:600, fontSize:'14px', cursor:'pointer' }}>Nouvelle commande</button>
              <button onClick={() => navigate('/app/commandes')}
                style={{ padding:'12px 24px', background:'#fff', border:'1.5px solid #e3ddd2', borderRadius:'10px', fontWeight:500, fontSize:'14px', cursor:'pointer' }}>Voir mes commandes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}