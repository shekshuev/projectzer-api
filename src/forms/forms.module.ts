import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Form } from "@/forms/form.entity";
import { FormsService } from "@/forms/forms.service";
import { FormsController } from "@/forms/forms.controller";
import { AutomapperModule } from "@automapper/nestjs";
import { FormsProfile } from "@/forms/automapper.profile";

@Module({
    imports: [TypeOrmModule.forFeature([Form]), AutomapperModule],
    exports: [TypeOrmModule, FormsService],
    providers: [FormsService, FormsProfile],
    controllers: [FormsController]
})
export class FormsModule {}
