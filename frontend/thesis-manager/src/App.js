import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Projects from './Projects'
import Users from './Users'
import About from './About'
import CreateUser from './CreateUser';

function App() {

 return (
   <Router>
   <div>
     <nav className="navbar">
       <span className="nav-title">Thesis Manager</span> 
       <Link to="/projects">Projects</Link>
       <Link to="/users">Users</Link>
       <Link to="/about">About</Link>
     </nav>
     <Switch>
       <Route path="/projects">
         <Projects/>
       </Route>
       <Route path="/users">
         <Users/>
       </Route>
       <Route path="/create_user">
         <CreateUser/>
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
