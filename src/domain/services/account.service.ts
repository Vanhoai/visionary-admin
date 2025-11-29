import {
    Failure,
    FailureCodes,
    isEmptyString,
    isValidEmail,
    type Option,
} from "@/core"
import type { ManageAccountUseCase } from "../usecases"
import type { AccountEntity } from "../entities"
import type { IAccountRepository } from "../repositories"

export class AccountService implements ManageAccountUseCase {
    private readonly accountRepository: IAccountRepository
    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository
    }

    async findAccountWithEmail(
        email: string,
    ): Promise<Option<AccountEntity> | Failure> {
        if (isEmptyString(email))
            return new Failure(
                FailureCodes.ValidationError,
                "Email cannot be empty",
            )

        if (!isValidEmail(email))
            return new Failure(
                FailureCodes.ValidationError,
                "Email format is invalid",
            )

        return await this.accountRepository.findAccountWithEmail(email)
    }
}
