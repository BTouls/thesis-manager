function initialize() {

   let p = document.getElementById("projects")
   
   fetch("http://127.0.0.1:5000/api/projects").
   then(r => {return r.json()}).
   then(data => {
      for (item of data) {
         let res = document.createElement("li")
         res.appendChild(document.createTextNode(item["title"] + " - " + item["professor"]))
         p.appendChild(res)
      }   
   })

}



document.addEventListener("DOMContentLoaded",initialize,false)