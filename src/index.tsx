import { createRoot } from 'react-dom/client';
import { ProfileView } from './main';
import './index.css'

// @ts-ignore
if (window.Telegram?.WebApp) {
// @ts-ignore
    window.Telegram.WebApp.ready();  // Сообщаем, что WebApp готов
// @ts-ignore
    window.Telegram.WebApp.expand(); // Делаем окно по всей высоте
}

const container = document.querySelector('#root') as Element;
const root = createRoot(container);

root.render(<ProfileView />);
