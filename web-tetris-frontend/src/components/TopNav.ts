import { GetElementById } from "../util";

const RegisterTopNav = () => {
    class TopNav extends HTMLElement {
        constructor() {
            super();
            const t = GetElementById("top-nav") as HTMLTemplateElement;
            const c = t.content;
            const temp = document.importNode(c, true);
            this.appendChild(temp);
        }
    }
    window.customElements.define("top-nav", TopNav);
};

export default RegisterTopNav;
