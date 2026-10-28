import LanguageTabs from "./LanguageTabs";

const examples = [
    {
        language: "cURL",
        title: "Send SMS",
        code: `curl -X POST https://sms.pong-mta.tech/api/v1/send \
-H "X-API-KEY: YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "mobile": "09171234567",
  "message": "Hello from PONG-MTA!"
}'`,
    },
    {
        language: "JavaScript",
        title: "Fetch API",
        code: `fetch("https://sms.pong-mta.tech/api/v1/send", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "YOUR_API_KEY"
    },
    body: JSON.stringify({
        mobile: "09171234567",
        message: "Hello from PONG-MTA!"
    })
});`,
    },
    {
        language: "PHP",
        title: "PHP",
        code: `<?php

$payload = [
    "mobile" => "09171234567",
    "message" => "Hello from PONG-MTA!"
];

// Your HTTP request here
`,
    },
];

export default function SendSms() {
    return (
        <section
            id="send-sms"
            className="scroll-mt-28 mb-20"
        >
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Endpoint
            </span>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
                Send SMS
            </h2>

            <p className="mt-6 text-lg text-gray-600">
                Send a single SMS message using the REST API.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border">
                <table className="w-full">
                    <tbody>
                        <tr className="border-b">
                            <td className="w-40 bg-gray-50 p-4 font-semibold">
                                Method
                            </td>
                            <td className="p-4">
                                <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                                    POST
                                </span>
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="bg-gray-50 p-4 font-semibold">
                                Endpoint
                            </td>
                            <td className="p-4 font-mono">
                                /api/v1/send
                            </td>
                        </tr>

                        <tr>
                            <td className="bg-gray-50 p-4 font-semibold">
                                Authentication
                            </td>
                            <td className="p-4">
                                X-API-KEY Header
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <LanguageTabs examples={examples} />
        </section>
    );
}