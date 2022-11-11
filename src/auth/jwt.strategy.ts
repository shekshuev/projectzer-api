import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Role } from "src/enums/role.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET ?? "JWT_SECRET"
        });
    }

    async validate(payload: any) {
        const { role, ...rest } = payload;
        const roles = [role];
        if (role === Role.Admin) {
            roles.push(Role.Interviewer);
        }
        return {
            ...rest,
            roles: roles
        };
    }
}
