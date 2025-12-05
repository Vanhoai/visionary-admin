import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { isFailure } from "@/core"
import { experienceService } from "@/presentation/di"
import type { AddExperienceParams, UpdateExperienceParams } from "@/domain/usecases"

export const experienceKeys = {
    all: ["experiences"] as const,
    lists: () => [...experienceKeys.all, "list"] as const,
    list: (filters?: Record<string, unknown>) => [...experienceKeys.lists(), filters] as const,
    details: () => [...experienceKeys.all, "detail"] as const,
    detail: (id: string) => [...experienceKeys.details(), id] as const,
}

export function useExperiences() {
    return useQuery({
        queryKey: experienceKeys.list(),
        queryFn: async () => {
            const result = await experienceService.findExperiences()
            if (isFailure(result)) {
                toast.error(result.message)
                throw new Error(result.message)
            }

            return result
        },
    })
}

export function useExperience(id: string) {
    return useQuery({
        queryKey: experienceKeys.detail(id),
        queryFn: async () => {
            const result = await experienceService.findExperience(id)
            if (isFailure(result)) {
                toast.error(result.message)
                throw new Error(result.message)
            }

            return result
        },
        enabled: !!id,
    })
}

export function useAddExperience() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (params: AddExperienceParams) => {
            const result = await experienceService.addExperience(params)
            if (isFailure(result)) throw new Error(result.message)

            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: experienceKeys.list() })
            toast.success("Experience added successfully")
        },
        onError: (error: Error) => toast.error(error.message),
    })
}

export function useUpdateExperience() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (params: UpdateExperienceParams) => {
            const result = await experienceService.updateExperience(params)
            if (isFailure(result)) throw new Error(result.message)

            return result
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: experienceKeys.lists() })
            queryClient.invalidateQueries({ queryKey: experienceKeys.detail(variables.id) })
            toast.success("Experience updated successfully")
        },
        onError: (error: Error) => toast.error(error.message),
    })
}

export function useDeleteExperience() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const result = await experienceService.deleteExperience(id)
            if (isFailure(result)) throw new Error(result.message)

            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: experienceKeys.lists() })
            toast.success("Experience deleted successfully")
        },
        onError: (error: Error) => toast.error(error.message),
    })
}
