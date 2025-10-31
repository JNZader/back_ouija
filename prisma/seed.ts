import { PrismaClient } from '@prisma/client';
import { Category } from '../src/modules/ouija/enums';
import { cleanDatabase, seedCategory, countResponses } from './seed/helpers/seed-helper';

// Import seed data por categoría
import { CAREER_RESPONSES } from './seed/data/career.seed';
import { DEATH_RESPONSES } from './seed/data/death.seed';
import { FAMILY_RESPONSES } from './seed/data/family.seed';
import { FUTURE_RESPONSES } from './seed/data/future.seed';
import { GENERAL_RESPONSES } from './seed/data/general.seed';
import { GREETING_RESPONSES } from './seed/data/greeting.seed';
import { HEALTH_RESPONSES } from './seed/data/health.seed';
import { LOVE_RESPONSES } from './seed/data/love.seed';
import { MONEY_RESPONSES } from './seed/data/money.seed';
import { SPIRITUALITY_RESPONSES } from './seed/data/spirituality.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seed de la base de datos...\n');

  // Limpiar base de datos
  await cleanDatabase(prisma);

  // Definir todas las categorías y sus datos
  const categories = [
    { category: Category.CAREER, data: CAREER_RESPONSES },
    { category: Category.DEATH, data: DEATH_RESPONSES },
    { category: Category.FAMILY, data: FAMILY_RESPONSES },
    { category: Category.FUTURE, data: FUTURE_RESPONSES },
    { category: Category.GENERAL, data: GENERAL_RESPONSES },
    { category: Category.GENERAL, data: GREETING_RESPONSES }, // Respuestas de saludo
    { category: Category.HEALTH, data: HEALTH_RESPONSES },
    { category: Category.LOVE, data: LOVE_RESPONSES },
    { category: Category.MONEY, data: MONEY_RESPONSES },
    { category: Category.SPIRITUALITY, data: SPIRITUALITY_RESPONSES },
  ];

  // Seed todas las categorías
  for (const { category, data } of categories) {
    await seedCategory(prisma, category, data);
  }

  // Estadísticas finales
  console.log('\n📊 Estadísticas del seed:');
  console.log('═══════════════════════════════════════════');

  let totalES = 0;
  let totalEN = 0;

  categories.forEach(({ category, data }) => {
    const counts = countResponses(data);
    totalES += counts.es;
    totalEN += counts.en;
    console.log(
      `${category.toUpperCase().padEnd(15)} → ES: ${counts.es.toString().padStart(3)}, EN: ${counts.en.toString().padStart(3)}, Total: ${counts.total.toString().padStart(3)}`,
    );
  });

  console.log('═══════════════════════════════════════════');
  console.log(
    `TOTAL          → ES: ${totalES.toString().padStart(3)}, EN: ${totalEN.toString().padStart(3)}, Total: ${(totalES + totalEN).toString().padStart(3)}`,
  );
  console.log('\n✅ Seed completado exitosamente!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
