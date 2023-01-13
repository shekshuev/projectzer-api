import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Role } from "@/enums/role.enum";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET")
        });
    }

    async validate(payload: any) {
        const { role, ...rest } = payload;
        const roles = [role];
        if (role === Role.Root) {
            roles.push(Role.Admin);
            roles.push(Role.Interviewer);
        } else if (role === Role.Admin) {
            roles.push(Role.Interviewer);
        }
        return {
            ...rest,
            roles: roles
        };
    }
}
