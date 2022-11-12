import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./survey.entity";
import { SurveysService } from "./surveys.service";
import { SurveysController } from "./surveys.controller";
import { AutomapperModule } from "@automapper/nestjs";
import { SurveyProfile } from "./automapper.profile";

@Module({
    imports: [TypeOrmModule.forFeature([Survey]), AutomapperModule],
    exports: [TypeOrmModule],
    providers: [SurveysService, SurveyProfile],
    controllers: [SurveysController]
})
export class SurveysModule {}
