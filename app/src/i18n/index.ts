import { fr, type Translations } from './fr'

const locales: Record<string, Translations> = { fr }

let currentLocale: Translations = fr

export function setLocale(lang: string) {
  currentLocale = locales[lang] ?? fr
}

export function useT() {
  return currentLocale
}

export type { Translations }
