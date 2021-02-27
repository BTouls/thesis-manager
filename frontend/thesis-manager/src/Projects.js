import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


function handleDelete(props) {
 
  let answer = window.confirm("are you sure you wanna delete project: " + props.title + " ?");
  if (answer === true) {
    // do some stuff to actually delete the item from api
      
    console.log("to be deleted...")
    console.log(props)
    if (window._auth.isLogged()){
    axios.delete("http://127.0.0.1:5000/api/projects/"+props.id,
    {
      headers: {'x-api-key':window._auth.getAccessKey()}
    }).then(res =>
    {
      alert(res.data["message"]);
      window.location.reload();
    });
    } 
  }
  // or else we dont need to do anything at all
}

function Projects(){

    const [data, setData] = useState([])

    useEffect( () => {

      async function getData(){
        if (window._auth.isLogged()){

          const result = await axios.get("http://127.0.0.1:5000/api/projects",{
            headers: {'x-api-key':window._auth.getAccessKey()}
          });
          setData(result.data);
        }
        
      }
      
      getData();
      
    
    },[]);
  
    let projects = [];
    for (let item of data) {
      projects.push(
        <Project 
          key = {item.id}
          id = {item.id}
          title={item.title}
          description={item.abstract}
          professor={item.professor} 
          dep={item.department}
          date={item.date}
          university={item.university}
          tags = {item.tags}
          lessons = {item.required_courses}
          topics = {item.required_knowledge_topics}
          status = {item.status}
          />
      )
    }
  
    return (
      <div className="App">
       <div className="row mb-2">
        <div className="col-6"><h3>Available Projects:</h3></div>
        <div className="col-6 text-right"><Link className="btn btn-success" to="/create_project">Create New Project</Link>  </div>
      </div>
      
        <div>
          {projects}  
        </div>
      </div>
    );
  }
  
  function Tags(props){
    let tags = []
  
    for (let item of props.tags){
      tags.push(<span key={item} className="badge badge-success mr-2">{item}</span>)
    }
  
    return (<h5>{tags}</h5>)
  }
  
  function Required(props){
    if (props.lessons === undefined) return null
    let less = []
  
    for (let item of props.lessons){
      less.push(<span key={item} className="badge badge-secondary mr-2">{item}</span>)
    }
  
    return (<span>{less}</span>)
  }
  
  function Project(props){
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="row">
            <div className="col-10">
              <div className="date"><code>{props.date}</code></div>
              <h3>📚 {props.title}</h3>
            </div>
            <div className="col-2 text-right">
            <button className="btn btn-danger" onClick={() => {handleDelete(props)}}>Delete</button>

            </div>

          </div>
         
        </div>

        <div className="card-body">
          <strong>Description:</strong>
          <p>{props.description}</p>
          <strong>professor: </strong>{props.professor}
          <br />
          <strong>university: </strong>{props.university}
          <br/>
          <strong>department: </strong>{props.dep}
          <br/>
          <strong>required lessons: </strong><Required lessons={props.lessons} /><br/>
          <strong>required topics: </strong><Required lessons={props.topics} />
          <hr/>
          <strong>Status: </strong><span>{props.status}</span>
        </div>
        
        <div className="card-footer">
          <Tags tags={props.tags} />
        </div>
        
        
        
        
      </div>
    )
}

export default Projects