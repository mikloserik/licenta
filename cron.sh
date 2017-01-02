#!/bin/bash
####################################
#
# Update meteorological data cron
#
####################################

echo "Downloading ECMWF data..."
python mars.py
echo "Download complete."

echo "Save ECMWF data relational..."
python getECMWFData.py