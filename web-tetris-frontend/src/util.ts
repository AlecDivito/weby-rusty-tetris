export function GetElementById(id: string): HTMLElement {
    const temp = document.getElementById(id);
    if (temp === null) {
        throw new Error(`Div element [${id}] must exist for game to work!`);
    }
    return temp;
}

export function GetChildElement(parent: HTMLElement, selector: string): HTMLElement {
    const temp = parent.querySelector<HTMLElement>(selector);
    if (temp === null) {
        throw new Error(`child element [${selector}] of #${parent.id} must exist for game to work!`);
    }
    return temp!;
}

export function ClearAllHTMLChildren(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export function randomInteger(max: number, min: number = 0) {
    return Math.floor(Math.random() * Math.floor(max)) + Math.floor(min);
}

export function sanitizeId(id: string) {
    return id.replace(" ", "_").toLocaleLowerCase();
}

export function toHHMMSS(time: number) {
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

export function uuid() {
    const temp: any = [1e7];
    // eslint-disable-next-line
    return (temp + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
        // eslint-disable-next-line
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}