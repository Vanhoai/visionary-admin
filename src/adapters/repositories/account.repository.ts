import type { Failure, Option } from "@/core"
import type { AccountEntity } from "@/domain/entities"
import type { IAccountRepository } from "@/domain/repositories"

import type { ApiService } from "../apis"
import { BaseRepository } from "./base.repository"

export class AccountRepository extends BaseRepository implements IAccountRepository {
    constructor(api: ApiService) {
        super(api)
    }

    findAccountWithEmail(email: string): Promise<Option<AccountEntity> | Failure> {
        return super.safe(() => {
            return this.api.get<Option<AccountEntity>>({
                endpoint: `${this.BASE_ACCOUNT_URL}/find-account-with-email`,
                params: { email: email },
            })
        })
    }

    async findAccountWithId(id: string): Promise<Option<AccountEntity> | Failure> {
        return this.api.get<Option<AccountEntity>>({
            endpoint: `${this.BASE_ACCOUNT_URL}/find-account-with-id`,
            params: { id: id },
        })
    }

    findCurrentAccount(): Promise<AccountEntity | Failure> {
        return super.safe(() => {
            return this.api.get<AccountEntity>({
                endpoint: `${this.BASE_ACCOUNT_URL}/find-profile`,
            })
        })
    }
}
