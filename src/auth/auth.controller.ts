import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
    @Post("signin")
    async login() {
        return "ok";
    }
}
