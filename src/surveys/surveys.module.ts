import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "@/surveys/survey.entity";
import { SurveysService } from "@/surveys/surveys.service";
import { SurveysController } from "@/surveys/surveys.controller";
import { AutomapperModule } from "@automapper/nestjs";
import { SurveyProfile } from "@/surveys/automapper.profile";

@Module({
    imports: [TypeOrmModule.forFeature([Survey]), AutomapperModule],
    exports: [TypeOrmModule],
    providers: [SurveysService, SurveyProfile],
    controllers: [SurveysController]
})
export class SurveysModule {}
