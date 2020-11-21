import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Projects(){

    const [data, setData] = useState([])

    useEffect( async () => {
      
      const result = await axios("http://127.0.0.1:5000/api/projects");
  
      setData(result.data);
    
    },[]);
  
    let projects = [];
    for (let item of data) {
      projects.push(
        <Project 
          key = {item.id}
          title={item.title}
          description={item.abstract}
          professor={item.professor} 
          dep={item.department}
          date={item.date}
          university={item.university}
          tags = {item.tags}
          lessons = {item.required_courses}
          />
      )
    }
  
    return (
      <div className="App">
      <h3>Available projects:</h3>
      
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
          <div className="date"><code>{props.date}</code></div>
          <h3>📚 {props.title}</h3>
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
          <strong>required lessons: </strong><Required lessons={props.lessons} />
        </div>
        
        <div className="card-footer">
          <Tags tags={props.tags} />
        </div>
        
        
        
        
      </div>
    )
}

export default Projects