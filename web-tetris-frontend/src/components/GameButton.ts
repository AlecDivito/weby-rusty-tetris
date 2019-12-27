import { GetElementById } from "../util";

const RegisterGameButton = () => {
    class GameButton extends HTMLElement {
        constructor() {
            super();
            const t = GetElementById("game-btn") as HTMLTemplateElement;
            const c = t.content;
            const temp = document.importNode(c, true);
            this.appendChild(temp);
        }
    }
    window.customElements.define("game-btn", GameButton);
};

export default RegisterGameButton;
