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
} catch (error) {
    console.error(error);
    console.error("Stop The Game Please!");
}
