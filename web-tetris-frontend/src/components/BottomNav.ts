import { GetElementById } from "../util";
import StateManager from "../StateManager";
import MainMenuPage from "../pages/MainMenuPage";
import HowToPlayPage from "../pages/HowToPlayPage";
import SettingsPage from "../pages/SettingsPage";

const RegisterBottomNav = () => {
    class BottomNav extends HTMLElement {

        private howToPlayBtn?: Element;
        private toggleFullScreenBtn?: Element;
        private settingsBtn?: Element;

        constructor() {
            super();
            const t = GetElementById("bottom-nav") as HTMLTemplateElement;

            const c = t.content;
            const temp = document.importNode(c, true);
            this.appendChild(temp);
        }

        public connectedCallback() {
            console.log("bottom-nav init");
            this.howToPlayBtn = this.children[0];
            this.toggleFullScreenBtn = this.children[1];
            this.settingsBtn = this.children[2];

            this.howToPlayBtn.addEventListener("click", this.goToHowToPlay);
            this.toggleFullScreenBtn.addEventListener("click", this.toggleFullScreen);
            this.settingsBtn.addEventListener("click", this.goToSettings);
        }

        public disconnectedCallback() {
            console.log("bottom-nav deinit");
            this.howToPlayBtn!.removeEventListener("click", this.goToHowToPlay);
            this.toggleFullScreenBtn!.removeEventListener("click", this.toggleFullScreen);
            this.settingsBtn!.removeEventListener("click", this.goToSettings);
        }

        private goToHowToPlay = () => {
            console.log("go to how to play");
            StateManager.GetInstance().Push(new HowToPlayPage());
        }

        private toggleFullScreen = () => {
            console.log('toggle full screen');
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        private goToSettings = () => {
            console.log('go to settings');
            StateManager.GetInstance().Push(new SettingsPage());
        }
    }
    window.customElements.define("bottom-nav", BottomNav);
};

export default RegisterBottomNav;
