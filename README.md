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

ORM Service needs [JAVA] (https://www.java.com/en/download/manual.jsp) to install and setup dependencies. Hence the first step is to install `JAVA` on your system. 
Second thing is to install [ Maven ] (https://maven.apache.org/download.cgi)




Initialize the environment once `conda` is installed on the system:

```bash
$ cd ingestor # Switch to the ingestor directory
$ conda env create -f environment.yml
```

This will create an environment called `pyart_env`. Once the environment is created successfully, we need to activate the environment:

```bash
$ conda activate pyart_env
```

We can now start the flask app:

```bash
$ FLASK_APP=server.py flask run
```

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





