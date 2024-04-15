// Import necessary modules
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

// Use createRoot to render your application
createRoot(document.getElementById('root')).render(<App />);
