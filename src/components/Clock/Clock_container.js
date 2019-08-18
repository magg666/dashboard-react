export function formatTime(hour, minutes, seconds) {
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    return hour + ':' + minutes + ':' + seconds
}
export class Captions {
    constructor(hour, minutes) {
        this.hour = hour;
        this.minutes = minutes;
        this.remainingTime = "";
        this.eventName = ""
    }

    events = {
        startWork: {hour: 9, minutes: 0},
        morning: {hour: 12, minutes: 0},
        breakTime: {hour: 13, minutes: 0},
        endWork: {hour: 15, minutes: 0},
        freeTime: {hour: 0, minutes: 0}
    };

    getCaption() {
        let captions = {
            startWork: `We are starting soon!. ${this.remainingTime} left to 09:00`,
            morning: `Welcome CodeCoolers!. Only ${this.remainingTime} left to break!`,
            breakTime: `Eat fast! Only ${this.remainingTime} left to end of dinner!`,
            endWork: `Almost done! Only ${this.remainingTime} left to the end of torment!`,
            freeTime: "If you want to look at me - pay me overtime!",
        };
        return captions[this.eventName]
    }

    setEventName() {
        if (8 <= this.hour && this.hour < 9) {
            this.eventName = 'startWork'
        } else if (9 <= this.hour && this.hour < 12) {
            this.eventName = 'morning'
        } else if (12 <= this.hour && this.hour < 13) {
            this.eventName = 'breakTime'
        } else if (13 <= this.hour && this.hour < 15) {
            this.eventName = 'endWork'
        } else {
            this.eventName = 'freeTime'
        }
    }

    setRemainingTime() {
        let nowTimeInMinutes = this.hour * 60 + this.minutes;
        let targetTimeInMinutes = this.events[this.eventName].hour * 60 + this.events[this.eventName].minutes;
        let remainingTime = targetTimeInMinutes - nowTimeInMinutes;

        let remainingHours = Math.floor(remainingTime / 60);
        let remainingMinutes = remainingTime % 60;

        this.remainingTime = remainingHours > 0 ? `${remainingHours} hour(s) and ${remainingMinutes} minute(s)` : `${remainingMinutes} minute(s)`
    }

    getCurrentCaption() {
        this.setEventName();
        this.setRemainingTime();
        return this.getCaption()
    }

}
