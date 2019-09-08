/**
 * Returns true if event has 'start.date' property, which means it will be all day event
 * @param event
 * @returns {*}
 */
export function checkIfAllDay(event) {
    return event.start.date
}

/**
 * Returns appropriate caption, depends how many days left to event
 * @param dateString
 * @returns {string}
 */
export function countDays(dateString) {
    let today = new Date();
    let date = new Date(dateString);
    let difference_In_Time = date.getTime() - today.getTime();
    let difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    if (difference_In_Days < 1) {
        if (today.getDay() === date.getDay()) {
            return "It is today!"
        } else {
            return "It will be tomorrow"
        }

    } else if (difference_In_Days >= 1 && difference_In_Days < 2) {
        if (today.getDay() === (date.getDay() - 1)) {
            return "It will be tomorrow"
        } else {
            return `in ${Math.ceil(difference_In_Days)} days`
        }
    } else if (difference_In_Days >= 2) {
        if (today.getDay() === date.getDay() - Math.floor(difference_In_Days)) {
            return `in ${Math.floor(difference_In_Days)} days`
        } else {
            return `in ${Math.ceil(difference_In_Days)} days`
        }
    } else {
        return "That already happened... I'm lost..."
    }
}


