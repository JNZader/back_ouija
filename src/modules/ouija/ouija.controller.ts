import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OuijaQuestionDto } from './dto/ouija-question.dto';
import { OuijaResponseDto } from './dto/ouija-response.dto';
import { OuijaService } from './services/ouija.service';
import { ResponsesService } from './services/responses.service';

@ApiTags('ouija')
@Controller('ouija')
export class OuijaController {
  constructor(
    private readonly ouijaService: OuijaService,
    private readonly responsesService: ResponsesService,
  ) {}

  @Post('ask')
  @ApiOperation({
    summary: 'Consultar al tablero Ouija',
    description:
      'Realiza una pregunta al tablero Ouija y recibe una respuesta mística. ' +
      'El sistema detecta la categoría de la pregunta, selecciona una personalidad ' +
      'y genera una respuesta contextualizada basada en keywords.',
  })
  @ApiHeader({
    name: 'x-session-id',
    description: 'ID de sesión opcional para rastrear respuestas previas y evitar repeticiones',
    required: false,
    example: 'user-123',
  })
  @ApiResponse({
    status: 201,
    description: 'Respuesta generada exitosamente',
    type: OuijaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validación fallida - Pregunta inválida, parámetros incorrectos o sessionId inválido',
    schema: {
      examples: {
        validationError: {
          summary: 'Error de validación del DTO',
          value: {
            statusCode: 400,
            message: [
              'La pregunta debe tener al menos 3 caracteres',
              'personality must be one of the following values: wise, cryptic, dark, playful (received: invalid)',
            ],
            error: 'Bad Request',
          },
        },
        invalidSessionId: {
          summary: 'SessionId inválido',
          value: {
            statusCode: 400,
            message: 'SessionId inválido. Solo se permiten caracteres alfanuméricos, guiones y guiones bajos (max 100 caracteres)',
            error: 'Bad Request',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor al generar la respuesta',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error generating response',
        error: 'Database connection failed',
      },
    },
  })
  async ask(@Body() dto: OuijaQuestionDto, @Headers('x-session-id') sessionId?: string) {
    // Validar y sanitizar sessionId
    if (sessionId) {
      // Solo alfanumérico, guiones y guiones bajos, max 100 chars
      if (!/^[a-zA-Z0-9_-]{1,100}$/.test(sessionId)) {
        throw new BadRequestException(
          'SessionId inválido. Solo se permiten caracteres alfanuméricos, guiones y guiones bajos (max 100 caracteres)',
        );
      }
    }

    try {
      const userId = sessionId || `temp-${Date.now()}`;

      return await this.ouijaService.processQuestion(dto, userId);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error generating response',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('responses/sessions')
  @ApiOperation({
    summary: 'Obtener sesiones activas',
    description:
      'Retorna el listado de todas las sesiones activas con sus respuestas ya utilizadas. ' +
      'Útil para debugging y monitoreo del sistema de anti-repetición.',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de sesiones activas',
    schema: {
      example: {
        sessions: [
          {
            sessionId: 'user-123',
            usedResponseIds: [1, 5, 12, 23],
            lastActivity: '2025-10-29T12:30:00.000Z',
          },
          {
            sessionId: 'temp-1698765432000',
            usedResponseIds: [3, 7],
            lastActivity: '2025-10-29T11:15:00.000Z',
          },
        ],
        totalSessions: 2,
      },
    },
  })
  getActiveSessions() {
    return this.responsesService.getActiveSessions();
  }

  @Get('responses/stats')
  @ApiOperation({
    summary: 'Obtener estadísticas de respuestas',
    description:
      'Retorna estadísticas completas del sistema de respuestas: ' +
      'total de respuestas disponibles por categoría, personalidad e idioma. ' +
      'Útil para análisis y verificación de la base de datos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas de respuestas del sistema',
    schema: {
      example: {
        total: 150,
        byCategory: {
          love: 30,
          money: 25,
          health: 20,
          future: 35,
          general: 40,
        },
        byPersonality: {
          wise: 45,
          cryptic: 38,
          dark: 35,
          playful: 32,
        },
        byLanguage: {
          es: 120,
          en: 30,
        },
        lastUpdated: '2025-10-29T12:30:00.000Z',
      },
    },
  })
  async getResponsesStats() {
    return this.responsesService.getStats();
  }
}
