import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Environment } from './config';
import { envConfigToken } from './common/constants/envToken';
import { LoggerService } from './helpers/logger/Logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // env
  const environment = app.get(ConfigService).get<Environment>(envConfigToken);

  // logger
  const logger = await app.resolve(LoggerService);

  // cors
  app.enableCors({
    origin: environment.whitelistedDomains,
  });

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Spend Wise')
    .setDescription(
      'Effortlessly track, manage, and optimize your expenses with our powerful and intuitive SaaS solution built on React, NestJS, and TypeScript.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refreshToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(environment.port);
  logger.log(`Server is running on ${await app.getUrl()}`, 'Bootstrap');
  logger.log(
    `Api documentation is available at ${await app.getUrl()}/api-docs`,
    'Bootstrap',
  );
}
bootstrap();
