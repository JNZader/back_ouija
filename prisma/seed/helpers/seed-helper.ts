import { PrismaClient } from '@prisma/client';
import { Category, Language, Personality } from '../../../src/modules/ouija/enums';

/**
 * Interface para definir una respuesta con sus keywords
 */
export interface ResponseData {
  text: string;
  personality: Personality;
  keywords: string[];
}

/**
 * Función helper para crear respuestas con sus keywords usando connectOrCreate
 *
 * Esta función es robusta porque:
 * 1. No depende de IDs específicos
 * 2. Reutiliza keywords existentes automáticamente
 * 3. Es más legible y mantenible
 */
export async function seedResponses(
  prisma: PrismaClient,
  responses: ResponseData[],
  category: Category,
  language: Language,
): Promise<void> {
  for (const resp of responses) {
    await prisma.fallbackResponse.create({
      data: {
        text: resp.text,
        personality: resp.personality,
        category,
        language,
        keywords: {
          create: resp.keywords.map((word) => ({
            keyword: {
              connectOrCreate: {
                where: {
                  word_language: {
                    word,
                    language,
                  },
                },
                create: {
                  word,
                  language,
                },
              },
            },
          })),
        },
      },
    });
  }
}

/**
 * Limpia toda la base de datos antes de hacer seed
 */
export async function cleanDatabase(prisma: PrismaClient): Promise<void> {
  console.log('🧹 Limpiando datos existentes...');
  await prisma.responseKeyword.deleteMany({});
  await prisma.keyword.deleteMany({});
  await prisma.fallbackResponse.deleteMany({});
  console.log('✅ Base de datos limpia\n');
}

/**
 * Seed respuestas para una categoría específica
 */
export async function seedCategory(
  prisma: PrismaClient,
  category: Category,
  responses: {
    es: ResponseData[];
    en: ResponseData[];
  },
): Promise<void> {
  const categoryName = category.toUpperCase();

  // Seed español
  if (responses.es.length > 0) {
    console.log(`📝 Seeding ${categoryName} - ES (${responses.es.length} respuestas)...`);
    await seedResponses(prisma, responses.es, category, Language.ES);
    console.log(`✅ ${categoryName} - ES completado\n`);
  }

  // Seed inglés
  if (responses.en.length > 0) {
    console.log(`📝 Seeding ${categoryName} - EN (${responses.en.length} respuestas)...`);
    await seedResponses(prisma, responses.en, category, Language.EN);
    console.log(`✅ ${categoryName} - EN completado\n`);
  }
}

/**
 * Cuenta las respuestas totales por idioma
 */
export function countResponses(data: { es: ResponseData[]; en: ResponseData[] }): {
  es: number;
  en: number;
  total: number;
} {
  return {
    es: data.es.length,
    en: data.en.length,
    total: data.es.length + data.en.length,
  };
}
