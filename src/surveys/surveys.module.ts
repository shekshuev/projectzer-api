import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "@/surveys/survey.entity";
import { SurveysService } from "@/surveys/surveys.service";
import { SurveysController } from "@/surveys/surveys.controller";
import { AutomapperModule } from "@automapper/nestjs";
import { SurveyProfile } from "@/surveys/automapper.profile";
import { FormsModule } from "@/forms/forms.module";
import { Form } from "@/forms/form.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Survey, Form]), AutomapperModule, FormsModule],
    exports: [TypeOrmModule, FormsModule, SurveysService],
    providers: [SurveysService, SurveyProfile],
    controllers: [SurveysController]
})
export class SurveysModule {}
