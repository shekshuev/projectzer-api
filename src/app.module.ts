import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountsModule } from "./accounts/accounts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: (process.env.DATABASE_TYPE as any) || "sqlite",
            database: process.env.DATABASE_NAME || "database.db",
            autoLoadEntities: true,
            logging: true,
            synchronize: true,
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD
        }),
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
        AccountsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
