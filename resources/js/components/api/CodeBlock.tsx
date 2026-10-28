import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

interface Props {
    language: string;
    code: string;
    title?: string;
}

export default function CodeBlock({
    language,
    code,
    title,
}: Props) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-[#1e1e1e] shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-700 bg-[#2d2d2d] px-4 py-3">
                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                        {language}
                    </span>

                    {title && (
                        <span className="text-sm text-gray-300">
                            {title}
                        </span>
                    )}
                </div>

                <button
                    onClick={copyCode}
                    className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition hover:bg-gray-700"
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    showLineNumbers
                    customStyle={{
                        margin: 0,
                        padding: "24px",
                        fontSize: "14px",
                        background: "#1e1e1e",
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}