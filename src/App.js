import logo from './logo.svg';
import './App.css';
import './styles/Login.css'
import './styles/navbar.css'
import './styles/profile.css'
import './styles/Home.css'
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import {BrowserRouter as Routes,Route,} from 'react-router-dom' 
import AuthContextProvider  from './context/auth';
function App() {
  return (
    <AuthContextProvider>
      <AppRouter/>
    </AuthContextProvider>
  );
}

export default App;
