import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "@/surveys/survey.entity";
import { FilledSurvey } from "@/surveys/survey-filled.entity";
import { SurveysService } from "@/surveys/surveys.service";
import { SurveysController } from "@/surveys/surveys.controller";
import { AutomapperModule } from "@automapper/nestjs";
import { SurveyProfile } from "@/surveys/automapper.profile";

@Module({
    imports: [TypeOrmModule.forFeature([Survey, FilledSurvey]), AutomapperModule],
    exports: [TypeOrmModule],
    providers: [SurveysService, SurveyProfile],
    controllers: [SurveysController]
})
export class SurveysModule {}
