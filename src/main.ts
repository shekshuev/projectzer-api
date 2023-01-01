import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
        .setTitle("ProjectZero API")
        .setDescription("The API description of system for conducting sociological surveys")
        .setVersion("1.0")
        .addTag("forms")
        .addTag("results")
        .addTag("surveys")
        .addTag("accounts")
        .addTag("auth")
        .addBearerAuth({ in: "header", type: "http" }, "Bearer")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    await app.listen(3000);
}
bootstrap();
