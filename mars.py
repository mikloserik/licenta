#!/usr/bin/env python
from ecmwfapi import ECMWFDataServer
import datetime

day = datetime.datetime.today().day
month = datetime.datetime.today().month

if day < 10:
    day = "0" + str(day)
else:
    day = str(day)

if month < 10:
    month = "0" + str(month)
else:
    month = str(month)

server = ECMWFDataServer()
server.retrieve({
    "class": "e2",
    "dataset": "era20c",
    "date": "2010-" + month + "-" + day,
    "expver": "1",
    "levtype": "sfc",
    "param": "15.128/134.128/137.128/167.128",
    "stream": "oper",
    "time": "12:00:00",
    "type": "an",
    "target": "mars.grib",
})