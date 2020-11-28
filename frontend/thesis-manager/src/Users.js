import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"


function handleDelete(props) {
 
 
  let answer = window.confirm("are you sure you wanna delete user: " + props.username + " ?");
  if (answer === true) {
    // do some stuff to actually delete the item from api
   

    
    console.log("to be deleted...")
    axios.delete("http://127.0.0.1:5000/api/users/"+props.id).then(res =>
    {
      alert(res.data["message"]);
      window.location.reload();
    });
    
    
  }

  // or else we dont need to do anything at all
}

function Users(){


 

    const [data, setData] = useState([])

    useEffect( () => {
      
      async function getData(){
        const result = await axios("http://127.0.0.1:5000/api/users");
        setData(result.data);
      }

      getData();
    
    },[]);



  
    let users = [];
    for (let item of data) {
      users.push(
        <User 
          id = {item.id}
          key={item.id}
          username={item.username}
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
      <div className="row mb-2">
        <div className="col-6"><h3>Available Users:</h3></div>
        <div className="col-6 text-right"><Link className="btn btn-success" to="/create_user">Create New User</Link>  </div>
      </div>
        <div>
          {users}  
        </div>
      </div>
    );
  }
  
  function Roles(props){
    let roleIcons = []
    for (let role of props.roles) {
      // This needs to be changed to only student
      if (role === "student" || role === "students"){
        roleIcons.push(<span key={role} className="role-icon">🎓</span>);
      }
      if (role === "professor"){
        roleIcons.push(<span key={role} className="role-icon">👨‍🏫</span>);
      }
    }

    return (<span>{roleIcons}</span>)
  }
  
  function User(props){
    return (
      <div className="card mb-5">
        <div className="card-header">
          <div className="row">
            <div className="col-10">
            <h3><Roles roles={props.roles}/> {props.username}</h3>
            </div>
            <div className="col-2 text-right">
              <button className="btn btn-danger" onClick={() => {handleDelete(props)}}>Delete</button>
            </div>
          </div>
       
       
        </div>
        <div className="card-body">
        <strong>full name: </strong>{props.name} {props.surname}
        <br />
        <strong>university: </strong>{props.university}
        <br/>
        <strong>school: </strong>{props.school}
        </div>
      </div>
    )
}

export default Users