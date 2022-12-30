import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { SigInDto } from "@/auth/dto/signin.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signin")
    async login(@Body() signInDto: SigInDto) {
        return this.authService.signIn(signInDto);
    }
}
