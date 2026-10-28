import { useState } from "react";
import CodeBlock from "./CodeBlock";

interface LanguageExample {
    language: string;
    title: string;
    code: string;
}

interface Props {
    examples: LanguageExample[];
}

export default function LanguageTabs({ examples }: Props) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

            {/* Tabs */}

            <div className="flex overflow-x-auto border-b bg-gray-50">

                {examples.map((example, index) => (
                    <button
                        key={example.language}
                        onClick={() => setSelected(index)}
                        className={`px-5 py-3 text-sm font-medium transition whitespace-nowrap ${
                            selected === index
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }`}
                    >
                        {example.language}
                    </button>
                ))}

            </div>

            <CodeBlock
                language={examples[selected].language.toLowerCase()}
                title={examples[selected].title}
                code={examples[selected].code}
            />

        </div>
    );
}