import { Module } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./account.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([Account]), ConfigModule],
    controllers: [AccountsController],
    providers: [AccountsService]
})
export class AccountsModule {}
