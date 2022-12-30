import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { SigInDTO } from "@/auth/dto/signin.dto";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { ReadTokenDTO } from "@/auth/dto/read.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiResponse({ status: 201, description: "Access token successfully created", type: ReadTokenDTO })
    @ApiResponse({ status: 401, description: "Unauthorized (wrong username or password)" })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @Post("signin")
    async login(@Body() signInDTO: SigInDTO): Promise<ReadTokenDTO> {
        return this.authService.signIn(signInDTO);
    }
}
