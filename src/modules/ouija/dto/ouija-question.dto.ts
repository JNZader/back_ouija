import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Language, Personality } from '../enums';

export class OuijaQuestionDto {
  @IsString()
  question: string;

  @IsEnum(Personality)
  @IsOptional()
  personality?: Personality;

  @IsEnum(Language)
  @IsOptional()
  language?: Language;
}