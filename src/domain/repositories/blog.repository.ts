import type { Failure } from "@/core"
import type { BlogEntity } from "../entities"

export interface IBlogRepository {
    findAllBlogs(): Promise<BlogEntity[] | Failure>
}
