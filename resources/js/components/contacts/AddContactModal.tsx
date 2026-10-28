import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddContactModal({
    open,
    onOpenChange,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        company: '',
        address: '',
        birthday: '',
        status: 'active',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('contacts.store'), {
            preserveScroll: true,

            onSuccess: () => {
                reset();
                onOpenChange(false);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">

                <DialogHeader>
                    <DialogTitle>Add Contact</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                    <div className="grid gap-4 md:grid-cols-2">

                        <div>

                            <Label>First Name <span className="text-red-500">*</span></Label>

                            <Input
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                            />

                            {errors.first_name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.first_name}
                                </p>
                            )}

                        </div>

                        <div>

                            <Label>Last Name</Label>

                            <Input
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                        <div>

                            <Label>Mobile Number <span className="text-red-500">*</span></Label>

                            <Input
                                value={data.mobile}
                                onChange={(e) =>
                                    setData('mobile', e.target.value)
                                }
                            />

                            {errors.mobile && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.mobile}
                                </p>
                            )}

                        </div>

                        <div>

                            <Label>Email</Label>

                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                        <div>

                            <Label>Company</Label>

                            <Input
                                value={data.company}
                                onChange={(e) =>
                                    setData('company', e.target.value)
                                }
                            />

                        </div>

                        <div>

                            <Label>Birthday</Label>

                            <Input
                                type="date"
                                value={data.birthday}
                                onChange={(e) =>
                                    setData('birthday', e.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div>

                        <Label>Address</Label>

                        <Input
                            value={data.address}
                            onChange={(e) =>
                                setData('address', e.target.value)
                            }
                        />

                    </div>

                    <div>

                        <Label>Status</Label>

                        <Select
                            value={data.status}
                            onValueChange={(value) =>
                                setData('status', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="active">
                                    Active
                                </SelectItem>

                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    <DialogFooter>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                        >

                            {processing && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            Save Contact

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    );
}