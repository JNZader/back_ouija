import { Injectable, Logger } from '@nestjs/common';
import { NormalizerService } from './normalizer.service';
import { Category } from '../enums';

@Injectable()
export class ClasifierService {
  private readonly logger = new Logger(ClasifierService.name);

  constructor(private readonly normalizer: NormalizerService) {}

  private readonly categoryKeywords: Record<string, string[]> = {
    love: [
      'amor',
      'pareja',
      'relacion',
      'enamorado',
      'enamorada',
      'novio',
      'novia',
      'romance',
      'beso',
      'querer',
      'amar',
      'corazon',
      'sentimiento',
      'love',
      'relationship',
      'boyfriend',
      'girlfriend',
      'romance',
      'kiss',
    ],
    career: [
      'trabajo',
      'empleo',
      'carrera',
      'jefe',
      'oficina',
      'sueldo',
      'profesion',
      'proyecto',
      'empresa',
      'negocio',
      'ascenso',
      'despido',
      'work',
      'job',
      'career',
      'boss',
      'office',
      'salary',
      'business',
    ],
    health: [
      'salud',
      'enfermedad',
      'medico',
      'doctor',
      'hospital',
      'medicina',
      'dolor',
      'enfermo',
      'cura',
      'tratamiento',
      'sintoma',
      'health',
      'illness',
      'doctor',
      'hospital',
      'medicine',
      'pain',
      'sick',
    ],
    family: [
      'familia',
      'padre',
      'madre',
      'hijo',
      'hija',
      'hermano',
      'hermana',
      'abuelo',
      'abuela',
      'tio',
      'tia',
      'primo',
      'pariente',
      'family',
      'father',
      'mother',
      'son',
      'daughter',
      'brother',
      'sister',
    ],
    death: [
      'muerte',
      'muerto',
      'fallecimiento',
      'perdida',
      'morir',
      'difunto',
      'cementerio',
      'funeral',
      'luto',
      'tristeza',
      'death',
      'dead',
      'loss',
      'passed away',
      'die',
      'funeral',
    ],
    future: [
      'futuro',
      'destino',
      'mañana',
      'proximo',
      'venir',
      'pronto',
      'prediccion',
      'espera',
      'llegara',
      'future',
      'destiny',
      'tomorrow',
      'next',
      'coming',
      'soon',
      'prediction',
    ],
    money: [
      'dinero',
      'plata',
      'finanzas',
      'inversion',
      'deuda',
      'rico',
      'pobre',
      'ahorros',
      'prestamo',
      'billete',
      'banco',
      'economico',
      'money',
      'finance',
      'investment',
      'debt',
      'rich',
      'poor',
      'savings',
    ],
    spiriruality: [
      'espiritu',
      'alma',
      'karma',
      'energia',
      'tarot',
      'astral',
      'chakra',
      'meditacion',
      'espiritual',
      'oracion',
      'angel',
      'spirit',
      'soul',
      'karma',
      'energy',
      'tarot',
      'astral',
      'meditation',
    ],
  };

  categorizeQuestion(question: string): Category {
    const normalized = this.normalizer.normalize(question);

    let bestCategory = Category.GENERAL;
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(this.categoryKeywords)) {
      const score = keywords.filter((kw) => normalized.includes(kw)).length;

      if (score > maxScore) {
        maxScore = score;
        bestCategory = category as Category;
      }
    }

    this.logger.debug(`Question categorized as ${bestCategory} with score ${maxScore}`);

    return bestCategory;
  }
}
