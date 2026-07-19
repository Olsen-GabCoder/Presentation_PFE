import type { ComponentType } from 'react'
import Annexe_A2_PWA from './Annexe_A2_PWA'
import Annexe_M1_Tests from './Annexe_M1_Tests'
import Annexe_A1_Kotlin from './Annexe_A1_Kotlin'
import Annexe_A3_Connectivite from './Annexe_A3_Connectivite'
import Annexe_A5_PostgreSQL from './Annexe_A5_PostgreSQL'
import Annexe_S1_Token from './Annexe_S1_Token'
import Annexe_M4_Difficultes from './Annexe_M4_Difficultes'
import Annexe_C2_BusFactor from './Annexe_C2_BusFactor'
import Annexe_L1_IA from './Annexe_L1_IA'
import Annexe_L3_IAGenerative from './Annexe_L3_IAGenerative'
import Annexe_A6_Render from './Annexe_A6_Render'
import Annexe_A7_Stomp from './Annexe_A7_Stomp'
import Annexe_A8_Etat from './Annexe_A8_Etat'
import Annexe_S2_RBAC from './Annexe_S2_RBAC'
import Annexe_M2_Vagues from './Annexe_M2_Vagues'
import Annexe_M3_Validation from './Annexe_M3_Validation'
import Annexe_C1_Afrique from './Annexe_C1_Afrique'
import Annexe_A4_Performance from './Annexe_A4_Performance'
import Annexe_S3_Visio from './Annexe_S3_Visio'
import Annexe_S4_RGPD from './Annexe_S4_RGPD'
import Annexe_M5_Planification from './Annexe_M5_Planification'
import Annexe_C3_Adoption from './Annexe_C3_Adoption'
import Annexe_C4_Gains from './Annexe_C4_Gains'
import Annexe_L2_QSHE from './Annexe_L2_QSHE'

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
  { id: 'A1', cat: 'Architecture', question: 'Pourquoi Kotlin et pas Java ou Node.js ?', component: Annexe_A1_Kotlin },
  { id: 'A2', cat: 'Architecture', question: 'Le sujet disait Web/Mobile — où est l\u2019app mobile ?', component: Annexe_A2_PWA },
  { id: 'A3', cat: 'Architecture', question: 'Comment gérez-vous la connectivité variable ?', component: Annexe_A3_Connectivite },
  { id: 'A4', cat: 'Architecture', question: 'Et si la charge augmente ? Performance ?', component: Annexe_A4_Performance },
  { id: 'A5', cat: 'Architecture', question: 'Pourquoi PostgreSQL et pas MongoDB ?', component: Annexe_A5_PostgreSQL },
  { id: 'A6', cat: 'Architecture', question: 'Pourquoi Render et pas AWS ou Azure ?', component: Annexe_A6_Render },
  { id: 'A7', cat: 'Architecture', question: 'Pourquoi WebSocket STOMP et pas SSE ?', component: Annexe_A7_Stomp },
  { id: 'A8', cat: 'Architecture', question: 'Trois librairies d\u2019état : sur-ingénierie ?', component: Annexe_A8_Etat },
  // ── Sécurité ──
  { id: 'S1', cat: 'Sécurité', question: 'Que se passe-t-il si un token est volé ?', component: Annexe_S1_Token },
  { id: 'S2', cat: 'Sécurité', question: '13 rôles, 54 permissions : appliqués comment ?', component: Annexe_S2_RBAC },
  { id: 'S3', cat: 'Sécurité', question: 'Comment sécurisez-vous la visioconférence ?', component: Annexe_S3_Visio },
  { id: 'S4', cat: 'Sécurité', question: 'Le RGPD s\u2019applique-t-il au Gabon ?', component: Annexe_S4_RGPD },
  // ── Méthodologie & validation ──
  { id: 'M1', cat: 'Méthodologie', question: 'Pourquoi si peu de tests automatisés ?', component: Annexe_M1_Tests },
  { id: 'M2', cat: 'Méthodologie', question: 'Vos « vagues », c\u2019est du Scrum ?', component: Annexe_M2_Vagues },
  { id: 'M3', cat: 'Méthodologie', question: 'Comment savez-vous que ça marche vraiment ?', component: Annexe_M3_Validation },
  { id: 'M4', cat: 'Méthodologie', question: 'Racontez une vraie difficulté technique.', component: Annexe_M4_Difficultes },
  { id: 'M5', cat: 'Méthodologie', question: 'Six mois seul : la planification a tenu ?', component: Annexe_M5_Planification },
  // ── Métier & posture ──
  { id: 'C1', cat: 'Métier', question: 'Qu\u2019est-ce qui rend la plateforme « adaptée à l\u2019Afrique » ?', component: Annexe_C1_Afrique },
  { id: 'C2', cat: 'Métier', question: 'Seul sur 85 000 lignes : bus factor ?', component: Annexe_C2_BusFactor },
  { id: 'C3', cat: 'Métier', question: 'Les utilisateurs l\u2019utilisent-ils vraiment ?', component: Annexe_C3_Adoption },
  { id: 'C4', cat: 'Métier', question: 'Que gagne concrètement MIKA Services ?', component: Annexe_C4_Gains },
  // ── Limites ──
  { id: 'L1', cat: 'Limites', question: 'L\u2019IA : qu\u2019est-ce qui fonctionne réellement ?', component: Annexe_L1_IA },
  { id: 'L2', cat: 'Limites', question: 'QSHE partiel : que manque-t-il et pourquoi ?', component: Annexe_L2_QSHE },
  { id: 'L3', cat: 'Limites', question: 'Avez-vous utilisé l\u2019IA générative pour ce projet ?', component: Annexe_L3_IAGenerative },
]
