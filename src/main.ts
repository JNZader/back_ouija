import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ThrottlerExceptionFilter } from './common/filters/throttler-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as express from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          fontSrc: ["'self'", 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  const publicPath = path.join(__dirname, '..', '..', 'public');
  app.useStaticAssets(publicPath);
  console.log('Static assets path:', publicPath);

  // CORS
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:3000'];

  for (const origin of corsOrigins) {
    try {
      const url = new URL(origin);

      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error(`Protocolo invalido: ${url.protocol}`);
      }
    } catch (err) {
      console.error(`Origen CORS invalido: ${origin}`);
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }

  app.enableCors({ origin: corsOrigins, credentials: true });

  app.useGlobalFilters(new AllExceptionsFilter(), new ThrottlerExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Ouija Virtual API')
    .setDescription('API misteriosa...')
    .setVersion('1.0')
    .addTag('ouija', 'Endpoints principales para consultas místicas')
    .addTag('health', 'Endpoint de salud y monitoreo')
    .addServer('http://localhost:3001', 'Servidor local de desarrollo')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Ouija Virtual API Docs',
    customfavIcon: '/swagger/favicon.ico',
    customCssUrl: ['https://fonts.googleapis.com/css2?family=Creepster&display=swap', '/swagger/swagger-theme.css'],
    customJs: ['/swagger/custom-cursor.js'],
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      filter: true,
      docExpansion: 'list',
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Backend: http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/api`);
  console.log(`CORS origins validados: ${corsOrigins.join(', ')}`);
}

void bootstrap();
