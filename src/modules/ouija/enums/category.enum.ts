export enum Category {
  LOVE = 'love',
  CAREER = 'career',
  HEALTH = 'health',
  FAMILY = 'family',
  DEATH = 'death',
  FUTURE = 'future',
  MONEY = 'money',
  SPIRITUALITY = 'spirituality',
  GENERAL = 'general',
}

export function isValidCategory(value: string): value is Category {
  return Object.values(Category).includes(value as Category);
}

export function getAllCategories(): Category[] {
  return Object.values(Category);
}