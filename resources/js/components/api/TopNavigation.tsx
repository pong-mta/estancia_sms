interface TopNavigationProps {
    items: {
        id: string;
        title: string;
    }[];
}

export default function TopNavigation({
    items,
}: TopNavigationProps) {
    return (
        <div className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
            <div className="overflow-x-auto">
                <nav className="flex min-w-max gap-2 px-6 py-3">
                    {items.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                            {item.title}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}