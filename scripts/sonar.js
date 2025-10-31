#!/usr/bin/env node

/**
 * Script wrapper para ejecutar SonarQube Scanner
 * Carga las variables de entorno desde .env antes de ejecutar el scanner
 */

const { execSync } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Cargar variables de entorno desde .env
const envPath = path.resolve(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  console.log('📁 Cargando variables de entorno desde .env...');
  dotenv.config({ path: envPath });

  // Verificar que las variables necesarias estén presentes
  const requiredVars = ['SONAR_TOKEN', 'SONAR_HOST_URL', 'SONAR_PROJECT_KEY'];
  const missingVars = requiredVars.filter(v => !process.env[v]);

  if (missingVars.length > 0) {
    console.error(`❌ Error: Faltan las siguientes variables de entorno: ${missingVars.join(', ')}`);
    console.error('   Por favor, configúralas en tu archivo .env');
    process.exit(1);
  }

  console.log('✅ Variables de entorno cargadas correctamente');
  console.log(`   - SONAR_HOST_URL: ${process.env.SONAR_HOST_URL}`);
  console.log(`   - SONAR_PROJECT_KEY: ${process.env.SONAR_PROJECT_KEY}`);
  console.log('');
} else {
  console.warn('⚠️  Advertencia: No se encontró el archivo .env');
  console.warn('   Asegúrate de configurar las variables de entorno manualmente');
  console.log('');
}

// Ejecutar sonar-scanner
try {
  console.log('🔍 Iniciando análisis de SonarQube...');
  console.log('');

  execSync('sonar-scanner', {
    stdio: 'inherit',
    env: process.env,
  });

  console.log('');
  console.log('✅ Análisis completado exitosamente');
} catch (error) {
  console.error('');
  console.error('❌ Error al ejecutar SonarQube Scanner');
  process.exit(1);
}
