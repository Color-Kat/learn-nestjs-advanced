import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

declare const module: any;


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);

    // Data seeding
    // const seedService = app.get(SeedService);
    // await seedService.seed();

    // Swagger setup
    const swaggerConfig = new DocumentBuilder()
        .setTitle("Spotify Clone")
        .setDescription("The spotify clone API documentation by @ColorKat")
        .setVersion("1.0")
        .addBearerAuth(
            {
                type        : "http",
                scheme      : "bearer",
                bearerFormat: "JWT",
                name        : "JWT",
                description : "Enter JWT token",
                in          : "header"
            },
            "JWT-auth"
        )
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, document);

    await app.listen(configService.get<number>("port"));

    // Configure webpack hmr
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
