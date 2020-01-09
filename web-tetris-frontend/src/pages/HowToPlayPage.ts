import Page from "./Page";
import { GetElementById } from "../util";

export default class HowToPlayPage extends Page {

    private generalBtn: HTMLButtonElement;
    private phoneBtn: HTMLButtonElement;
    private desktopBtn: HTMLButtonElement;

    private general: HTMLDivElement;
    private phone: HTMLDivElement;
    private desktop: HTMLDivElement;

    constructor() {
        super("how-to-play-page");

        this.generalBtn = GetElementById("how-to-play-general-btn") as HTMLButtonElement;
        this.phoneBtn = GetElementById("how-to-play-phone-btn") as HTMLButtonElement;
        this.desktopBtn = GetElementById("how-to-play-desktop-btn") as HTMLButtonElement;

        this.generalBtn.addEventListener("click", this.generalBtnClicked);
        this.phoneBtn.addEventListener("click", this.phoneBtnClicked);
        this.desktopBtn.addEventListener("click", this.desktopBtnClicked);

        this.general = GetElementById("htp-general") as HTMLDivElement;
        this.phone = GetElementById("htp-phone") as HTMLDivElement;
        this.desktop = GetElementById("htp-desktop") as HTMLDivElement;
    }

    public show(): Promise<boolean> {
        this.generalBtn.classList.add("selected");
        this.generalBtnClicked();
        return super.show();
    }

    public hide() {
        return super.hide();
    }

    private generalBtnClicked = () => {
        this.general.style.display = "block";
        this.desktop.style.display = "none";
        this.phone.style.display = "none";
    }

    private phoneBtnClicked = () => {
        this.phone.style.display = "block";
        this.general.style.display = "none";
        this.desktop.style.display = "none";
    }

    private desktopBtnClicked = () => {
        this.desktop.style.display = "block";
        this.phone.style.display = "none";
        this.general.style.display = "none";
    }

}
