import { NestFactory, Reflector } from "@nestjs/core";
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const config = createConfig();
  const document = createDocument(app, config);

  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup("swagger", app, document, options);
}

function createConfig() {
  return new DocumentBuilder()
    .setTitle("Calenduo")
    .setDescription("Calenduo API")
    .addBearerAuth()
    .setVersion("1.0")
    .addServer("http://localhost:3000")
    .addServer("http://api.calenduo.com")
    .build();
}

function createDocument(
  app: INestApplication,
  config: Omit<OpenAPIObject, "paths">
) {
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  return SwaggerModule.createDocument(app, config, options);
}
