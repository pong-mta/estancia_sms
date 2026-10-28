import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Cpu, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Firmware {
    id: number;
    version: string;
    filename: string;
    file_path: string;
    active: boolean;
    created_at: string;
}

interface Props {
    firmwares: Firmware[];
}

export default function Index({ firmwares }: Props) {
    const {
        data,
        setData,
        post,
        processing,
        progress,
        errors,
        reset,
    } = useForm<{
        version: string;
        file: File | null;
    }>({
        version: '',
        file: null,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('firmwares.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    function deleteFirmware(id: number, version: string) {

        if (!confirm(`Delete firmware ${version}?`)) {
            return;
        }

        router.delete(route('firmwares.destroy', id), {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Firmware deleted successfully.');
            },

            onError: () => {
                toast.error('Unable to delete firmware.');
            },
        });

    }

    return (
        <AppLayout>
            <Head title="Firmware Manager" />

            <div className="mx-auto max-w-7xl space-y-6 p-6">

                <div className="flex items-center gap-3">
                    <Cpu className="h-8 w-8 text-blue-600" />
                    <div>
                        <h1 className="text-2xl font-bold">
                            Firmware Manager
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage OTA firmware for all ESP32 Gateways
                        </p>
                    </div>
                </div>

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Upload Firmware
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >

                            <div>
                                <Label>Firmware Version</Label>

                                <Input
                                    placeholder="1.0.1"
                                    value={data.version}
                                    onChange={(e) =>
                                        setData(
                                            'version',
                                            e.target.value
                                        )
                                    }
                                />

                                {errors.version && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.version}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>.bin File</Label>

                                <Input
                                    type="file"
                                    accept=".bin"
                                    onChange={(e) =>
                                        setData(
                                            'file',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null
                                        )
                                    }
                                />

                                {errors.file && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.file}
                                    </p>
                                )}
                            </div>

                            {progress && (
                                <div className="space-y-2">
                                    <Progress
                                        value={progress.percentage}
                                    />

                                    <p className="text-sm text-gray-500">
                                        Uploading...
                                        {progress.percentage}%
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                <Upload className="mr-2 h-4 w-4" />

                                Upload Firmware
                            </Button>

                        </form>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader>
                        <CardTitle>
                            Uploaded Firmware
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead className="border-b bg-gray-50">

                                    <tr>

                                        <th className="p-3 text-left">Version</th>
                                        <th className="p-3 text-left">Filename</th>
                                        <th className="p-3 text-left">Status</th>
                                        <th className="p-3 text-left">Uploaded</th>
                                        <th className="p-3 text-right">Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {firmwares.length === 0 && (

                                        <tr>

                                            <td
                                                colSpan={5}
                                                className="p-6 text-center text-gray-500"
                                            >
                                                No firmware uploaded.
                                            </td>

                                        </tr>

                                    )}

                                    {firmwares.map((firmware) => (

                                        <tr
                                            key={firmware.id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-3 font-medium">
                                                {firmware.version}
                                            </td>

                                            <td className="p-3">
                                                {firmware.filename}
                                            </td>

                                            <td className="p-3">

                                                {firmware.active ? (

                                                    <span className="rounded bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Active
                                                    </span>

                                                ) : (

                                                    <span className="rounded bg-gray-100 px-3 py-1 text-xs">
                                                        Inactive
                                                    </span>

                                                )}

                                            </td>

                                            <td className="p-3">
                                                {new Date(
                                                    firmware.created_at
                                                ).toLocaleString()}
                                            </td>

                                            <td className="p-3 text-right space-x-2">

                                                {!firmware.active && (

                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            post(
                                                                route(
                                                                    "firmwares.activate",
                                                                    firmware.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        Activate
                                                    </Button>

                                                )}

                                                <Button
                                                    asChild
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    <a
                                                        href={`/storage/${firmware.file_path}`}
                                                        target="_blank"
                                                    >
                                                        Download
                                                    </a>
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => deleteFirmware(firmware.id, firmware.version)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </Button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </CardContent>

                </Card>

            </div>

        </AppLayout>
    );
}