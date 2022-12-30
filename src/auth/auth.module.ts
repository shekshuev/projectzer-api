import { Module } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { AccountsService } from "@/accounts/accounts.service";
import { AccountsModule } from "@/accounts/accounts.module";
import { CryptoService } from "@/crypto/crypto.service";
import { AuthController } from "@/auth/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AccountsModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: config.get<string>("JWT_EXPIRATION")
                }
            }),
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, AccountsService, CryptoService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
