import CodeBlock from "./CodeBlock";

const authExample = `POST /api/v1/send HTTP/1.1
Host: sms.pong-mta.tech
Content-Type: application/json
X-API-KEY: YOUR_API_KEY`;

export default function Authentication() {
    return (
        <section
            id="authentication"
            className="scroll-mt-28 mb-20"
        >
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Authentication
            </span>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
                Authenticate Requests
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
                All API requests must include your API Key in the
                <code className="mx-1 rounded bg-gray-100 px-2 py-1">
                    X-API-KEY
                </code>
                HTTP header.
            </p>

            <div className="mt-8 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5">
                <p className="font-semibold text-amber-800">
                    Keep your API key secret.
                </p>

                <p className="mt-2 text-sm text-amber-700">
                    Never expose your API key in frontend applications,
                    JavaScript running in browsers, or public repositories.
                    Store it securely on your backend server.
                </p>
            </div>

            <div className="mt-8">
                <CodeBlock
                    language="http"
                    title="Authentication Header"
                    code={authExample}
                />
            </div>
        </section>
    );
}