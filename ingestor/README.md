# Ingestor

Ingestor is responsible for getting the data from Nexrad's S3 bucket and generating a plot from. The service is a HTTP server and exposes two endpoints which can be used to get radar availability and reflectivity plots for a given date.

**The plot helps us to understand the reflectivity pattern for the given date.**

## Getting Started

## Prerequisites

### Installation

Clone the repository:

```bash
$ git clone git@github.com:airavata-courses/dexlab.git
```

#### Recommended setup

We recommend running Ingestor with other services of dexlab. This can be done by simply issuing the `docker-compose up` command from the root directory of the project.

#### Running as a standalone docker container

You can spin up Ingestor's docker container by running the following docker command:

```bash
$ docker run -d --name ingestor -p 5000:5000 sbmthakur/ingestor
```

#### Running without docker (not recommended)

Ingestor needs [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html) to install and setup dependencies. Hence the first step is to install `conda` on your system. Initialize the environment once `conda` is installed on the system:

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

Ingestor provides two endpoints: one for the available radars on the given date and the other one for the plot 

Radars:

```bash
$ curl 'http://localhost:5000/radars' -X POST --data-raw $'{\n"date": "2022-01-01"\n}'
```

The response will be a JSON array of radar IDs available on the given day:

```
{"radars":["KABR","KABX","KAKQ","KAMA","KAMX","KAPX","KARX","KATX","KBBX","KBGM","KBHX","KBIS","KBLX","KBMX","KBOX","KBRO","KBUF","KBYX","KCAE","KCBW","KCBX","KCCX","KCLE","KCLX","KCRP","KCXX","KCYS","KDAX","KDDC","KDFX","KDGX","KDIX","KDLH","KDMX","KDOX","KDTX","KDVN","KDYX","KEAX","KEMX","KEOX","KEPZ","KESX","KEVX","KEWX","KEYX","KFCX","KFDR","KFDX","KFFC","KFSD","KFSX","KFTG","KFWS","KGGW","KGJX","KGLD","KGRB","KGRK","KGRR","KGSP","KGWX","KGYX","KHDX","KHGX","KHNX","KHPX","KHTX","KICT","KICX","KILN","KILX","KIND","KINX","KIWA","KIWX","KJAX","KJGX","KJKL","KLBB","KLCH","KLGX","KLIX","KLNX","KLOT","KLRX","KLSX","KLTX","KLVX","KLWX","KLZK","KMAF","KMAX","KMBX","KMHX","KMKX","KMLB","KMOB","KMPX","KMQT","KMRX","KMSX","KMTX","KMUX","KMVX","KMXX","KNKX","KNQA","KOAX","KOHX","KOKX","KOTX","KPAH","KPBZ","KPDT","KPOE","KPUX","KRAX","KRGX","KRIW","KRLX","KRTX","KSFX","KSGF","KSHV","KSJT","KSOX","KSRX","KTBW","KTFX","KTLH","KTLX","KTWX","KTYX","KUDX","KUEX","KVAX","KVBX","KVNX","KVTX","KVWX","KYUX","PABC","PACG","PAEC","PAHG","PAIH","PAKC","PAPD","PGUA","PHKI","PHKM","PHMO","PHWA","RKJK","RKSG","RODN","TADW","TATL","TBNA","TBOS","TBWI","TCLT","TCMH","TCVG","TDAL","TDAY","TDCA","TDEN","TDFW","TDTW","TEWR","TFLL","THOU","TIAD","TIAH","TICH","TIDS","TJFK","TLAS","TLVE","TMCI","TMCO","TMEM","TMKE","TMSP","TMSY","TOKC","TORD","TPBI","TPHL","TPHX","TPIT","TRDU","TSDF","TSLC","TSTL","TTPA","TTUL"]}
```

```bash
$ curl 'http://localhost:5000/plot' -X POST --data-raw $'{\n"date": "2022-01-01",\n"radar": "KAMA"\n}'
```

The response will be an image of the plot(displaying reflectivity) in PNG format. The value for response header `Content-Type` will be `image/png`.

Sample plot:

![A sample image](./sample_plot.png)
