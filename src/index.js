import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';
import './index.css'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(<App />);
