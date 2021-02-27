import axios from 'axios';


let Auth = {

    isLogged: function(){

        let key = localStorage.getItem("tm_app_access_key")
        let user = localStorage.getItem("tm_app_access_user")

        if (key != null && user != null) {
            return true
        }
        return false
    },

    getUsername: function() {
        return localStorage.getItem("tm_app_access_user")
    },

    getAccessKey: function() {
        return localStorage.getItem("tm_app_access_key")
    },

    doLogin: function(username,password) {
        let postData = {'username':username, 'password':password}
        let input = JSON.stringify(postData, null, 2);
        axios.post("http://127.0.0.1:5000/api/auth",input,{headers:{'Content-Type':'Application/Json'}}).then(resp => {
            if (resp.status === 200) {
                let user = username;
                let key = resp.data["token"]
                localStorage.setItem("tm_app_access_user",user)
                localStorage.setItem("tm_app_access_key",key)
                
            } else {
                localStorage.removeItem("tm_app_access_user")
                localStorage.removeItem("tm_app_access_key")
            }
           

        })

    }, 

    doLogout: function() {
        localStorage.removeItem("tm_app_access_user")
        localStorage.removeItem("tm_app_access_key")
    }


}


export default Auth;
