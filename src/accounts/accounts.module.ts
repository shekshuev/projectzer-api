import { Module } from "@nestjs/common";
import { AccountsController } from "@/accounts/accounts.controller";
import { AccountsService } from "@/accounts/accounts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "@/accounts/account.entity";
import { ConfigModule } from "@nestjs/config";
import { AccountProfile } from "@/accounts/automapper.profile";
import { AutomapperModule } from "@automapper/nestjs";
import { CryptoService } from "@/crypto/crypto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Account]), ConfigModule, AutomapperModule],
    exports: [TypeOrmModule],
    controllers: [AccountsController],
    providers: [AccountsService, AccountProfile, CryptoService]
})
export class AccountsModule {}
