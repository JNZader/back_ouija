import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Language, Personality } from '../enums';

export class OuijaQuestionDto {
  @IsString()
  question: string;

  @IsEnum(Personality, {
    message: 'personality must be one of the following values: wise, cryptic, dark, playful (received: $value)',
  })
  @IsOptional()
  personality?: Personality;

  @IsEnum(Language, {
    message: 'language must be one of the following values: en, es (received: $value)',
  })
  @IsOptional()
  language?: Language;
}