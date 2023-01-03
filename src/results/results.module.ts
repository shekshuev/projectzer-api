import { Module } from "@nestjs/common";
import { ResultsService } from "@/results/results.service";
import { ResultsController } from "@/results/results.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Result } from "@/results/result.entity";
import { Survey } from "@/surveys/survey.entity";
import { SurveysModule } from "@/surveys/surveys.module";
import { ResultsProfile } from "@/results/automapper.profile";
import { AutomapperModule } from "@automapper/nestjs";
import { SurveysService } from "@/surveys/surveys.service";
import { AccountsModule } from "@/accounts/accounts.module";
import { AccountsService } from "@/accounts/accounts.service";

@Module({
    imports: [TypeOrmModule.forFeature([Result, Survey]), AutomapperModule, SurveysModule, AccountsModule],
    exports: [TypeOrmModule],
    providers: [ResultsService, ResultsProfile, SurveysService, AccountsService],
    controllers: [ResultsController]
})
export class ResultsModule {}
