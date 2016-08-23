#!/usr/bin/env python
from ecmwfapi import ECMWFDataServer
server = ECMWFDataServer()
server.retrieve({
    "class": "e2",
    "dataset": "era20c",
    "date": "2010-08-01/to/2010-08-31",
    "expver": "1",
    "levtype": "sfc",
    "param": "167.128",
    "stream": "oper",
    "time": "12:00:00",
    "type": "an",
    "target": "CHANGEME",
	"format": "netcdf",
})