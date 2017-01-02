#!/usr/bin/env python
from ecmwfapi import ECMWFDataServer
import datetime

day = datetime.datetime.today().day
month = datetime.datetime.today().month

server = ECMWFDataServer()
server.retrieve({
    "class": "e2",
    "dataset": "era20c",
    "date": "2010-" + str(month) + "-" + str(day),
    "expver": "1",
    "levtype": "sfc",
    "param": "15.128/134.128/137.128/167.128",
    "stream": "oper",
    "time": "12:00:00",
    "type": "an",
    "target": "mars.grib",
})