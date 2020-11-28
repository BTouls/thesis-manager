from flask import request
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
import uuid
import json
from datetime import datetime
app = Flask(__name__)
CORS(app)

# Here we initialize database stuff 
db_connection = MongoClient()
db = db_connection.get_database("final-project")
db_users = db.get_collection("users")
db_projects = db.get_collection("projects")

# # The following variable store users
# users = [
#     {
#         "id": 1,
#         "username": "billtou",
#         "email": "bill@uot.gr",
#         "name": "Bill",
#         "surname": "Toulias",
#         "birthdate": 1992,
#         "roles": ["student"],
#         "department": "Computer Science",
#         "school": "Engineering",
#         "university": "University of thessaly"
#     },
#     {
#         "id": 2,
#         "username": "iatr",
#         "email": "iatrelis@uot.gr",
#         "name": "Omiros",
#         "surname": "Iatrelis",
#         "birthdate": 1970,
#         "roles": ["professor"],
#         "department": "Computer Science",
#         "school": "Engineering",
#         "university": "University of thessaly"
#     }
# ]

# The following variable stores projects
# projects = [
#     {
#         "id": 1,
#         "title": "Web application for managing academic projects",
#         "native_title": "Ylopoihsh efarmoghs gia akadimaikes ergasies",
#         "abstract": "A summary description of project",
#         "abstract_native": "Syntomh perilipsi thematos",
#         "professor": "Iatrelis",
#         "university": "University of Thessaly",
#         "school": "Engineering",
#         "department": "Computer Science",
#         "tags": ["Computers", "Web", "Applications"],
#         "number_of_students": 1,
#         "assigned_on": ["Bill Toulias"],
#         "status": "preparation",
#         "required_courses" : ["CS 101", "CS 102", "Web applications"],
#         "required_knowledge_topics": ["programming", "python", "http", "databases"],
#         "date": "20/10/2020"
#     },
#     {
#         "id": 2,
#         "title": "Agro Sensor project with arduino",
#         "native_title": "Ylopoihsh efarmoghs arduino",
#         "abstract": "A summary description of project",
#         "abstract_native": "Syntomh perilipsi thematos",
#         "professor": "Ventsas",
#         "university": "University of Thessaly",
#         "school": "Engineering",
#         "department": "Electronics",
#         "tags": ["Programming", "Electronics", "Sensors"],
#         "number_of_students": 2,
#         "assigned_on": [],
#         "status": "unassigned",
#         "required_courses" : ["Electronics 101", "C", "Math 101"],
#         "required_knowledge_topics": ["programming", "c", "arduino", "circuits"],
#         "date": "15/10/2020"
#     }
# ]

# API CALLS to handle projects
# ----------------------------

@app.route("/api/projects", methods=["POST"])
def create_project():
    # we use a special request object given by flask library which 
    # contains data that come along with the post request

    project_new = request.json
    # user_new has the information given for the new user to be created
    # however we will override the "id" field and assign automatically
    # a uuid generate by python's uuid system library
    project_new["id"] = str(uuid.uuid1())

    db_projects.insert_one(project_new)
    return '{"message": "project with id: ' + project_new["id"] + ' created succesfully"}'
    


@app.route("/api/projects")
def get_projects():
    projects = []

    results = db_projects.find({},{"_id":0})

    for result in results:
        projects.append(result)

    return json.dumps(projects, indent=4)

@app.route("/api/projects/<pid>")
def get_project_by_id(pid):
    projects = []
    
    results = db_projects.find({"id":pid},{"_id":0})

    for result in results:
        projects.append(result)

    return json.dumps(projects, indent=4)

@app.route("/api/projects/<pid>/apply/<uid>", methods=["POST"])
def apply_for_project(pid, uid):
    
    project =  db_projects.find_one({"id":pid},{"_id":0})
    user = db_users.find_one({"id":uid},{"_id":0})

    # if no project found return error message
    if project is None:
        return json.dumps({'message':'No project found!'},indent=4),404
    # if no such user found return error message
    if user is None:
        return json.dumps({'message':'No user found!'},indent=4),404

    # if project found but has not status unassigned it means
    # that the project is assigned so we cannot apply for that 
    # thus return an error message
    if project["status"] != "unassigned":
         return json.dumps({'message':'Project is already assigned: ' + project["status"] },indent=4),409


    # add a new field to the project named applicants which is a list
    # with students interested to apply for the specific project
    applicant = {}
    applicant["id"] = user["id"]
    applicant["username"] = user["username"]
    applicant["name"] = user["name"] + " " + user ["surname"]
    applicant["date"] = datetime.today().strftime("%Y/%m/%d")
    if "applicants" not in project:
        project["applicants"] = [applicant]
    else:
        project["applicants"].append(applicant)

    result = db_projects.replace_one({"id":pid},project)
    if result.modified_count > 0: 
        return '{"message":"Application succesfull for project"}'
    else:
        return '{"message":"Application failed for project"}'

    


@app.route("/api/projects/<pid>", methods=["PUT"])
def update_project_by_id(pid):
    project_update = request.json
    # ensure that the user's uuid remains the same as before
    project_update["id"] = pid
    result = db_projects.replace_one({"id":pid},project_update)
    if result.modified_count > 0: 
        return '{"message":"Project updated succesfully"}'
    else:
        return '{"message":"Nothing to update"}'

@app.route("/api/projects/<pid>", methods=["DELETE"])
def delete_project_by_id(pid):

    result = db_projects.delete_one({"id":pid})
    if result.deleted_count > 0: 
        return '{"message":"Project deleted succesfully"}'
    else:
        return '{"message":"Nothing to delete"}'

# @app.route("/api/projects/by_professor/<pname>")
# def get_project_by_professor(pname):

#     for project in projects:
#         if pname.lower() == project["professor"].lower():
#             return json.dumps(project, indent=4)
    
#     return json.dumps({})        
    

# API CALLS to handle users
# -------------------------

@app.route("/api/users")
def get_users():
    # now we will return users directly from the database instead
    # of using a local variable with lists
    users = []
    results = db_users.find({},{"_id":0})

    for result in results:
        users.append(result)

    return json.dumps(users, indent=4)

@app.route("/api/users", methods=["POST"])
def create_user():
    # we use a special request object given by flask library which 
    # contains data that come along with the post request

    user_new = request.json
    # user_new has the information given for the new user to be created
    # however we will override the "id" field and assign automatically
    # a uuid generate by python's uuid system library
    user_new["id"] = str(uuid.uuid1())

    db_users.insert_one(user_new)
    return '{"message": "user with id: ' + user_new["id"] + ' created succesfully"}'

@app.route("/api/users/<uid>")
def get_user_by_id(uid):
    # now we will return a user by it's id directly from the database instead
    # of using a local variable with lists
    users = []

    results = db_users.find({"id":uid},{"_id":0})

    for result in results:
        users.append(result)

    return json.dumps(users, indent=4)

@app.route("/api/users/<uid>", methods=["PUT"])
def update_user_by_id(uid):
    user_update = request.json
    # ensure that the user's uuid remains the same as before
    user_update["id"] = uid
    result = db_users.replace_one({"id":uid},user_update)
    if result.modified_count > 0: 
        return '{"message":"User updated succesfully"}'
    else:
        return '{"message":"Nothing to update"}'

@app.route("/api/users/<uid>", methods=["DELETE"])
def delete_user_by_id(uid):

    result = db_users.delete_one({"id":uid})
    if result.deleted_count > 0: 
        return '{"message":"User deleted succesfully"}'
    else:
        return '{"message":"Nothing to delete"}'




# # very dangerous operation delete all users
# # will be removed later
# @app.route("/api/users", methods=["DELETE"])
# def delete_all_users():
#     result = db_users.delete_many({})
#     if result.deleted_count > 0: 
#         return '{"message":"All users deleted!"}'
#     else:
#         return '{"message":"Nothing to delete"}'