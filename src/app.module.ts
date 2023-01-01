import { Module } from "@nestjs/common";
import { AccountsModule } from "@/accounts/accounts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { AuthModule } from "@/auth/auth.module";
import { CryptoModule } from "@/crypto/crypto.module";
import { SurveysModule } from "@/surveys/surveys.module";
import { FormsModule } from "@/forms/forms.module";
import { ResultsModule } from "@/results/results.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: "postgres",
                database: configService.get<string>("DATABASE_NAME"),
                autoLoadEntities: true,
                logging: true,
                synchronize: true,
                host: configService.get<string>("DATABASE_HOST"),
                port: configService.get<number>("DATABASE_PORT"),
                username: configService.get<string>("DATABASE_USERNAME"),
                password: configService.get<string>("DATABASE_PASSWORD")
            }),
            inject: [ConfigService]
        }),
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
        AccountsModule,
        AuthModule,
        CryptoModule,
        SurveysModule,
        FormsModule,
        ResultsModule
    ]
})
export class AppModule {}
