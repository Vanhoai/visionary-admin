import type { Option } from "@/core"
import type { BlogEntity } from "@/domain/entities"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface BlogStore {
    // State
    blogs: BlogEntity[]
    blog: Option<BlogEntity>

    // Actions
    setBlog: (blog: Option<BlogEntity>) => void
}

export const useBlogStore = create<BlogStore>()(
    immer((set) => ({
        blogs: [],
        blog: null,
        setBlog: (blog) => {
            set((state) => {
                state.blog = blog
            })
        },
    })),
)
