import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccountsService } from "src/accounts/accounts.service";
import { AccountsModule } from "src/accounts/accounts.module";
import { CryptoService } from "src/crypto/crypto.service";
import { AuthController } from './auth.controller';

@Module({
    imports: [AccountsModule],
    providers: [AuthService, AccountsService, CryptoService],
    controllers: [AuthController]
})
export class AuthModule {}
