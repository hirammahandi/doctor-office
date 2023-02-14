import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as transform from "class-transformer";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api";
  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformerPackage: transform,
    })
  );
  app.enableCors({ origin: ["http://localhost:4200"] });
  const port: number = configService.get<number>("PORT");

  const config = new DocumentBuilder()
    .setTitle("Clinic example")
    .setDescription("The clinic API description")
    .setVersion("1.0")
    .addTag("patients")
    .addTag("doctors")
    .addTag("medical records")
    .addTag("authorization")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = "swagger-clinic-api";
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port);

  Logger.log(`🚀 Swagger OpenApi is running on: http://localhost:${port}/${swaggerPath}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
