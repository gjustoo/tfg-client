import Cookies from 'js-cookie';
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AddButton from './components/AddButton';
import LogIn from './components/LogIn';
import Menu from './components/Menu';
import MiniMenu from './components/MiniMenu';
import PostLayout from './components/PostLayout';
import Profile from './components/Profile';
import Register from './components/Register';
import './styles.css';
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<LogIn />} />
        <Route path="/home" element={<React.Fragment><Menu /> <AddButton /> <PrivateRouteHome /></React.Fragment>} />
        <Route path="/add" element={<React.Fragment><Menu /> <MiniMenu /> <PrivateRouteHome /></React.Fragment>} />
        <Route exact path='/profile' element={<React.Fragment><Menu /><Profile /></React.Fragment>} />
      </Routes>
    </Router>
  );
}

export default App;

function PrivateRoute({ component: Component }) {
  const isLogged = Cookies.get("user_logged");
  return isLogged ? <Component /> : <Navigate to="/login" />;
}

function PrivateRouteHome() {
  const isLogged = Cookies.get("user_logged");
  const username = Cookies.get("user_name");
  const isoDate = new Date().toISOString()
  const date = new Date();
  const isoDateMinusMonth= new Date(date.getFullYear(), date.getMonth() - 1, 1);

  
  console.log(isoDate.substring(0,isoDate.indexOf("T")+6));
  const fullUrl = "http://localhost:20000/post/feed/" + username + "?end="+isoDate+"&start="+isoDateMinusMonth.toISOString()+"&update="
  console.log(fullUrl);
  return isLogged ? <PostLayout url={fullUrl} small={false} update={true} /> : <Navigate to="/login" />;
}