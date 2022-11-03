import { AutoMap } from "@automapper/classes";

export class ReadAccountDto {
    @AutoMap()
    id: number;

    @AutoMap()
    userName: string;

    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;

    @AutoMap()
    role: string;
}
