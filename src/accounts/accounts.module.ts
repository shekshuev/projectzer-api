import { Module } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./account.entity";
import { ConfigModule } from "@nestjs/config";
import { AccountProfile } from "./automapper.profile";
import { AutomapperModule } from "@automapper/nestjs";
import { CryptoService } from "src/crypto/crypto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Account]), ConfigModule, AutomapperModule],
    exports: [TypeOrmModule],
    controllers: [AccountsController],
    providers: [AccountsService, AccountProfile, CryptoService]
})
export class AccountsModule {}
