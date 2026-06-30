export const fr = {
  // ── UI ──────────────────────────────────────────────────
  ui: {
    fullscreen: 'Plein écran (F11)',
    exitFullscreen: 'Quitter (F11)',
    questionsExchanges: 'Questions & échanges',
    slideNav: {
      titles: [
        'Couverture', 'Sommaire', '5 – 12 %', 'Problématique', 'Contexte',
        'État de l\'art', 'Méthodologie', 'Architecture', 'Conception',
        'Sécurité', 'En production', 'Réalisation', 'Salle MIKA', 'MIKA Assistant',
        'Workflow DMA', 'Validation', 'Limites', 'Conviction', 'Conclusion',
        'Perspectives', 'Merci',
      ],
    },
  },

  // ── SLIDE 01 — Couverture ───────────────────────────────
  slide01: {
    pfeLabel: 'Projet de Fin d\'Études · 2025 / 2026',
    title: [
      'Conception et développement d\'une',
      'plateforme web de pilotage',
    ],
    titleAccent: 'de chantiers BTP',
    subtitle: 'Application au cas de',
    company: 'MIKA Services',
    location: '— Libreville, Gabon',
    specialty: 'Diplôme National d\'Ingénieur · Génie Informatique · Dev Web & Mobile',
    people: [
      { label: 'Présenté par', name: 'KAMPALA NTSA Olsen Fauldy', detail: '5e année — ESPRIM, Monastir', red: true },
      { label: 'Encadrante universitaire', name: 'Mme Kawther Rabhi', detail: 'ESPRIM', red: false },
      { label: 'Encadrant professionnel', name: 'M. Ramzi Jribi', detail: 'Coordinateur Projets — MIKA Services', red: false },
    ],
  },

  // ── SLIDE 02 — Sommaire ─────────────────────────────────
  slide02: {
    label: 'Sommaire',
    title: ['Plan', 'de la'],
    titleAccent: 'soutenance',
    footer: '7 parties · ~15 minutes',
    sections: [
      { num: '01', title: 'Problématique', sub: 'BTP & fracture numérique' },
      { num: '02', title: 'Contexte', sub: 'MIKA Services & le besoin' },
      { num: '03', title: 'État de l\'art', sub: 'Positionnement & gap' },
      { num: '04', title: 'Méthodologie', sub: '10 vagues itératives' },
      { num: '05', title: 'Architecture', sub: 'Conception & sécurité' },
      { num: '06', title: 'Réalisation', sub: '19 modules clés' },
      { num: '07', title: 'Bilan', sub: 'Validation & perspectives' },
    ],
  },

  // ── SLIDE 13 — Workflow DMA ─────────────────────────────
  slide13: {
    label: '10 · Workflow DMA',
    title: 'Le workflow DMA : un processus papier',
    titleAccent: 'digitalisé en 7 états tracés.',
    steps: [
      { num: 1, label: 'Soumise' },
      { num: 2, label: 'Validation chantier' },
      { num: 3, label: 'Validation projet' },
      { num: 4, label: 'Prise en charge' },
      { num: 5, label: 'En commande' },
      { num: 6, label: 'Livré' },
      { num: 7, label: 'Clôturée' },
    ],
    rolesLabel: 'Matrice rôles · transitions',
    roles: [
      { role: 'USER', action: 'crée la demande' },
      { role: 'CHEF_CHANTIER', action: 'validation niveau 1' },
      { role: 'CHEF_PROJET', action: 'validation niveau 2' },
      { role: 'LOGISTIQUE', action: 'traite, commande et livre' },
    ],
    footer: 'À chaque étape : rejet possible, demande de complément, historique complet via',
    footerCode: 'DmaHistorique',
    footerRef: 'Détail d\'une demande — Figure 4.8',
  },

  // ── SLIDE 14 — Validation ──────────────────────────────
  slide14: {
    label: '11 · Validation',
    title: 'Une validation terrain itérative avec le sponsor,',
    titleAccent: 'à chaque release.',
    modules: [
      { name: 'Authentification & sécurité', status: 'full' as const },
      { name: 'Projets, DQE & barèmes', status: 'full' as const },
      { name: 'Matériel & workflow DMA', status: 'full' as const },
      { name: 'Salle MIKA & messagerie', status: 'full' as const },
      { name: 'Reporting & dashboard', status: 'full' as const },
      { name: 'Qualité & conformité', status: 'partial' as const },
      { name: 'Pilotage & IA', status: 'partial' as const },
    ],
    tableHeaders: { domain: 'Macro-domaine', status: 'Statut' },
    statusLabels: { full: 'Validé', partial: 'Validé partiel' },
    parcoursLabel: '5 parcours critiques · à chaque livraison',
    parcours: [
      'Auth complète',
      'Création projet + DQE',
      'Workflow DMA 7 étapes',
      'Session Salle MIKA + PV',
      'Dashboard exécutif',
    ],
    methodesLabel: 'Méthodes',
    methodes: '5 recettes avec M. Ramzi Jribi (1–2 h, sur prod) · Postman par module · cross-browser · responsive sur appareils réels · JUnit 5 + MockK ciblés.',
    footer: 'Arbitrage assumé : couverture fonctionnelle large plutôt que tests exhaustifs sur un périmètre réduit.',
  },

  // ── SLIDE 15 — Limites ─────────────────────────────────
  slide15: {
    label: '12 · Limites',
    title: 'Des limites assumées et documentées,',
    titleAccent: 'chaque compromis justifié.',
    tableHeaders: { limit: 'Limite', cause: 'Cause', mitigation: 'Mitigation' },
    limits: [
      { limit: 'Tests automatisés limités', cause: '1 développeur, 6 mois', mitigation: 'Couverture fonctionnelle priorisée sur modules critiques' },
      { limit: 'QSHE & Qualité partiels', cause: 'Spécification métier à finaliser', mitigation: 'Noyau opérationnel livré, structure en place' },
      { limit: 'PWA vs natif', cause: 'Notifications iOS partielles', mitigation: 'Adoptée terrain · natif = 2× effort pour un ROI limité' },
      { limit: 'Triple state management', cause: 'Redux + TanStack + Zustand', mitigation: 'Séparation claire · barrière d\'entrée documentée' },
      { limit: 'Développement solo', cause: 'Bus factor = 1, pas de peer review', mitigation: 'Documentation · commits atomiques · conventions' },
    ],
  },

  // ── SLIDE 16 — Conclusion ──────────────────────────────
  slide16: {
    label: '13 · Conclusion',
    title: 'Trois objectifs,',
    titleAccent: 'trois réponses.',
    objectives: [
      {
        badge: 'Objectif 1 · Atteint', badgeColor: '#34d399',
        title: 'Une plateforme unifiée',
        desc: '19 domaines, de l\'initialisation à la réception. 85 000 lignes · 81 entités · 191 endpoints · 85+ pages.',
      },
      {
        badge: 'Objectif 2 · Atteint', badgeColor: '#34d399',
        title: 'Adaptée au contexte gabonais',
        desc: 'PWA offline · i18n FR/EN · 13 rôles calqués sur l\'organigramme · autonomie technologique.',
      },
      {
        badge: 'Objectif 3 · Nuancé', badgeColor: '#fbbf24',
        title: 'Conforme aux standards',
        desc: 'Architecture conforme · démarche agile ASIIN/EUR-ACE. Limites : tests ciblés, QSHE partiel, extraction IA en prototype.',
      },
    ],
    quote: 'L\'Afrique n\'a pas vocation à être consommatrice de solutions numériques importées, mais bien créatrice de ses propres outils.',
  },

  // ── SLIDE 17 — Perspectives ────────────────────────────
  slide17: {
    label: '14 · Perspectives',
    title: 'Une feuille de route claire',
    titleAccent: 'pour l\'après-stage.',
    items: [
      { num: '01', title: 'Industrialisation des tests', desc: 'Pyramide unit / composant / E2E (Playwright) · CI/CD.' },
      { num: '02', title: 'Finalisation QSHE & Qualité', desc: 'Spécification conjointe avec les acteurs métier MIKA.' },
      { num: '03', title: 'Extraction IA en production', desc: 'Upload, preview, validation humaine — backend déjà prêt.' },
      { num: '04', title: 'Monitoring avancé', desc: 'Sentry · métriques P95, taux d\'erreur 5xx · alertes automatiques.' },
      { num: '05', title: 'Évolution mobile', desc: 'Surveiller la stabilité des notifications iOS · Capacitor si besoin critique.' },
    ],
  },

  // ── SLIDE 18 — Merci ───────────────────────────────────
  slide18: {
    thanks: 'Merci',
    subtitle: 'de votre attention',
    questionsLabel: 'Questions & échanges',
    acknowledgment: 'Merci à mes encadrants, à',
    school: 'ESPRIT',
    team: 'MIKA Services',
    ackEnd: ', à ma famille et aux membres du jury.',
    author: 'KAMPALA NTSA Olsen Fauldy · ESPRIM 2025 / 2026',
  },
} as const

export type Translations = typeof fr
