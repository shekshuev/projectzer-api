import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AccountsModule } from "./accounts/accounts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "projectzero",
            autoLoadEntities: true,
            synchronize: true
        }),
        ConfigModule.forRoot(),
        AccountsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
