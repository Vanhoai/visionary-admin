import * as React from "react"
import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/presentation/components"

export const ProjectsPrimaryButtons: React.FC = () => {
    return (
        <div className="flex gap-2">
            <Button variant="outline" className="space-x-1" onClick={() => {}}>
                <span>Import</span> <DownloadIcon />
            </Button>
            <Button className="space-x-1" onClick={() => {}}>
                <span>Create</span> <PlusIcon />
            </Button>
        </div>
    )
}
