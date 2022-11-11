import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccountsService } from "src/accounts/accounts.service";
import { AccountsModule } from "src/accounts/accounts.module";
import { CryptoService } from "src/crypto/crypto.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AccountsModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1h" }
        })
    ],
    providers: [AuthService, AccountsService, CryptoService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
