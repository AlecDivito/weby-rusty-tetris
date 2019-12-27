import { GetElementById } from "../util";
import StateManager from "../StateManager";
import MainMenuPage from "../pages/MainMenuPage";

const RegisterTopNav = () => {
    class TopNav extends HTMLElement {

        private backBtn?: Element;
        private homeBtn?: Element;

        constructor() {
            super();
            const t = GetElementById("top-nav") as HTMLTemplateElement;

            const c = t.content;
            const temp = document.importNode(c, true);
            this.appendChild(temp);
        }

        public connectedCallback() {
            console.log("top-nav init");
            this.backBtn = this.children[0];
            this.homeBtn = this.children[2];

            this.backBtn.addEventListener("click", this.goBack);
            this.homeBtn.addEventListener("click", this.goHome);
        }

        public disconnectedCallback() {
            console.log("top-nav deinit");
            this.backBtn!.addEventListener("click", this.goBack);
            this.homeBtn!.addEventListener("click", this.goHome);
        }

        private goBack = () => {
            console.log('goback');
            StateManager.GetInstance().Pop();
        }

        private goHome = () => {
            console.log('go home');
            StateManager.GetInstance().ClearAndPush(new MainMenuPage());
        }
    }
    window.customElements.define("top-nav", TopNav);
};

export default RegisterTopNav;
