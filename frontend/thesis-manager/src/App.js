import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import { useHistory } from "react-router-dom"
import Projects from './Projects'
import Users from './Users'
import About from './About'
import CreateUser from './CreateUser';
import CreateProject from './CreateProject'
import Login from './Login'
import Auth from './authenticate'

function App() {

  

  function handleClick(){
    window._auth.doLogout()
    window.location = "http://localhost:3000/login"
  }

  window._auth = Auth;

  let logged = "Please login"
  let loginfo = <span className="navbar-text" style={{color:"lightyellow", textDecoration:"underline"}}>
    <Link to="/login">{logged}</Link>
    </span> 
  if (window._auth.isLogged() === true) {
    logged = window._auth.getUsername();
    loginfo = <span className="navbar-text" style={{color:"lightyellow", textDecoration:"underline"}}>{logged} 
    <button id ="logout" 
     onClick={handleClick}
    className="ml-2">Log out</button>
    </span> 
  }

 return (
   <Router >
   <div>
     <nav className="navbar">
       <span className="nav-title">Thesis Manager</span> 
       <Link to="/projects">Projects</Link>
       <Link to="/users">Users</Link>
       <Link to="/about">About</Link>
       {loginfo}
     </nav>
     <Switch>
     <Route path="/login">
         <Login/>
       </Route>
       <Route path="/projects">
         <Projects/>
       </Route>
       <Route path="/users">
         <Users/>
       </Route>
       <Route path="/create_user">
         <CreateUser/>
       </Route>
       <Route path="/create_project">
         <CreateProject/>
       </Route>
       <Route path="/about">
         <About />
       </Route>
     </Switch>
   
   </div>
   </Router>
 )
}

export default App;
