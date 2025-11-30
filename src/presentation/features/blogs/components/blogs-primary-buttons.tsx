import * as React from "react"
import { Download, Plus } from "lucide-react"
import { Button } from "@/presentation/components"

export const BlogsPrimaryButtons: React.FC = () => {
    return (
        <div className="flex gap-2">
            <Button variant="outline" className="space-x-1" onClick={() => {}}>
                <span>Import</span> <Download size={18} />
            </Button>
            <Button className="space-x-1" onClick={() => {}}>
                <span>Create</span> <Plus size={18} />
            </Button>
        </div>
    )
}
