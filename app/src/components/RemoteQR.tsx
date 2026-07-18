import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

// QR code pointant vers l'interface télécommande (affiché sur le splash)
export default function RemoteQR({ url, size = 110 }: { url: string; size?: number }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    QRCode.toDataURL(url, {
      margin: 1,
      width: size * 2,
      color: { dark: '#141416', light: '#ffffff' },
    }).then(setSrc).catch(() => {})
  }, [url, size])

  if (!src) return null
  return (
    <div className="flex flex-col items-center" style={{ gap: 6 }}>
      <img src={src} alt="QR télécommande" style={{ width: size, height: size, borderRadius: 8 }} />
      <span style={{
        fontSize: '1.3cqh', fontWeight: 500, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
      }}>
        Télécommande
      </span>
    </div>
  )
}
