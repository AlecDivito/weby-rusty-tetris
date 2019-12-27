import StateManager from "./StateManager";
import RegisterTopNav from "./components/TopNav";
import RegisterGameButton from "./components/GameButton";
import MainMenuPage from "./pages/MainMenuPage";

try {
    RegisterTopNav();
    RegisterGameButton();
    StateManager.GetInstance().Push(new MainMenuPage());
} catch (error) {
    console.error(error);
    console.error("Stop The Game Please!");
}
