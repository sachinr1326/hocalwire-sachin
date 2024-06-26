import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom' 
import Productdetail from './components/Product/Productdetail';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './services/Auth_context';
import Login from './components/Login/Login';
import RouterComp from './RouterComp';
function App() {
  return (
   <Router>
    <AuthProvider>
    <RouterComp/>
      <ToastContainer style={{zIndex:10000}} />
      </AuthProvider>
   </Router>
  );
}

export default App;
