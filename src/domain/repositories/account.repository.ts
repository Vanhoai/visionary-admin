import type { Failure, Option } from "@/core"
import type { AccountEntity } from "../entities"

export interface IAccountRepository {
    findAccountWithEmail(email: string): Promise<Option<AccountEntity> | Failure>
    findAccountWithId(id: string): Promise<Option<AccountEntity> | Failure>
    findCurrentAccount(): Promise<AccountEntity | Failure>
}
