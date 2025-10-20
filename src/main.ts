import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parse CORS origins from environment variable
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000'];

  // Enable CORS
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Ouija Virtual Backend running on port ${port}`);
  console.log(`CORS enabled for: ${corsOrigins.join(', ')}`);
  console.log(`Ollama URL: ${process.env.OLLAMA_URL || 'Not configured'}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

void bootstrap();
