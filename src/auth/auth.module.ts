import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccountsService } from "src/accounts/accounts.service";
import { AccountsModule } from "src/accounts/accounts.module";
import { CryptoService } from "src/crypto/crypto.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        AccountsModule,
        PassportModule
    ],
    providers: [AuthService, AccountsService, CryptoService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
