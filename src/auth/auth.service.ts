import { Injectable } from "@nestjs/common";
import { AccountsService } from "src/accounts/accounts.service";
import { CryptoService } from "src/crypto/crypto.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountsService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.accountService.findOneByUserName(userName);
        if (await this.cryptoService.checkPasswordHash(password, user.passwordHash)) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
