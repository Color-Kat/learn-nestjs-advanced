import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SeedService } from "@/seed/seed.service";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);


  // Data seeding
  // const seedService = app.get(SeedService);
  // await seedService.seed();


  await app.listen(configService.get<number>('port'));
}

bootstrap();
