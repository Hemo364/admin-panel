import { createRoot } from 'react-dom/client'
import './index.css'
import App from './LastProject/App.jsx'
import { BrowserRouter } from 'react-router'

const Root = document.getElementById('root')
createRoot(Root).render(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
)