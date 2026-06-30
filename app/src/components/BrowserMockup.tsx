import type { ReactNode } from 'react'

interface Props {
  url: string
  children: ReactNode
}

export default function BrowserMockup({ url, children }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      borderRadius: '0.8cqh',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      background: '#1a1a1c',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.6cqh 1cqw',
        background: 'rgba(30,30,32,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        gap: '0.5cqw',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: '0.3cqw', marginRight: '0.8cqw' }}>
          <div style={{ width: '0.8cqh', height: '0.8cqh', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '0.8cqh', height: '0.8cqh', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '0.8cqh', height: '0.8cqh', borderRadius: '50%', background: '#28c840' }} />
        </div>

        {/* URL bar */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '0.4cqh',
          padding: '0.3cqh 0.8cqw',
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* Lock icon */}
          <svg viewBox="0 0 12 14" style={{ width: '1cqh', height: '1cqh', marginRight: '0.4cqw', flexShrink: 0 }}>
            <rect x="1" y="6" width="10" height="7" rx="1.5" fill="rgba(255,255,255,0.25)" />
            <path d="M3.5 6V4.5a2.5 2.5 0 015 0V6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" />
          </svg>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1cqh',
            color: 'rgba(255,255,255,0.40)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {url}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}
