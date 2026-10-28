export default function Overview() {
    return (
        <section
            id="overview"
            className="scroll-mt-28 mb-20"
        >
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Overview
            </span>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
                PONG-MTA SMS API
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
                The PONG-MTA SMS API enables developers to send SMS messages
                directly from web applications, desktop software, mobile
                applications, ERP systems, POS systems, CRMs, and other
                third-party platforms using a simple REST API.
            </p>

            <p className="mt-4 text-gray-600">
                Every request is authenticated using an API Key through the
                <code className="mx-1 rounded bg-gray-100 px-2 py-1">
                    X-API-KEY
                </code>
                request header.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="font-semibold">
                        REST API
                    </h3>

                    <p className="mt-3 text-sm text-gray-600">
                        Standard JSON REST endpoints.
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="font-semibold">
                        API Key Authentication
                    </h3>

                    <p className="mt-3 text-sm text-gray-600">
                        Secure every request using your unique API key.
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="font-semibold">
                        JSON Responses
                    </h3>

                    <p className="mt-3 text-sm text-gray-600">
                        Receive clean, structured JSON responses for easy
                        integration.
                    </p>
                </div>

            </div>
        </section>
    );
}