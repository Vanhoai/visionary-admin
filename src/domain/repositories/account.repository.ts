import type { Failure, Option } from "@/core"
import type { AccountEntity } from "../entities"

export interface AccountRepository {
    findByEmail(email: string): Promise<Option<AccountEntity> | Failure>
}
