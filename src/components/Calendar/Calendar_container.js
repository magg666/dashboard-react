export function checkIfAllDay(event) {
    return event.start.date
}

export function formatShortTime(dateString) {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

export function formatCalendarDate(dateString) {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date)
}