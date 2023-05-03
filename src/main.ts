import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configDocumentBuilder = new DocumentBuilder()
    .setTitle('Management System - 02')
    .setDescription(
      "O2 is a private system created to assist in the management of NTConsult's projects, clients and employees.",
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configDocumentBuilder);
  SwaggerModule.setup('documentation/swagger', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
