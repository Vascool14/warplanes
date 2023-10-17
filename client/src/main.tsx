import ReactDOM from 'react-dom/client'
import { Provider } from './Context.tsx';
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>,
)
