import { Landmark } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <Landmark className="size-5 text-white" />
            </div>

            <div className="ml-2 grid min-w-0 flex-1 text-left text-sm">
                <span className="truncate leading-tight font-bold">LGU ESTANCIA</span>

                <span className="text-muted-foreground truncate text-xs leading-tight">Municipal SMS Gateway</span>
            </div>
        </>
    );
}
