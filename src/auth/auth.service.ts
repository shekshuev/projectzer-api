import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountsService } from "@/accounts/accounts.service";
import { CryptoService } from "@/crypto/crypto.service";
import { JwtService } from "@nestjs/jwt";
import { SigInDTO } from "@/auth/dto/signin.dto";
import { ReadTokenDTO } from "@/auth/dto/read.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDTO: SigInDTO): Promise<ReadTokenDTO> {
        try {
            const user = await this.accountService.findOneByUserName(signInDTO.userName);
            if (await this.cryptoService.checkPasswordHash(signInDTO.password, user.passwordHash)) {
                return {
                    accessToken: this.jwtService.sign({ id: user.id, username: user.userName, role: user.role })
                };
            } else {
                throw new UnauthorizedException("Wrong password");
            }
        } catch {
            throw new UnauthorizedException("Wrong username");
        }
    }
}
