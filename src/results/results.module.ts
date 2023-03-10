import { Module } from "@nestjs/common";
import { ResultsService } from "@/results/results.service";
import { ResultsController } from "@/results/results.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Result } from "@/results/result.entity";
import { Survey } from "@/surveys/survey.entity";
import { SurveysModule } from "@/surveys/surveys.module";
import { ResultsProfile } from "@/results/automapper.profile";
import { AutomapperModule } from "@automapper/nestjs";
import { AccountsModule } from "@/accounts/accounts.module";

@Module({
    imports: [TypeOrmModule.forFeature([Result, Survey]), AutomapperModule, SurveysModule, AccountsModule],
    exports: [TypeOrmModule],
    providers: [ResultsService, ResultsProfile],
    controllers: [ResultsController]
})
export class ResultsModule {}
