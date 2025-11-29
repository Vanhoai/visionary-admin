export type Option<T> = T | null | undefined

export type Nullable<T> = T | null

export class Either<L, R> {
    private data: L | R
    private isLeft: boolean

    private constructor(data: L | R, isLeft: boolean) {
        this.data = data
        this.isLeft = isLeft
    }

    static Left<L, R>(data: L): Either<L, R> {
        return new Either<L, R>(data, true)
    }

    static Right<L, R>(data: R): Either<L, R> {
        return new Either<L, R>(data, false)
    }

    isLeftValue(): boolean {
        return this.isLeft
    }

    isRightValue(): boolean {
        return !this.isLeft
    }

    left(): L {
        if (this.isLeft) {
            return this.data as L
        }

        throw new Error("Cannot get Left value from a Right Either")
    }

    right(): R {
        if (!this.isLeft) {
            return this.data as R
        }

        throw new Error("Cannot get Right value from a Left Either")
    }
}
