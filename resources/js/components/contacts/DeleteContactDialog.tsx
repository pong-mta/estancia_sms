import { router } from "@inertiajs/react";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Contact {
    id: number;
    first_name: string;
    last_name: string | null;
}

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contact: Contact | null;
}

export default function DeleteContactDialog({
    open,
    onOpenChange,
    contact,
}: Props) {

    const [processing, setProcessing] = useState(false);

    function destroy() {

        if (!contact) return;

        setProcessing(true);

        router.delete(route("contacts.destroy", contact.id), {

            preserveScroll: true,

            onFinish: () => {

                setProcessing(false);
                onOpenChange(false);

            },

        });

    }

    return (

        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle className="flex items-center gap-2">

                        <Trash2 className="h-5 w-5 text-red-500" />

                        Delete Contact

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        Are you sure you want to delete

                        <span className="font-semibold">
                            {" "}
                            {contact?.first_name} {contact?.last_name}
                        </span>

                        ?

                        <br />

                        <br />

                        This action cannot be undone.

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={destroy}
                        disabled={processing}
                        className="bg-red-600 hover:bg-red-700"
                    >

                        {processing && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        Delete

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}