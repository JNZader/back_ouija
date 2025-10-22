export enum Personality {
  WISE = 'wise',
  CRYPTIC = 'cryptic',
  DARK = 'dark',
  PLAYFUL = 'playful',
}

export function isValidPersonality(value: string): value is Personality {
  return Object.values(Personality).includes(value as Personality);
}

export function getAllPersonalities(): Personality[] {
  return Object.values(Personality);
}