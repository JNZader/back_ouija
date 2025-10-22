export enum Language {
  ES = 'es',
  EN = 'en',
}

export function isValidLanguage(value: string): value is Language {
  return Object.values(Language).includes(value as Language);
}

export function getAllLanguages(): Language[] {
  return Object.values(Language);
}