import React from 'react';

function About(){

    if (window._auth.isLogged() !== true){
        window.location = "http://localhost:3000/login"
        return
      
    }

    
    return (
        <div className="App">
            <h3>About thesis manager</h3>
            <p>
                This is a web application created for manager thesis in universities
                This was done for my own thesis project.

                

            </p>
           
        </div>
    )
}

export default About;