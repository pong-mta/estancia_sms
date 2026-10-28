import TopNavigation from "@/components/api/TopNavigation";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Hero from "@/components/api/Hero";
import LanguageTabs from "@/components/api/LanguageTabs";
import Overview from "@/components/api/Overview";
import Authentication from "@/components/api/Authentication";
import SendSms from "@/components/api/SendSms";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API Documentation',
        href: '/documentation',
    },
];

const examples = [
    {
        language: "cURL",
        title: "Send SMS",
        code: `curl -X POST https://sms.pong-mta.tech/api/v1/send \
-H "X-API-KEY: YOUR_API_KEY" \
-H "Content-Type: application/json" \
-d '{
    "mobile":"09171234567",
    "message":"Hello World!"
}'`
    },

    {
        language: "PHP",
        title: "Send SMS",
        code: `<?php

echo "Hello from PHP";
`
    },

    {
        language: "Python",
        title: "Send SMS",
        code: `print("Hello from Python")`
    },

    {
        language: "JavaScript",
        title: "Send SMS",
        code: `console.log("Hello JavaScript");`
    },
];

const items = [
    { id: "overview", title: "Overview" },
    { id: "authentication", title: "Authentication" },
    { id: "send-sms", title: "Send SMS" },
    { id: "request", title: "Request Body" },
    { id: "response", title: "Success Response" },
    { id: "errors", title: "Error Responses" },
    { id: "examples", title: "Code Examples" },
];

export default function ApiDocumentation() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="bg-gray-100">

            <Hero />
            <TopNavigation items={items} />

            <main className="flex-1 p-10">

                <Overview />

                <Authentication />

                <SendSms />
                <section
                    id="request"
                    className="mb-32"
                >
                    <h2 className="mb-4 text-3xl font-bold">
                        Request Body
                    </h2>
                </section>

                <section
                    id="response"
                    className="mb-32"
                >
                    <h2 className="mb-4 text-3xl font-bold">
                        Success Response
                    </h2>
                </section>

                <section
                    id="errors"
                    className="mb-32"
                >
                    <h2 className="mb-4 text-3xl font-bold">
                        Error Responses
                    </h2>
                </section>

                <section id="examples" className="mb-32">
                    <h2 className="mb-4 text-3xl font-bold">
                        Code Examples
                    </h2>

                    <p className="text-gray-600">
                        Choose your preferred programming language.
                    </p>

                    <LanguageTabs examples={examples} />
                </section>

            </main>

        </div>
         </AppLayout>
    );
}