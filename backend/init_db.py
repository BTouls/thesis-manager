#!/usr/bin/env python3
import os
from hashlib import sha256
from pymongo import MongoClient
import uuid
import json
# Utility script that runs at a fresh install to create 
# demo data and users in the database


db_connection = MongoClient()
db = db_connection.get_database("thesis-manager")
db_users = db.get_collection("users")
db_projects = db.get_collection("projects")

# create demoadmin
demoadmin = {
	"username" : "demoadmin",
	"school" : "IT",
	"surname" : "Admin",
	"name" : "Admin",
	"roles" : [
		"admin"
	],
	"university" : "Demo University",
	"birthdate" : "1985-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Computer Science",
    "password": str(sha256("demoadmin".encode("utf-8")).hexdigest()),
	"email" : "admin@localhost"
}
db.users.delete_many({"username":"demoadmin"})
print("creating demoadmin user...")
db.users.insert(demoadmin)

# create demoprof
demoprof = {
	"username" : "demoprof",
	"school" : "DEMO",
	"surname" : "Prof",
	"name" : "Prof",
	"roles" : [
		"professor"
	],
	"university" : "Demo University",
	"birthdate" : "1950-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Physics",
    "password": str(sha256("demoprof".encode("utf-8")).hexdigest()),
	"email" : "prof@localhost"
}
db.users.delete_many({"username":"demoprof"})
print("creating demoprof user...")
db.users.insert(demoprof)

# create demostudent
demostudent = {
	"username" : "demostudent",
	"school" : "DEMO",
	"surname" : "Student",
	"name" : "Student",
	"roles" : [
		"student"
	],
	"university" : "Demo University",
	"birthdate" : "1998-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Physics",
    "password": str(sha256("demostudent".encode("utf-8")).hexdigest()),
	"email" : "student@localhost"
}
db.users.delete_many({"username":"demostudent"})
print("creating demostudent user...")
db.users.insert(demostudent)

# create sample data professors, students and projects to playwith 

# create professor jack
prof_jack = {
	"username" : "prof-jack",
	"school" : "DEMO",
	"surname" : "Jack",
	"name" : "Johnsson",
	"roles" : [
		"professor"
	],
	"university" : "Demo University",
	"birthdate" : "1950-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Computer Science",
    "password": str(sha256(os.urandom(6)).hexdigest()),
	"email" : "prof-jack@localhost"
}
db.users.delete_many({"username":"prof-jack"})
print("creating prof-jack user...")
db.users.insert(prof_jack)

# create professor george
prof_george = {
	"username" : "prof-george",
	"school" : "DEMO",
	"surname" : "George",
	"name" : "Johnsson",
	"roles" : [
		"professor"
	],
	"university" : "Demo University",
	"birthdate" : "1950-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Math",
    "password": str(sha256(os.urandom(6)).hexdigest()),
	"email" : "prof-george@localhost"
}
db.users.delete_many({"username":"prof-george"})
print("creating prof-george user...")
db.users.insert(prof_george)

# create professor helen
prof_helen = {
	"username" : "prof-helen",
	"school" : "DEMO",
	"surname" : "Helen",
	"name" : "Johnsson",
	"roles" : [
		"professor"
	],
	"university" : "Demo University",
	"birthdate" : "1950-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Biology",
    "password": str(sha256(os.urandom(6)).hexdigest()),
	"email" : "prof-helen@localhost"
}
db.users.delete_many({"username":"prof-helen"})
print("creating prof-helen user...")
db.users.insert(prof_helen)

# create student-paul
student_paul = {
	"username" : "student-paul",
	"school" : "DEMO",
	"surname" : "Doe",
	"name" : "Paul",
	"roles" : [
		"student"
	],
	"university" : "Demo University",
	"birthdate" : "1998-03-01",
	"id" : str(uuid.uuid1()),
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Physics",
    "password": str(sha256(os.urandom(6)).hexdigest()),
	"email" : "paul@localhost"
}
db.users.delete_many({"username":"student-paul"})
print("creating student-paul user...")
db.users.insert(student_paul)

# create student-anna
anna_uuid =  str(uuid.uuid1())
student_anna = {
	"username" : "student-anna",
	"school" : "DEMO",
	"surname" : "Doe",
	"name" : "Anna",
	"roles" : [
		"student"
	],
	"university" : "Demo University",
	"birthdate" : "1998-03-01",
	"id" : anna_uuid,
	"token" : str(sha256(os.urandom(32)).hexdigest()),
	"department" : "Biology",
    "password": str(sha256(os.urandom(6)).hexdigest()),
	"email" : "anna@localhost"
}
db.users.delete_many({"username":"student-anna"})
print("creating student-anna user...")
db.users.insert(student_anna)

# Create sample unassigned projects
proj_01 = {

	"status" : "unassigned",
	"school" : "Computer Science",
	"nativeAbstract" : "",
	"number_of_students" : "2",
	"title" : "Java Application",
	"required_knowledge_topics" : [
		"programming", "object-oriented", "data-structures"
	],
	"professor" : "prof-jack",
	"tags" : [
		"java",
		"android",
		"programming",
		"ui",
		"mobile"
	],
	"abstract" : "lorem ipsum",
	"id" : "3648b328-78e0-11eb-b986-84a6c898918a",
	"department" : "SoftLab",
	"nativeTitle" : "Java Application",
	"abstractNative" : "lorem ipsum",
	"date" : "2020/11/28",
	"required_courses" : [
		"cs-101",
		"cs-102",
		"math-101"
	],
	"university" : "DEMO"
}

db.projects.delete_many({"id":"3648b328-78e0-11eb-b986-84a6c898918a"})
print("creating Java application project...")
db.projects.insert(proj_01)

proj_02 = {

	"status" : "unassigned",
	"school" : "Math",
	"nativeAbstract" : "",
	"number_of_students" : "2",
	"title" : "Studing Prime Number Patterns in Matlab",
	"required_knowledge_topics" : [
		"matlab", "calculus", "primes"
	],
	"professor" : "prof-george",
	"tags" : [
		"matlab",
		"primes",
		"math"
	],
	"abstract" : "lorem ipsum",
	"id" : "fc2ffb50-0aff-43fb-b21a-d7a927c832fc",
	"department" : "Applied Math",
	"nativeTitle" : "Studing Prime Number Patterns in Matlab",
	"abstractNative" : "lorem ipsum",
	"date" : "2020/11/28",
	"required_courses" : [
		"calculus-101",
		"calculus-202",
		"math-101"
	],
	"university" : "DEMO"
}

db.projects.delete_many({"id":"fc2ffb50-0aff-43fb-b21a-d7a927c832fc"})
print("creating Studing Prime number Patterns project...")
db.projects.insert(proj_02)

proj_03 = {

	"status" : "unassigned",
	"school" : "Helen",
	"nativeAbstract" : "",
	"number_of_students" : "2",
	"title" : "Visualizing cell mitosis",
	"required_knowledge_topics" : [
		"dna", "genetics", "mitosis"
	],
	"professor" : "prof-george",
	"tags" : [
		"genetics",
		"bio",
		"dna"
	],
	"abstract" : "lorem ipsum",
	"id" : "8f993fc9-3542-466d-9416-ce96aee83ce6",
	"department" : "Genetics",
	"nativeTitle" : "Visualizing cell mitosis",
	"abstractNative" : "lorem ipsum",
	"date" : "2020/11/28",
	"required_courses" : [
		"biology-101",
		"genetics-101",
		"math-101"
	],
	"university" : "DEMO",
    "applicants":	[
        {
			"username" : "student-anna",
			"date" : "2020/11/28",
			"id" : anna_uuid,
			"name" : "Doe Anna"
		}
    ]

}

db.projects.delete_many({"id":"8f993fc9-3542-466d-9416-ce96aee83ce6"})
print("creating Cell Mitosis Visualization project...")
db.projects.insert(proj_03)