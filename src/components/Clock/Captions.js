/**
 * Class Caption
 * Based on defined events chooses appropriate caption and counts down time to event
 */
export class Captions {
    /**
     * Caption constructor
     * @param {number} hour
     * @param {number} minutes
     */
    constructor(hour, minutes) {
        this.hour = hour;
        this.minutes = minutes;
    }

    events = {
        /**
         * Defines custom events and time of events as hour: {number}, minutes: {number}
         * It is important that names of event must be the same as names of captions (below)
         */
        startWork: {hour: 9, minutes: 0},
        morning: {hour: 12, minutes: 0},
        breakTime: {hour: 13, minutes: 0},
        endWork: {hour: 15, minutes: 0},
        freeTime: {hour: 0, minutes: 0}
    };

    /**
     * Chooses event based on event time parameter and indicated boundaries for event
     * @returns {string} event name
     */
    defineEventName() {
        if (8 <= this.hour && this.hour < 9) {
            return 'startWork'
        } else if (9 <= this.hour && this.hour < 12) {
            return 'morning'
        } else if (12 <= this.hour && this.hour < 13) {
            return 'breakTime'
        } else if (13 <= this.hour && this.hour < 15) {
            return 'endWork'
        } else {
            return 'freeTime'
        }
    }

    /**
     * Counts down to event
     * @param eventName
     * @returns {string} remaining time
     */
    countRemainingTime(eventName) {
        // minutes in hour
        const MIN_IN_H = 60;

        // formats object and event time parameters into minutes
        let nowTimeInMinutes = this.hour * MIN_IN_H + this.minutes;
        let targetTimeInMinutes = this.events[eventName].hour * MIN_IN_H + this.events[eventName].minutes;

        // subtracts two times
        let remainingTime = targetTimeInMinutes - nowTimeInMinutes;

        // re-format into hours and minutes
        let remainingHours = Math.floor(remainingTime / MIN_IN_H);
        let remainingMinutes = remainingTime % MIN_IN_H;
        return remainingHours > 0 ? `${remainingHours} hour(s) and ${remainingMinutes} minute(s)` : `${remainingMinutes} minute(s)`
    }

    /**
     * Defines captions for event
     * @returns {string} caption with remaining time (or not)
     */
    static getCaption(eventName, remainingTime) {
        let captions = {
            startWork: `We are starting soon!. ${remainingTime} left to 09:00`,
            morning: `Welcome CodeCoolers!. Only ${remainingTime} left to break!`,
            breakTime: `Eat fast! Only ${remainingTime} left to end of dinner!`,
            endWork: `Almost done! Only ${remainingTime} left to the end of torment!`,
            freeTime: "If you want to look at me - pay me overtime!",
        };
        return captions[eventName]
    }

    /**
     * gets caption and remaining time based on event
     * @returns {string} custom sentence
     */
    getCurrentCaption() {
        let event = this.defineEventName();
        let remainingTime = this.countRemainingTime(event);
        return Captions.getCaption(event, remainingTime)
    }

}
