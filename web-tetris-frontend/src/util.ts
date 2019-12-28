export function GetElementById(id: string): HTMLElement {
    const temp = document.getElementById(id);
    if (temp == null) {
        throw new Error(`Div element [${id}] must exist for game to work!`);
    }
    return temp;
}

export function randomInteger(max: number, min: number = 0) {
    return Math.floor(Math.random() * Math.floor(max)) + Math.floor(min);
}

export function sanitizeId(id: string) {
    return id.replace(" ", "_").toLocaleLowerCase();
}

export default function toHHMMSS(time: number) {
    time = Math.floor(time);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);
    let timeString = "";

    if (hours > 0) {
        timeString += (hours < 10) ? `0${hours}:` : `${hours}:`;
    }
    timeString += (minutes < 10) ? `0${minutes}:` : `${minutes}:`;
    timeString += (seconds < 10) ? `0${seconds}` : `${seconds}`;

    return timeString;
}
