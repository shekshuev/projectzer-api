import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountsService } from "@/accounts/accounts.service";
import { CryptoService } from "@/crypto/crypto.service";
import { JwtService } from "@nestjs/jwt";
import { SigInDto } from "@/auth/dto/signin.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SigInDto) {
        try {
            const user = await this.accountService.findOneByUserName(signInDto.userName);
            if (await this.cryptoService.checkPasswordHash(signInDto.password, user.passwordHash)) {
                return {
                    accessToken: this.jwtService.sign({ username: user.userName, role: user.role })
                };
            } else {
                throw new UnauthorizedException("Wrong password");
            }
        } catch {
            throw new UnauthorizedException("Wrong username");
        }
    }
}
