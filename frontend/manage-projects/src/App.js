
import './App.css';
import React, {Component} from 'react';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      "projects": [],
      "users": []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/api/projects")
    .then(r => {return r.json()})
    .then(data => {
      this.setState({"projects":data})
    })

    fetch("http://127.0.0.1:5000/api/users")
    .then(r => {return r.json()})
    .then(data => {
      this.setState({"users":data})
    })
  }

  render(){
   let projectList = []
   

   for (let project of this.state["projects"]) {
  
    projectList.push(
      <div className="project" key={project[["uuid"]]}>
        <h2>📓{project["title"]}</h2>
        <strong>date:</strong> <code>{project["date"]}</code><br/>
        <hr/>
        <strong>professor:</strong> {project["professor"]}<br/>
        <strong>abstract:</strong> {project["abstract"]}<br/>
        <strong>school:</strong> {project["school"]}<br/>
        <strong>department:</strong> {project["department"]}<br/>
        <strong>number of students:</strong> {project["number_of_students"]}<br/>
      </div>
    )
   }

    let userList =[]
  
  for (let user of this.state["users"]) {
    userList.push(
      <div className="user" key={user[["uuid"]]}>
        <h2>👤{user["username"]}</h2>
        <em>name:</em> {user["name"]}<br/>
        <em>surname:</em> {user["surname"]}<br/>
        <em>school:</em> {user["school"]}<br/>
        <em>university:</em> {user["university"]}<br/>
      </div>
    )

  
   }


  return (
    <div>
     <h1>Welcome to Manage Projects Application</h1>
     <p>below is the list of the available projects:</p>
     {projectList}
     <p>below is the list of the available users:</p>
     {userList}
    </div>
  );
  }
}

export default App;
