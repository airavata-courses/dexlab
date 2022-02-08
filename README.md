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
