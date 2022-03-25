# Gateway

Gateway services are responsible to route all the request from the Client forward it to the Java service for all user related reuqest like login, signup, activity set/get and for the radar information & refelctivity graph plot gateway is interacting with the python service.

**The plot helps us to understand the reflectivity pattern for the given date.**

### Installation

Clone the repository:

```bash
$ git clone git@github.com:airavata-courses/dexlab.git
```

#### Recommended setup

We recommend running Gateway and Frontend with other services of dexlab. This can be done by simply issuing the `docker-compose up --detach` command from the root directory of the project.

#### Running as a standalone docker container

You can spin up Gateway's docker container by running the following docker command:

```bash
$ docker run -d --name gateway -p 3001:3001 kausau/nexrad_gateway_image3
```

#### Running without docker (not recommended)

You need to have node installed on your machine if not then you can use following website for installation

```bash
https://nodejs.org/en/download/
```

After node is installed then checkout on the Gateway branch and run following commands:

```bash
$ npm install
$ node index.js
```

Now your Gateway service is up and running.

### Usage

Gateway provides following endpoints:

Signup:

```bash
$ curl --location --request POST 'http://localhost:3002/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"a@b.com",
    "password":"1234567",
    "name":"Abcxyz"
}'
```

The response will be a JSON of user details:

```
{
    "message": "Success",
    "userid": "150e771f-2388-5e0b-89b3-d0eebc46bcd0",
    "email": "a@b.com"
}
```

Login:

```bash
$ curl --location --request POST 'http://localhost:3001/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"a@b.com",
    "password":"1234567"
}'
```

The response will be a JSON of user details:

```
{
    "message": "Success",
    "userid": "150e771f-2388-5e0b-89b3-d0eebc46bcd0",
    "email": "a@b.com"
}
```

Activity Set

```bash
$ curl --location --request POST 'http://localhost:3002/activity/set' \
--header 'uniqueid: 150e771f-2388-5e0b-89b3-d0eebc46bcd0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date": "2022-02-08",
    "location": "KABR",
    "time": "19:41:19"
}'
```

The response will be a JSON of user details:

```
{
    "message": "Success"
}
```

Activity Get

```bash
$ curl --location --request GET 'http://localhost:3001/activity/get' \
--header 'uniqueid: 4b7c6ac6-94fd-5128-843f-b225f8ab15f6'
```

The response will be a JSON of user details:

```
{
    "data": []
}
```

Radars List

```bash
$ curl --location --request GET 'localhost:3001/radar/get' \
--header 'uniqueid: c0696a04-be8a-5f18-84e2-dcb565dc18c6' \
--header 'date: 2022-01-30'
```

The response will be a JSON of user details:

```
{
    "radars": [
        "FOP1",
        "KABR",
        "KABX",
        "KAMA",
        "KAMX"
    ]
}
```

Refelctivity Plot

```bash
$ curl --location --request POST 'localhost:3001/radar/plot' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date": "2022-02-01",
    "radar": "KAKQ"
}'
```

The response will be binary image data

Sample plot:

![A sample image](https://github.com/airavata-courses/dexlab/raw/ingestor/ingestor/sample_plot.png)

# ORM Service

ORM service is responsible for dealing with the database.We have used 'MARIADB' as the bachend database.
This service is responsible to store the user credentials to authentciate user into the system. Moreover the service allows the users to see their history of actions in the system.



### Installation

Clone the repository:

```bash
$ git clone git@github.com:airavata-courses/dexlab.git
```

#### Recommended setup

We recommend running ORM service with other services of dexlab. This can be done by simply issuing the `docker-compose up` command from the root directory of the project.

#### Running as a standalone docker container

You can spin up ORM's docker container by running the following docker command:

```bash
$ docker run -d --name orm -p 8000:8000 kausau/nexrad_orm_update
```

#### Running without docker (not recommended)

ORM Service needs [JAVA] (https://www.java.com/en/download/manual.jsp) to install and setup dependencies. Hence the first step is to install `JAVA` on your system. 
Second thing is to install [ Maven ] (https://maven.apache.org/download.cgi)

Clone the repository:

```bash
$ git clone git@github.com:airavata-courses/dexlab.git
```
Checkout into ORM Branch:

``` $ git checkout ORM```

Change the application.properties file inside the database/src/main/resources/

Replace the 1st line with : ```spring.datasource.url=jdbc:mysql://localhost:3306/nexrad?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=utf-8&autoReconnect=true&&jdbcCompliantTruncation=false```

change directory in and come inside : dexlab/database

RUN command : ```bash $ mvn clean install```


### Usage

ORM service is build to allow the following operations in the system

#### Add users:



```bash
$ curl --location --request POST 'http://localhost:8000/user/adduser' --header 'Content-Type: application/json' --data-raw '{   "userID" : "123dsasds-sandsadsdms-sasa","email":"a1aa@b.com","password":"1234567","name":"Vishsaswa"}'
```

The response will be a text/Plain

```
Added user: User [UserID=123dsasds-sandsadsdms-sasa, name=Vishsaswa, email=a1aa@b.com]
```

#### Get users:

```bash
$ curl --location --request GET 'http://localhost:8000/user/getuser/123dsasds-sandsadsdms-sasa' --header 'Content-Type: application/json'
```

#### Add activity
```bash
curl --location --request GET 'http://localhost:8000/activity/addactivity/' --header 'Content-Type: application/json' --data-raw '{   "userID" : "123dsasds sandsadsdms-sasa","userLogs" : "{akjsnc:adsacksdc}"}'

```

The response will be a text/Plain 
```
Added activity: UserActivity [userActivityID=8, userLogs={akjsnc:adsacksdc}, user=User [UserID=123dsasds-sandsadsdms-sasa, name=Vishsaswa, email=a1aa@b.com]]
```
#### Get Activity
```bash
curl --location --request GET 'http://localhost:8000/activity/getactivity/123dsasds-sandsadsdms-sasa'
```

The response will be JSON:

```{"userLogs": "{akjsnc:adsacksdc}"}```

