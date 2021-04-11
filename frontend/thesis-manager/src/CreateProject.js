import React from 'react';
import {Link} from "react-router-dom";
import {Formik, Field, Form} from 'formik';
import axios from 'axios';

function CreateProject(){
    return (
        <div className="App">
            <h3>Create New Project</h3>
        
        {/* intitate */}
     
        <Formik
      initialValues={{
        date: '',
        professor: '',
        university: '',
        school: '',
        department: '',
        numberOfStudents: '',
        title: '',
        nativeTitle: '',
        abstract: '',
        nativeAbstract: '',
        requiredCourses: '',
        tags: '',
        requiredKnowledgeTopics: '',
      
      }}
      onSubmit={async (values) => {
      
        // make a copy of values to second variable valuesModif to make some changes 
        // before sending the data to the backend api
        let valuesModif = values;

        // In second variable we need to modify some data
        // We need to turn the strings of tags, requiredCourses and requiredKnowledgeTopics
        // to lists. This is by calling the method split on each string with the argument
        // of ',' comma. Each string that has words separated with comma is automatically
        // turned into an array
        valuesModif["required_courses"] = valuesModif.requiredCourses.split(",").map(item => item.trim())
        valuesModif.tags = valuesModif.tags.split(",").map(item => item.trim())
        valuesModif["required_knowledge_topics"] = valuesModif.requiredKnowledgeTopics.split(",").map(item => item.trim())
        valuesModif["number_of_students"] = valuesModif.numberOfStudents;
        valuesModif["status"] = "unassigned";

        // delete camelCase fields we don't need to send them to the backend
        delete valuesModif.requiredKnowledgeTopics;
        delete valuesModif.requiredCourses;
        delete valuesModif.numberOfStudents;

        let input = JSON.stringify(valuesModif, null, 2);
        if (window._auth.isLogged()){
        axios.post("http://127.0.0.1:5000/api/projects",input,
        {headers:{'Content-Type':'Application/Json','x-api-key':window._auth.getAccessKey()}});
        
        }
        window.history.back()
    }}
    >
      {({ isSubmitting }) => (
        <Form>

          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <Field className="form-control" name="date" placeholder="YYYY/MM/DD" />
          </div>

          
                   
          <div className="form-group">
            <label htmlFor="professor">Professor: </label>
            <Field className="form-control" name="professor" placeholder="Jane" />
          </div>

          <div className="form-group">
            <label htmlFor="university">University: </label>
            <Field className="form-control" name="university" placeholder="" />
            <small id="universityHelp" className="form-text text-muted">Please enter the full 
            official name of the university</small>
          </div>


          <div className="form-group">
            <label htmlFor="school">School: </label>
            <Field className="form-control" name="school" placeholder="" />
            <small id="schoolHelp" className="form-text text-muted">Please enter the name 
            of the school</small>
            
          </div>

          <div className="form-group">
            <label htmlFor="department">Department: </label>
            <Field className="form-control" name="department" placeholder="" />
            <small id="departmentHelp" className="form-text text-muted">Please enter the name 
            of the department</small>
          </div>

           <div className="form-group">
            <label htmlFor="numberOfStudents">Number of students: </label>
            <Field className="form-control" name="numberOfStudents" placeholder="1" />
            <small id="numberOfStudentsHelp" className="form-text text-muted">Number of students for this project</small>
          </div>    
        
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <Field className="form-control" name="title" placeholder="" />
            <small id="titleHelp" className="form-text text-muted">Please enter the title of the thesis
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="nativeTitle">Native Title: </label>
            <Field className="form-control" name="nativeTitle" placeholder="" />
            <small id="nativeTitleHelp" className="form-text text-muted">Please enter the title of the thesis
            in your native language</small>
          </div>

               
          <div className="form-group">
            <label htmlFor="abstract">Abstract: </label>
            <Field className="form-control" name="abstract" placeholder="" as="textarea" rows="5" />
            <small id="abstractHelp" className="form-text text-muted">Please enter the abstract of the thesis
            </small>
          </div> 


          <div className="form-group">
            <label htmlFor="abstractNative">Native Abstract: </label>
            <Field className="form-control" name="abstractNative" placeholder="" as="textarea" rows="5" />
            <small id="abstractNativeHelp" className="form-text text-muted">Please enter the abstract of the thesis
            in your native language</small>
          </div>

          <div className="form-group">
            <label htmlFor="requiredCourses">Required Courses: </label>
            <Field className="form-control" name="requiredCourses" placeholder="" />
            <small id="requiredCoursesHelp" className="form-text text-muted">Please enter the required courses as a comma separated list</small>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags: </label>
            <Field className="form-control" name="tags" placeholder="" />
            <small id="tagsHelp" className="form-text text-muted">Please enter tags as a comma separated list</small>
          </div>  

          <div className="form-group">
            <label htmlFor="requiredKnowledgeTopics">Required Knowledge Topics: </label>
            <Field className="form-control" name="requiredKnowledgeTopics" placeholder="" />
            <small id="requiredKnowledgeTopicsHelp" className="form-text text-muted">Please enter tags as a comma separated list</small>
          </div>  
          
         
         
         
         
        
         
          
         
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <Link className="btn btn-secondary ml-3" to="/users">Back</Link>
        </Form>
      )}
    </Formik>
     
     
                
           
        </div>
    )
}

export default CreateProject;