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
        firstName: '',
        surnameame: '',
        email: '',
        department: '',
        university: '',
        birthdate: ''
      }}
      onSubmit={async (values) => {
      
        values["roles"] = ["student"];
        let input = JSON.stringify(values, null, 2);
        
        axios.post("http://127.0.0.1:5000/api/users",input,{headers:{'Content-Type':'Application/Json'}});
        window.history.back()
    }}
    >
      {({ isSubmitting }) => (
        <Form>
        <label htmlFor="username">Username: </label>
          <Field name="username" placeholder="Jane" />
         <br/>
          <label htmlFor="firstName">First Name: </label>
          <Field name="firstName" placeholder="Jane" />
          <br/>
          <label htmlFor="surname">Surname: </label>
          <Field name="surname" placeholder="Doe" />
          <br/>
          <label htmlFor="department">Department: </label>
          <Field name="department" placeholder="Physics" />
          <br/>
          <label htmlFor="email">Email: </label>
          <Field name="email" placeholder="jane@acme.com" type="email" />
          <br/>
          <label htmlFor="school">School: </label>
          <Field name="school" placeholder="Physics" />
          <br/>
          <label htmlFor="university">University: </label>
          <Field name="university" placeholder="Physics" />
          <br/>
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
     
     <br/>
                <Link className="btn btn-secondary" to="/users">Back</Link>
           
        </div>
    )
}

export default CreateUser;