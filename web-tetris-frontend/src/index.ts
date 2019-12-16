
import StateManager from './StateManager';

try {
    console.log('hello');
    StateManager.GetInstance().GoToMainMenu();
}
catch (error) {
    console.error(error);
    console.error("Stop The Game Please!");
}
