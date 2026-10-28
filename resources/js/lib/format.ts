export function formatMobile(number?: string | null): string {
    if (!number) return '';

    const digits = number.replace(/\D/g, '');

    if (digits.length === 11) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
    }

    return number;
}

export function formatDateTime(date?: string | null): string {
    if (!date) return '-';

    return new Intl.DateTimeFormat('en-PH', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Manila',
    }).format(new Date(date));
}