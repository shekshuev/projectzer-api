import { Injectable } from "@nestjs/common";
import { AccountsService } from "src/accounts/accounts.service";
import { hashPassword } from "src/utils/hash";
import { CryptoService } from "src/crypto/crypto.service";

@Injectable()
export class AuthService {
    constructor(private readonly accountService: AccountsService, private readonly cryptoService: CryptoService) {}

    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.accountService.findOneByUserName(userName);
        const hash = await hashPassword(password);
        return user && user.passwordHash === hash && user;
    }
}
