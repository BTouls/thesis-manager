import React from 'react';
import {Link} from "react-router-dom"
import {Formik, Field, Form} from 'formik'
import axios from 'axios';
import Auth from './authenticate';

function Login(){

    window._auth = Auth;

    return (
        <div className="App login-form">
            <h3>Login</h3>
        
        {/* intitate */}
     
        <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
      
        
        window._auth.doLogin(values["username"],values["password"]) 
       
        window.location = "http://localhost:3000/projects"
    }}
    >
      {({ isSubmitting }) => (
        <Form>

         
                   
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <Field className="form-control" name="username"  />
          </div>
         
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <Field type="password" className="form-control" name="password"  />
          </div>

         
         
          <button className="btn btn-success" type="submit" disabled={isSubmitting}>
            Login
          </button>
          
        </Form>
      )}
    </Formik>
     
     
                
           
        </div>
    )
}

export default Login;