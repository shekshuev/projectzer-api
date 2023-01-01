import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "@/surveys/survey.entity";
import { SurveysService } from "@/surveys/surveys.service";
import { SurveysController } from "@/surveys/surveys.controller";
import { AutomapperModule } from "@automapper/nestjs";
import { SurveyProfile } from "@/surveys/automapper.profile";
import { FormsModule } from "@/forms/forms.module";
import { FormsService } from "@/forms/forms.service";
import { Form } from "@/forms/form.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Survey, Form]), AutomapperModule, FormsModule],
    exports: [TypeOrmModule, FormsService],
    providers: [SurveysService, SurveyProfile, FormsService],
    controllers: [SurveysController]
})
export class SurveysModule {}
