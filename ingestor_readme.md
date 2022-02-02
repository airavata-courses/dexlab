
```bash
$ docker run -d --name ingestor -p 5000:5000 sbmthakur/ingestor
```

Radars:

```bash
$ curl 'http://localhost:5000/radars' -X POST --data-raw $'{\n"date": "2021-12-04"\n}'
```

The response will be a JSON array of radar IDs available on the given day:

```
{"radars":["KABR","KABX","KAKQ","KAMA","KAMX","KAPX","KARX","KATX","KBBX","KBGM","KBHX","KBIS","KBLX","KBMX","KBOX","KBRO","KBUF","KBYX","KCAE","KCBW","KCBX","KCCX","KCLE","KCLX","KCRP","KCXX","KCYS","KDAX","KDDC","KDFX","KDGX","KDIX","KDLH","KDMX","KDOX","KDTX","KDVN","KDYX","KEAX","KEMX","KEOX","KEPZ","KESX","KEVX","KEWX","KEYX","KFCX","KFDR","KFDX","KFFC","KFSD","KFSX","KFTG","KFWS","KGGW","KGJX","KGLD","KGRB","KGRK","KGRR","KGSP","KGWX","KGYX","KHDX","KHGX","KHNX","KHPX","KHTX","KICT","KICX","KILN","KILX","KIND","KINX","KIWA","KIWX","KJAX","KJGX","KJKL","KLBB","KLCH","KLGX","KLIX","KLNX","KLOT","KLRX","KLSX","KLTX","KLVX","KLWX","KLZK","KMAF","KMAX","KMBX","KMHX","KMKX","KMLB","KMOB","KMPX","KMQT","KMRX","KMSX","KMTX","KMUX","KMVX","KMXX","KNKX","KNQA","KOAX","KOHX","KOKX","KOTX","KPAH","KPBZ","KPDT","KPOE","KPUX","KRAX","KRGX","KRIW","KRLX","KRTX","KSFX","KSGF","KSHV","KSJT","KSOX","KSRX","KTBW","KTFX","KTLH","KTLX","KTWX","KTYX","KUDX","KUEX","KVAX","KVBX","KVNX","KVTX","KVWX","KYUX","PABC","PACG","PAEC","PAHG","PAIH","PAKC","PAPD","PGUA","PHKI","PHKM","PHMO","PHWA","RKJK","RKSG","RODN","TADW","TATL","TBNA","TBOS","TBWI","TCLT","TCMH","TCVG","TDAL","TDAY","TDCA","TDEN","TDFW","TDTW","TEWR","TFLL","THOU","TIAD","TIAH","TICH","TIDS","TJFK","TLAS","TLVE","TMCI","TMCO","TMEM","TMKE","TMSP","TMSY","TOKC","TORD","TPBI","TPHL","TPHX","TPIT","TRDU","TSDF","TSLC","TSTL","TTPA","TTUL"]}
```

```bash
$ curl 'http://localhost:5000/plot' -X POST --data-raw $'{\n"date": "2021-12-04",\n"radar": "KAKQ"\n}'
```

The response will be an image of the plot(displaying reflectivity) in PNG format. The value for response header `Content-Type` will be `image/png`.
