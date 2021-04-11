
import os
from hashlib import sha256
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
db = db_connection.get_database("thesis-manager")
db_users = db.get_collection("users")
db_projects = db.get_collection("projects")

def authenticate(headers):
    token = headers.get("x-api-key")
    
    if token is None or token == "":
        return (None, None)
    
    user = db_users.find_one({"token":token},{"_id":0})

    
    if user == None:
        return (None, None)

    return (user["username"], user["roles"][0])


# API CALLS to handle auth
# ------------------------

# API CALLS to handle projects
# ----------------------------
@app.route("/api/auth", methods=["POST"])
def auth():
    auth_details = request.json 
    username = auth_details["username"]
    password = auth_details["password"]
    password_hash = sha256(password).hexdigest()

    # Find if a user with that username and that password_hash exists in database

    user = db_users.find_one({"username":username, "password":password_hash})
    if user == None:
        return json.dumps({'message':'Unauthorized: wrong username/password!'},indent=4),401

    return json.dumps({'token':user["token"]},indent=4), 200

@app.route("/api/profile")
def get_profile():
    username, role = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    token = request.headers.get("x-api-key")

    user = db_users.find_one({"username":username, "token":token},{"_id":0,"id":0,"password":0,"token":0})
    if user == None:
        return json.dumps({'message': 'error: cannot find user profile'},indent=4),404
    
    # remove token and password has info from user dictionary
   
    return json.dumps({'profile':user},indent=4),200



@app.route("/api/projects", methods=["POST"])
def create_project():

    username, role = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role == "student":
        return json.dumps({"message":"forbidden"}), 403
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
  
    username, _ = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    
    projects = []

    results = db_projects.find({},{"_id":0})

    for result in results:
        projects.append(result)

    return json.dumps(projects, indent=4)

@app.route("/api/projects/<pid>")
def get_project_by_id(pid):

    username, _ = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    
    projects = []
    
    results = db_projects.find({"id":pid},{"_id":0})

    for result in results:
        projects.append(result)

    return json.dumps(projects, indent=4)

@app.route("/api/projects/<pid>/apply", methods=["POST"])
def apply_for_project(pid):

    username, role = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role != "student":
        return json.dumps({"message":"forbidden"}), 403

    
    project =  db_projects.find_one({"id":pid},{"_id":0})
    user = db_users.find_one({"username":username},{"_id":0})

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

    username, role = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role == "student":
        return json.dumps({"message":"forbidden"}), 403


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

    username, role = authenticate(request.headers)
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role == "student":
        return json.dumps({"message":"forbidden"}), 403

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

    # read the access token given with the request
    username, role = authenticate(request.headers)
    
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role != "admin":
        return json.dumps({"message":"forbidden"}), 403
   

    users = []
    results = db_users.find({},{"_id":0})

    for result in results:
        users.append(result)

    return json.dumps(users, indent=4)

@app.route("/api/users", methods=["POST"])
def create_user():
    # we use a special request object given by flask library which 
    # contains data that come along with the post request

    # read the access token given with the request
    username, role = authenticate(request.headers)
    
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role != "admin":
        return json.dumps({"message":"forbidden"}), 403

    user_new = request.json
    # user_new has the information given for the new user to be created
    # however we will override the "id" field and assign automatically
    # a uuid generate by python's uuid system library
    user_new["id"] = str(uuid.uuid1())
    # crypto to generate a secure random access token
    h = sha256()
    h.update(os.urandom(32))
    aux = str(h.hexdigest())
    user_new["token"] = aux
    user_new["password"] = sha256(user_new["password"]).hexdigest()

    db_users.insert_one(user_new)
    return '{"message": "user with id: ' + user_new["id"] + ' created succesfully"}'

@app.route("/api/users/<uid>")
def get_user_by_id(uid):
    # now we will return a user by it's id directly from the database instead
    # of using a local variable with lists

    # read the access token given with the request
    username, role = authenticate(request.headers)
    
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role != "admin":
        return json.dumps({"message":"forbidden"}), 403

    users = []

    results = db_users.find({"id":uid},{"_id":0})

    for result in results:
        users.append(result)

    return json.dumps(users, indent=4)

@app.route("/api/users/<uid>", methods=["PUT"])
def update_user_by_id(uid):

    # read the access token given with the request
    username, role = authenticate(request.headers)
    
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role != "admin":
        return json.dumps({"message":"forbidden"}), 403

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

    # read the access token given with the request
    username, role = authenticate(request.headers)
    
    if username == None:
        return json.dumps({"message":"unauthorized"}), 401
    if role != "admin":
        return json.dumps({"message":"forbidden"}), 403

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