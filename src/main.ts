import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Calenduo')
    .setDescription('Calenduo API')
    .addBearerAuth()
    .setVersion('1.0')
    .addServer('http://localhost:5000')
    .addServer('http://api.calenduo.com')
    .build();

  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('swagger', app, document, options);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
