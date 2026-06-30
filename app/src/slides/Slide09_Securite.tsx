import { motion } from 'framer-motion'
import { Key, Smartphone, Video, ShieldAlert, Shield } from 'lucide-react'
import CountUp from '../components/CountUp'

const mechs = [
  {
    Icon: Key,
    title: 'Authentification JWT',
    details: [
      'Access token : 15 min · Refresh : 7 jours httpOnly',
      'Rotation automatique · Signature HS256',
    ],
  },
  {
    Icon: Smartphone,
    title: 'Double facteur (2FA)',
    details: [
      'TOTP 6 chiffres toutes les 30 secondes',
      'Google Authenticator · Token temporaire 5 min',
    ],
  },
  {
    Icon: Video,
    title: 'Visioconférence sécurisée',
    details: [
      'JWT signé RS256 (clé privée RSA serveur)',
      'Vérification par 8x8 côté Jitsi JaaS',
    ],
  },
  {
    Icon: ShieldAlert,
    title: 'Durcissement',
    details: [
      'Bcrypt cost 12 · Rate limit 5/IP/15 min',
      'CORS whitelist · Validation @Valid systématique',
    ],
  },
]

const roles = [
  'SUPER_ADMIN', 'ADMIN', 'CHEF_PROJET', 'CHEF_CHANTIER',
  'LOGISTIQUE', 'USER', 'RESP_QUALITÉ', 'ING_QUALITÉ',
  'CTRL_TECHNIQUE', 'DIR_TECHNIQUE', 'ASST_QUALITÉ',
  'TECH_LABO', 'TECH_TOPO',
]

export default function Slide09_Securite() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#141416' }}>

      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/securite.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.16,
        }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.16 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.4) 100%)',
      }} />

      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: '0.3cqw', background: '#c8102e', transformOrigin: 'top' }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 flex flex-col"
        style={{ paddingLeft: '6cqw', paddingRight: '4cqw', paddingTop: '4cqh', paddingBottom: '3cqh' }}>

        {/* Header */}
        <div className="flex items-end justify-between" style={{ marginBottom: '2.5cqh' }}>
          <div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }} animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: '5.5cqh', fontWeight: 800, lineHeight: 1.1,
                  color: '#fff', letterSpacing: '-0.025em', margin: 0,
                }}
              >
                Sécurité{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #c8102e, #e8384f)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>multiniveau</span>
              </motion.h1>
            </div>

          </div>

          {/* Stats */}
          <motion.div
            className="flex" style={{ gap: '2.5cqw' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          >
            {[
              { num: 13, lab: 'rôles RBAC' },
              { num: 54, lab: 'permissions' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '4.3cqh', fontWeight: 800, color: '#c8102e', margin: 0, lineHeight: 1,
                }}>
                  <CountUp value={s.num} delay={0.9 + i * 0.15} />
                </p>
                <p style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, marginTop: '0.3cqh' }}>{s.lab}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main: 2 columns */}
        <div className="flex-1 flex" style={{ gap: '2.5cqw' }}>

          {/* LEFT — 4 mechanisms */}
          <div className="flex-1 flex flex-col" style={{ gap: '0.7cqh' }}>
            {mechs.map((m, i) => (
              <motion.div
                key={i}
                className="flex-1 flex"
                style={{
                  borderRadius: '0.8cqh',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid #c8102e',
                  padding: '0 1.5cqw',
                  gap: '1.2cqw',
                  alignItems: 'center',
                }}
                initial={{ opacity: 0, x: -30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.Icon
                  style={{ width: '2.8cqh', height: '2.8cqh', color: '#c8102e', flexShrink: 0 }}
                  strokeWidth={1.5}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff', margin: 0, marginBottom: '0.4cqh' }}>
                    {m.title}
                  </p>
                  {m.details.map((d, j) => (
                    <p key={j} style={{
                      fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {d}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — 13 roles */}
          <motion.div
            className="flex flex-col"
            style={{
              width: '26cqw',
              borderRadius: '0.8cqh',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              padding: '1.5cqh 1.5cqw',
            }}
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center" style={{ gap: '0.6cqw', marginBottom: '1.5cqh' }}>
              <Shield style={{ width: '2.2cqh', height: '2.2cqh', color: '#c8102e' }} strokeWidth={1.5} />
              <p style={{ fontSize: '2.4cqh', fontWeight: 700, color: '#fff', margin: 0 }}>
                13 rôles RBAC
              </p>
            </div>

            <div className="flex-1 flex flex-wrap content-start" style={{ gap: '0.5cqh' }}>
              {roles.map((r, i) => (
                <motion.span
                  key={i}
                  style={{
                    padding: '0.5cqh 0.9cqw',
                    borderRadius: '0.5cqh',
                    background: i < 2 ? 'rgba(200,16,46,0.12)' : 'var(--surface-card)',
                    border: i < 2 ? '1px solid rgba(200,16,46,0.25)' : '1px solid var(--border-subtle)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '2.2cqh', fontWeight: 600,
                    color: i < 2 ? '#c8102e' : 'rgba(255,255,255,0.7)',
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.04 }}
                >
                  {r}
                </motion.span>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1cqh', borderTop: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '2.0cqh', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                3 niveaux de vérification : route frontend · annotation backend · affichage conditionnel
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
