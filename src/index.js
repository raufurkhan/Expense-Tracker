import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from '../src/components/store/auth-context';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';
 import '../node_modules/bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <AuthContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
     </AuthContextProvider>);
