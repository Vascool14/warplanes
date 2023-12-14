import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react';
import { Provider } from './Context.tsx';
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  // </StrictMode>
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/src/web-workers/notification.ts')
//     .then(registration => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch(error => {
//       console.error('Service Worker registration failed:', error);
//     });
// }
// else console.log('Service workers are not supported.');

// function askForPermission() {
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//     } else {
//       console.warn('Notification permission denied.');
//     }
//   });
// }
// askForPermission();