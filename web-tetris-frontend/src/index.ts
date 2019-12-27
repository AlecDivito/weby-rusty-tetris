import StateManager from "./StateManager";
import RegisterTopNav from "./components/TopNav";
import RegisterGameButton from "./components/GameButton";
import RegisterBottomNav from "./components/BottomNav";
import MainMenuPage from "./pages/MainMenuPage";

try {
    RegisterTopNav();
    RegisterGameButton();
    RegisterBottomNav();
    StateManager.GetInstance().Push(new MainMenuPage());

    const list = document.querySelectorAll("game-btn") as NodeListOf<HTMLButtonElement>;
    list.forEach((btn: HTMLButtonElement) => {
        btn.addEventListener("click", buttonSelector);
    });
} catch (error) {
    console.error(error);
    console.error("Stop The Game Please!");
}

function buttonSelector(event: MouseEvent) {
    document.querySelectorAll("game-btn").forEach( (btn) => {
        btn.classList.remove("selected");
    });
    const self = event.target as HTMLButtonElement;
    self.classList.add("selected");
}
