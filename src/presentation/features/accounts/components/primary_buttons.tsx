import { Button } from "@/presentation/components/ui/button"
import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons"

export function AccountsPrimaryButtons() {
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
