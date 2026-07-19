import type { ComponentType } from 'react'
import Annexe_A2_PWA from './Annexe_A2_PWA'
import Annexe_M1_Tests from './Annexe_M1_Tests'

export interface AnnexeDef {
  id: string
  cat: string
  question: string
  /** Schéma-réponse projeté à l'écran. Absent = pas encore construit (masqué sur le téléphone). */
  component?: ComponentType
}

// Foire aux questions du jury — 24 questions, schémas construits progressivement.
// L'index dans ce tableau est l'identifiant échangé sur le WebSocket (action 'annex').
export const ANNEXES: AnnexeDef[] = [
  // ── Architecture & technique ──
  { id: 'A1', cat: 'Architecture', question: 'Pourquoi Kotlin et pas Java ou Node.js ?' },
  { id: 'A2', cat: 'Architecture', question: 'Le sujet disait Web/Mobile — où est l\u2019app mobile ?', component: Annexe_A2_PWA },
  { id: 'A3', cat: 'Architecture', question: 'Comment gérez-vous la connectivité variable ?' },
  { id: 'A4', cat: 'Architecture', question: 'Et si la charge augmente ? Performance ?' },
  { id: 'A5', cat: 'Architecture', question: 'Pourquoi PostgreSQL et pas MongoDB ?' },
  { id: 'A6', cat: 'Architecture', question: 'Pourquoi Render et pas AWS ou Azure ?' },
  { id: 'A7', cat: 'Architecture', question: 'Pourquoi WebSocket STOMP et pas SSE ?' },
  { id: 'A8', cat: 'Architecture', question: 'Trois librairies d\u2019état : sur-ingénierie ?' },
  // ── Sécurité ──
  { id: 'S1', cat: 'Sécurité', question: 'Que se passe-t-il si un token est volé ?' },
  { id: 'S2', cat: 'Sécurité', question: '13 rôles, 54 permissions : appliqués comment ?' },
  { id: 'S3', cat: 'Sécurité', question: 'Comment sécurisez-vous la visioconférence ?' },
  { id: 'S4', cat: 'Sécurité', question: 'Le RGPD s\u2019applique-t-il au Gabon ?' },
  // ── Méthodologie & validation ──
  { id: 'M1', cat: 'Méthodologie', question: 'Pourquoi si peu de tests automatisés ?', component: Annexe_M1_Tests },
  { id: 'M2', cat: 'Méthodologie', question: 'Vos « vagues », c\u2019est du Scrum ?' },
  { id: 'M3', cat: 'Méthodologie', question: 'Comment savez-vous que ça marche vraiment ?' },
  { id: 'M4', cat: 'Méthodologie', question: 'Racontez une vraie difficulté technique.' },
  { id: 'M5', cat: 'Méthodologie', question: 'Six mois seul : la planification a tenu ?' },
  // ── Métier & posture ──
  { id: 'C1', cat: 'Métier', question: 'Qu\u2019est-ce qui rend la plateforme « adaptée à l\u2019Afrique » ?' },
  { id: 'C2', cat: 'Métier', question: 'Seul sur 85 000 lignes : bus factor ?' },
  { id: 'C3', cat: 'Métier', question: 'Les utilisateurs l\u2019utilisent-ils vraiment ?' },
  { id: 'C4', cat: 'Métier', question: 'Que gagne concrètement MIKA Services ?' },
  // ── Limites ──
  { id: 'L1', cat: 'Limites', question: 'L\u2019IA : qu\u2019est-ce qui fonctionne réellement ?' },
  { id: 'L2', cat: 'Limites', question: 'QSHE partiel : que manque-t-il et pourquoi ?' },
  { id: 'L3', cat: 'Limites', question: 'Avez-vous utilisé l\u2019IA générative pour ce projet ?' },
]
