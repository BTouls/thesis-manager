from flask import Flask
import json
app = Flask(__name__)


# The following variable store users
users = [
    {
        "id": 1,
        "username": "billtou",
        "email": "bill@uot.gr",
        "name": "Bill",
        "surname": "Toulias",
        "birthdate": 1992,
        "roles": ["student"],
        "department": "Computer Science",
        "school": "Engineering",
        "university": "University of thessaly"
    },
    {
        "id": 2,
        "username": "iatr",
        "email": "iatrelis@uot.gr",
        "name": "Omiros",
        "surname": "Iatrelis",
        "birthdate": 1970,
        "roles": ["professor"],
        "department": "Computer Science",
        "school": "Engineering",
        "university": "University of thessaly"
    }
]

# The following variable stores projects
projects = [
    {
        "id": 1,
        "title": "Web application for managing academic projects",
        "native_title": "Ylopoihsh efarmoghs gia akadimaikes ergasies",
        "abstract": "A summary description of project",
        "abstract_native": "Syntomh perilipsi thematos",
        "professor": "Iatrelis",
        "university": "University of Thessaly",
        "school": "Engineering",
        "department": "Computer Science",
        "tags": ["Computers", "Web", "Applications"],
        "number_of_students": 1,
        "assigned_on": ["Bill Toulias"],
        "status": "preparation",
        "required_courses" : ["CS 101", "CS 102", "Web applications"],
        "required_knowledge_topics": ["programming", "python", "http", "databases"],
        "date": "20/10/2020"
    },
    {
        "id": 2,
        "title": "Agro Sensor project with arduino",
        "native_title": "Ylopoihsh efarmoghs arduino",
        "abstract": "A summary description of project",
        "abstract_native": "Syntomh perilipsi thematos",
        "professor": "Ventsas",
        "university": "University of Thessaly",
        "school": "Engineering",
        "department": "Electronics",
        "tags": ["Programming", "Electronics", "Sensors"],
        "number_of_students": 2,
        "assigned_on": [],
        "status": "unassigned",
        "required_courses" : ["Electronics 101", "C", "Math 101"],
        "required_knowledge_topics": ["programming", "c", "arduino", "circuits"],
        "date": "15/10/2020"
    }
]



@app.route("/api/projects")
def get_projects():
    return json.dumps(projects, indent=4)

@app.route("/api/projects/by_id/<pid>")
def get_project_by_id(pid):
    pid = int(pid)
    for project in projects:
        if pid == project["id"]:
            return json.dumps(project, indent=4)
    
    return json.dumps({})

@app.route("/api/projects/by_professor/<pname>")
def get_project_by_professor(pname):

    for project in projects:
        if pname.lower() == project["professor"].lower():
            return json.dumps(project, indent=4)
    
    return json.dumps({})        
    

@app.route("/api/users")
def get_users():
    return json.dumps(users, indent=4)
