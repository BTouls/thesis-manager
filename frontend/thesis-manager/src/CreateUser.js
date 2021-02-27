import React from 'react';
import {Link} from "react-router-dom"
import {Formik, Field, Form} from 'formik'
import axios from 'axios';

function CreateUser(){
    return (
        <div className="App">
            <h3>Create New User</h3>
        
        {/* intitate */}
     
        <Formik
      initialValues={{
        username: '',
        password: '',
        name: '',
        surname: '',
        email: '',
        department: '',
        university: '',
        school: '',
        birthdate: '',
        formRole: '',
      }}
      onSubmit={async (values) => {
      
        values["roles"] = [values["formRole"]];
        let input = JSON.stringify(values, null, 2);

        if (window._auth.isLogged()){
          axios.post("http://127.0.0.1:5000/api/users",input,{headers:{'Content-Type':'Application/Json','x-api-key':window._auth.getAccessKey() }});
        }
        
        
        window.history.back()
    }}
    >
      {({ isSubmitting }) => (
        <Form>

          <div className="form-group">
            <label htmlFor="formRole">Role: </label>
             <Field className="form-control" as="select" name="formRole">  
             <option value="student">Student</option>
             <option value="professor">Professor</option>
           </Field>
          </div>
         
                   
          <div className="form-group">
            <label htmlFor="name">First name: </label>
            <Field className="form-control" name="name" placeholder="Jane" />
          </div>
         
          <div className="form-group">
            <label htmlFor="surname">Surname: </label>
            <Field className="form-control" name="surname" placeholder="Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <Field className="form-control" name="username" placeholder="Jane" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <Field type="password" className="form-control" name="password"  />
          </div>


          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <Field className="form-control" name="email" placeholder="jane@acme.com" type="email" />
            <small id="emailHelp" className="form-text text-muted">Please enter a valid academic email</small>
          </div>

          <div className="form-group">
            <label htmlFor="university">University: </label>
            <Field className="form-control" name="university" placeholder="Physics" />
            <small id="universityHelp" className="form-text text-muted">Please enter the full 
            official name of your university</small>
          </div>
          
          
        
          <div className="form-group">
            <label htmlFor="department">Department: </label>
            <Field className="form-control" name="department" placeholder="Physics" />
            <small id="departmentHelp" className="form-text text-muted">Please enter the name 
            of the department in your university that you are a member of</small>
          </div>
          
         
         
         
          <div className="form-group">
            <label htmlFor="school">School: </label>
            <Field className="form-control" name="school" placeholder="Physics" />
            <small id="schoolHelp" className="form-text text-muted">Please enter the name 
            of the school in your university that you are a member of</small>
            
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

export default CreateUser;