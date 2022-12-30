import { Module } from "@nestjs/common";
import { CryptoService } from "@/crypto/crypto.service";

@Module({
    providers: [CryptoService]
})
export class CryptoModule {}
