import type { Failure, Option } from "@/core"
import type { AccountEntity } from "../entities"

export interface ManageAccountUseCase {
    findAccountWithEmail(email: string): Promise<Option<AccountEntity> | Failure>
    findCurrentAccount(): Promise<AccountEntity | Failure>
}
