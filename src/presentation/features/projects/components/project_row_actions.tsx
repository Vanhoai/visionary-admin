import { DotsHorizontalIcon, Pencil2Icon, ArchiveIcon } from "@radix-ui/react-icons"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/presentation/components"

export const ProjectRowActions: React.FC = () => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => {}}>
                    Edit
                    <DropdownMenuShortcut>
                        <Pencil2Icon width={16} height={16} />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                    Delete
                    <DropdownMenuShortcut>
                        <ArchiveIcon width={16} height={16} color="#E54D2E" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
