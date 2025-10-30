import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NormalizerService {
  private readonly logger = new Logger(NormalizerService.name);

  private readonly stopwords = new Set([
    // Español
    'el',
    'la',
    'los',
    'las',
    'un',
    'una',
    'unos',
    'unas',
    'de',
    'del',
    'a',
    'al',
    'en',
    'por',
    'para',
    'con',
    'mi',
    'tu',
    'su',
    'me',
    'te',
    'se',
    'le',
    'y',
    'o',
    'pero',
    'si',
    'no',
    'que',
    // Inglés
    'the',
    'a',
    'an',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'my',
    'your',
    'his',
    'her',
    'its',
    'our',
    'their',
    'and',
    'or',
    'but',
    'if',
    'not',
    'that',
  ]);

  normalize(text: string): string {
    if (!text || text.trim().length === 0) {
      return '';
    }

    let normalized = text;

    normalized = normalized.toLowerCase();

    normalized = normalized.replace(/[¿?¡!.,;:()"'[\]{}]/g, ' ');

    normalized = this.removeDiacritics(normalized);

    const words = normalized.split(/\s+/);

    const filteredWords = words.filter((word) => word.length > 0 && !this.stopwords.has(word));

    normalized = filteredWords.join(' ');

    normalized = normalized.trim().replace(/\s+/g, ' ');

    return normalized;
  }

  private removeDiacritics(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u0302\u0304-\u036f]/g, '');
  }
}
