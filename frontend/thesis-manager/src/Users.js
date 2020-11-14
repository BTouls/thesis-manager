import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Users(){

    const [data, setData] = useState([])

    useEffect( async () => {
      
      const result = await axios("http://127.0.0.1:5000/api/users");
  
      setData(result.data);
    
    });
  
    let users = [];
    for (let item of data) {
      users.push(
        <User username={item.username}
          name={item.name}
          surname={item.surname} 
          school={item.school}
          university={item.university}
          roles={item.roles}
          />
      )
    }
  
    return (
      <div className="App">
      <h2>Available Users:</h2>
        <div>
          {users}  
        </div>
      </div>
    );
  }
  
  function Roles(props){
    let roleIcons = []
    for (let role of props.roles) {
      if (role === "student"){
        roleIcons.push(<span className="role-icon">🎓</span>);
      }
      if (role === "professor"){
        roleIcons.push(<span className="role-icon">👨‍🏫</span>);
      }
    }

    return (<span>{roleIcons}</span>)
  }
  
  function User(props){
    return (
      <div className="Project">
        <h3><Roles roles={props.roles}/> {props.username}</h3>
        <hr/>
        <strong>full name: </strong>{props.name} {props.surname}
        <br />
        <strong>university: </strong>{props.university}
        <br/>
        <strong>school: </strong>{props.school}
        
      </div>
    )
}

export default Users