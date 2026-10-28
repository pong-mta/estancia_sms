import { Database } from "lucide-react";

interface Props {
    smsTokens: number;
}

export default function SmsCredit({ smsTokens }: Props) {
    return (
        <div className="inline-flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Database  className="h-5 w-5 text-amber-600" />
            </div>

            <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-amber-700">
                    SMS Credits
                </p>

                <p className="text-xl font-bold leading-none text-gray-900">
                    {smsTokens.toLocaleString()}
                </p>
            </div>
        </div>
    );
}