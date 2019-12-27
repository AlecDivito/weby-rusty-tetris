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
