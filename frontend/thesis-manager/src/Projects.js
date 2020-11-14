import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Projects(){

    const [data, setData] = useState([])

    useEffect( async () => {
      
      const result = await axios("http://127.0.0.1:5000/api/projects");
  
      setData(result.data);
    
    });
  
    let projects = [];
    for (let item of data) {
      projects.push(
        <Project title={item.title}
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
      <h2>Available projects:</h2>
        <div>
          {projects}  
        </div>
      </div>
    );
  }
  
  function Tags(props){
    let tags = []
  
    for (let item of props.tags){
      tags.push(<span className="tag">{item}</span>)
    }
  
    return (<div className="tag-holder">{tags}</div>)
  }
  
  function Required(props){
    let less = []
  
    for (let item of props.lessons){
      less.push(<span className="lesson">{item}</span>)
    }
  
    return (<span>{less}</span>)
  }
  
  function Project(props){
    return (
      <div className="Project">
        <div className="date"><span>{props.date}</span></div>
        <h3>📚 {props.title}</h3>
        <hr/>
        <strong>Description:</strong>
        <p>{props.description}</p>
        <strong>professor: </strong>{props.professor}
        <br />
        <strong>university: </strong>{props.university}
        <br/>
        <strong>department: </strong>{props.dep}
        <br/>
        <strong>required lessons: </strong><Required lessons={props.lessons} />
        <hr/>
      
        <Tags tags={props.tags} />
        
      </div>
    )
}

export default Projects