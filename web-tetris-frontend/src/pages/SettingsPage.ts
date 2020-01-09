import Page from "./Page";
import { Settings } from "../models/Settings";
import { GetElementById } from "../util";

export default class SettingsPage extends Page {

    private settings?: Settings;

    private checkboxes: NodeListOf<HTMLInputElement>;
    private sliders: NodeListOf<HTMLInputElement>;

    private musicVolumeLabel: HTMLElement;
    private soundVolumeLabel: HTMLElement;

    constructor() {
        super("settings-page");
        const parent = GetElementById("settings-page");
        this.checkboxes = parent.querySelectorAll("input[type=checkbox]");
        this.sliders = parent.querySelectorAll("input[type=range]");

        this.checkboxes.forEach((box) =>
            box.addEventListener("click", this.checkboxClicked));

        this.sliders.forEach((slider) => {
            slider.addEventListener("input", this.sliderChanged);
            slider.addEventListener("change", this.sliderUpdated);
        });

        this.musicVolumeLabel = GetElementById("settings-music-volume");
        this.soundVolumeLabel = GetElementById("settings-sound-volume");
    }

    public async show(): Promise<boolean> {
        this.settings = await Settings.GetSettings();
        // set checkboxes
        this.checkboxes.forEach((box) => box.checked = (this.settings as any)[box.name]);
        // set slider
        this.sliders.forEach((slider) => slider.value = (this.settings as any)[slider.name]);
        // set text
        this.musicVolumeLabel.textContent = `${this.settings.musicVolume}`;
        this.soundVolumeLabel.textContent = `${this.settings.soundVolume}`;
        return super.show();
    }

    public destroy() {
        super.destroy();
        this.checkboxes.forEach((box) =>
            box.removeEventListener("click", this.checkboxClicked));

        this.sliders.forEach((slider) => {
            slider.removeEventListener("input", this.sliderChanged);
            slider.removeEventListener("change", this.sliderUpdated);
        });
    }

    private checkboxClicked = async (event: any) => {
        const {name, checked} = event.target;
        await this.updateProperty(name, checked);
    }

    private sliderUpdated = async (event: any) => {
        const {name, value} = event.target;
        this.sliderChanged(event);
        await this.updateProperty(name, Number(value));
    }

    private sliderChanged = (event: any) => {
        const {name, value} = event.target;
        console.assert(this.settings, "settings must be initialized before call");
        switch (name) {
            case "musicVolume":
                this.musicVolumeLabel.textContent = `${value}`;
                break;
            case "soundVolume":
                this.soundVolumeLabel.textContent = `${value}`;
                break;
            default:
                console.error(`slider name is the wrong value ${name}`);
                break;
        }
    }

    private async updateProperty(property: string, value: boolean | number) {
        console.assert(this.settings, "settings must be initialized before call");
        if (Object.getOwnPropertyNames(this.settings!).includes(property)) {
            (this.settings! as any)[property] = value;
            await this.settings!.save();
        }
    }
}
