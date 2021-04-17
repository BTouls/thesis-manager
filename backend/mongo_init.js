// Initialize thesis-manager database
db = new Mongo().getDB("thesis-manager");

// Initialize users collection in thesis-manager database;
db.createCollection('users', { capped: false });

// Initialize projects collection in thesis-manager database;
db.createCollection('projects', { capped: false });


// Initialize demo data for users
db.users.insert(
    [
        {
          "username": "demoadmin",
          "school": "IT",
          "surname": "Admin",
          "name": "Admin",
          "roles": [
            "admin"
          ],
          "university": "Demo University",
          "birthdate": "1985-03-01",
          "id": "00cd4aec-9ab9-11eb-8dd7-84a6c898918a",
          "token": "a3e19ddf4cb6912fbcb132f7917043ee59221bc82b1f03a66db11a03d961eb9f",
          "department": "Computer Science",
          "password": "53016290e37b085a2feebeded49ce3b78f7a737ede2ff8c27a3787cfe7eaebf5",
          "email": "admin@localhost"
        },
        {
          "username": "demoprof",
          "school": "DEMO",
          "surname": "Prof",
          "name": "Prof",
          "roles": [
            "professor"
          ],
          "university": "Demo University",
          "birthdate": "1950-03-01",
          "id": "00cd4aed-9ab9-11eb-8dd7-84a6c898918a",
          "token": "1591a359d927da2a877494eeebca4af3794bea1ebb5cf7b1c3de1f655e90d53d",
          "department": "Physics",
          "password": "1e39758d7c447f2274f5c229472cebcd523f796b7d24ffc81fe8fdbd2d4958bc",
          "email": "prof@localhost"
        },
        {
          "username": "demostudent",
          "school": "DEMO",
          "surname": "Student",
          "name": "Student",
          "roles": [
            "student"
          ],
          "university": "Demo University",
          "birthdate": "1998-03-01",
          "id": "00cd4aee-9ab9-11eb-8dd7-84a6c898918a",
          "token": "73cff7132c68f5ec7e0e9282aa0d543d19b729b76a8c1ee08b6f83b129e2125d",
          "department": "Physics",
          "password": "f05b1d22c0a3bd63435185290a10bbfcc038939befd4b41481970f159e2e8569",
          "email": "student@localhost"
        },
        {
          "username": "prof-jack",
          "school": "DEMO",
          "surname": "Jack",
          "name": "Johnsson",
          "roles": [
            "professor"
          ],
          "university": "Demo University",
          "birthdate": "1950-03-01",
          "id": "00cd4aef-9ab9-11eb-8dd7-84a6c898918a",
          "token": "cc828b5453a6ed2bceb5c26683ac892906d4ee26d7b98ea92501ef058b6eaf70",
          "department": "Computer Science",
          "password": "ffd703b585ed3f89d81fdb6fa17803003860fdec2534e86b3910193b041cc892",
          "email": "prof-jack@localhost"
        },
        {
          "username": "prof-george",
          "school": "DEMO",
          "surname": "George",
          "name": "Johnsson",
          "roles": [
            "professor"
          ],
          "university": "Demo University",
          "birthdate": "1950-03-01",
          "id": "00cd4af0-9ab9-11eb-8dd7-84a6c898918a",
          "token": "492470c06bd0a04b92c4fc1541fd2b1916bb71ecd03a0d7143996123b6dc6fcc",
          "department": "Math",
          "password": "d02d4f5f9f10f82185c67b807df250e3021565094392471c840e09cd6c70c0bf",
          "email": "prof-george@localhost"
        },
        {
          "username": "prof-helen",
          "school": "DEMO",
          "surname": "Helen",
          "name": "Johnsson",
          "roles": [
            "professor"
          ],
          "university": "Demo University",
          "birthdate": "1950-03-01",
          "id": "00cd4af1-9ab9-11eb-8dd7-84a6c898918a",
          "token": "baa09a41ce303e920f0d89477f74352fa42a9efd3dba852d2b16088ffbe759c8",
          "department": "Biology",
          "password": "ff963a90264af4144dd6741963f6bb23433136bef5c5d2bd7c2276ffef4e860f",
          "email": "prof-helen@localhost"
        },
        {
          "username": "student-paul",
          "school": "DEMO",
          "surname": "Doe",
          "name": "Paul",
          "roles": [
            "student"
          ],
          "university": "Demo University",
          "birthdate": "1998-03-01",
          "id": "00cd4af2-9ab9-11eb-8dd7-84a6c898918a",
          "token": "8c0a57641fcbb6cbe4b723b1aff6f4d37fe0087437d7a1186a336b39136ad4aa",
          "department": "Physics",
          "password": "e0a7f7a1f84e7349e16214fdc83c9ce8e34bd6271e34802c3a50dd3198e596f0",
          "email": "paul@localhost"
        },
        {
          "username": "student-anna",
          "school": "DEMO",
          "surname": "Doe",
          "name": "Anna",
          "roles": [
            "student"
          ],
          "university": "Demo University",
          "birthdate": "1998-03-01",
          "id": "00cd4af3-9ab9-11eb-8dd7-84a6c898918a",
          "token": "33cc4e225566dc305942e0b66c7f9ea9526fd3c90388d16dd66f078d96154d9f",
          "department": "Biology",
          "password": "5764f245fe2ad10958c69c0c613956d0b4b9675c1208a83be09096db003bf9dd",
          "email": "anna@localhost"
        }
      ]
)

// Initialize demo data for projects
db.projects.insert(
    [
        {
          "status": "unassigned",
          "school": "Computer Science",
          "nativeAbstract": "",
          "number_of_students": "2",
          "title": "Java Application",
          "required_knowledge_topics": [
            "programming",
            "object-oriented",
            "data-structures"
          ],
          "professor": "prof-jack",
          "tags": [
            "java",
            "android",
            "programming",
            "ui",
            "mobile"
          ],
          "abstract": "lorem ipsum",
          "id": "3648b328-78e0-11eb-b986-84a6c898918a",
          "department": "SoftLab",
          "nativeTitle": "Java Application",
          "abstractNative": "lorem ipsum",
          "date": "2020/11/28",
          "required_courses": [
            "cs-101",
            "cs-102",
            "math-101"
          ],
          "university": "DEMO"
        },
        {
          "status": "unassigned",
          "school": "Math",
          "nativeAbstract": "",
          "number_of_students": "2",
          "title": "Studing Prime Number Patterns in Matlab",
          "required_knowledge_topics": [
            "matlab",
            "calculus",
            "primes"
          ],
          "professor": "prof-george",
          "tags": [
            "matlab",
            "primes",
            "math"
          ],
          "abstract": "lorem ipsum",
          "id": "fc2ffb50-0aff-43fb-b21a-d7a927c832fc",
          "department": "Applied Math",
          "nativeTitle": "Studing Prime Number Patterns in Matlab",
          "abstractNative": "lorem ipsum",
          "date": "2020/11/28",
          "required_courses": [
            "calculus-101",
            "calculus-202",
            "math-101"
          ],
          "university": "DEMO"
        },
        {
          "status": "unassigned",
          "school": "Helen",
          "nativeAbstract": "",
          "number_of_students": "2",
          "title": "Visualizing cell mitosis",
          "required_knowledge_topics": [
            "dna",
            "genetics",
            "mitosis"
          ],
          "professor": "prof-george",
          "tags": [
            "genetics",
            "bio",
            "dna"
          ],
          "abstract": "lorem ipsum",
          "id": "8f993fc9-3542-466d-9416-ce96aee83ce6",
          "department": "Genetics",
          "nativeTitle": "Visualizing cell mitosis",
          "abstractNative": "lorem ipsum",
          "date": "2020/11/28",
          "required_courses": [
            "biology-101",
            "genetics-101",
            "math-101"
          ],
          "university": "DEMO",
          "applicants": [
            {
              "username": "student-anna",
              "date": "2020/11/28",
              "id": "00cd4af3-9ab9-11eb-8dd7-84a6c898918a",
              "name": "Doe Anna"
            }
          ]
        }
      ]
)