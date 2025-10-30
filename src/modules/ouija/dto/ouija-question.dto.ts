import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Language, Personality } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class OuijaQuestionDto {
  @ApiProperty({
    description: 'Pregunta realizada al tablero Ouija',
    example: '¿Encontraré el amor pronto?',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  @MinLength(3, { message: 'La pregunta debe tener al menos 3 caracteres' })
  @MaxLength(200, { message: 'La pregunta no puede exceder los 200 caracteres' })
  question: string;

  @ApiProperty({
    description: 'Personalidad del espíritu que responderá la pregunta',
    enum: Personality,
    example: Personality.WISE,
    required: false,
  })
  @IsEnum(Personality, {
    message: 'personality must be one of the following values: wise, cryptic, dark, playful (received: $value)',
  })
  @IsOptional()
  personality?: Personality;

  @ApiProperty({
    description: 'Idioma de la respuesta del tablero Ouija',
    enum: Language,
    example: Language.ES,
    default: Language.ES,
  })
  @IsEnum(Language, {
    message: 'language must be one of the following values: en, es (received: $value)',
  })
  @IsOptional()
  language?: Language;
}
