import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category, Language, Personality } from '../enums';

class MetadataDto {
  @ApiProperty({
    description: 'Método usado para seleccionar la respuesta',
    enum: ['random', 'keyword-match', 'fallback-general'],
    example: 'keyword-match',
  })
  method: 'random' | 'keyword-match' | 'fallback-general';

  @ApiProperty({
    description: 'Score de matching de keywords (0 = random)',
    example: 3,
    minimum: 0,
  })
  matchScore: number;

  @ApiPropertyOptional({
    description: 'Keywords que hicieron match',
    example: ['amor', 'pareja'],
    type: [String],
  })
  matchedKeywords?: string[];

  @ApiPropertyOptional({
    description: 'Total de respuestas disponibles en la categoría',
    example: 25,
  })
  totalResponses?: number;

  @ApiPropertyOptional({
    description: 'Respuestas disponibles (no usadas en esta sesión)',
    example: 18,
  })
  availableResponses?: number;

  @ApiPropertyOptional({
    description: 'Indica si la sesión fue reseteada (todas las respuestas usadas)',
    example: false,
  })
  sessionReset?: boolean;
}

export class OuijaResponseDto {
  @ApiProperty({
    description: 'La pregunta original del usuario',
    example: '¿Encontraré el amor este año?',
  })
  question: string;

  @ApiProperty({
    description: 'La respuesta mística del tablero Ouija',
    example: 'Las estrellas se alinean a tu favor, pero debes tener paciencia.',
  })
  response: string;

  @ApiProperty({
    description: 'Personalidad usada para la respuesta',
    enum: Personality,
    example: Personality.WISE,
  })
  personality: Personality;

  @ApiProperty({
    description: 'Idioma de la respuesta',
    enum: Language,
    example: Language.ES,
  })
  language: Language;

  @ApiProperty({
    description: 'Categoría detectada de la pregunta',
    example: Category.LOVE,
  })
  category: Category | 'general';

  @ApiProperty({
    description: 'Fuente de la respuesta',
    example: 'database',
  })
  source: string;

  @ApiProperty({
    description: 'Modelo usado para generar la respuesta',
    example: 'fallback-v1',
  })
  model: string;

  @ApiProperty({
    description: 'Tiempo de respuesta en milisegundos',
    example: 42,
    minimum: 0,
  })
  responseTime: number;

  @ApiProperty({
    description: 'Metadata adicional sobre la selección de respuesta',
    type: MetadataDto,
  })
  metadata: MetadataDto;
}
