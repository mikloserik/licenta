import traceback
import sys

import pygrib 
import MySQLdb

import datetime

#from gribapi import *
 
INPUT='mars.grib'
 
def saveGrib(): 
    db = MySQLdb.connect("localhost","root","root","licenta")
    cursor = db.cursor()

    grbs = pygrib.open('mars.grib')

    t2m = grbs.select(name="2 metre temperature")[0]
    sp = grbs.select(name="Surface pressure")[0]
    tcwv = grbs.select(name="Total column water vapour")[0]
    uv = grbs.select(name="UV visible albedo for direct radiation")[0]
    lats, lons = t2m.latlons()

    start_date = str(datetime.datetime.today())
    cursor.execute("""INSERT INTO cron_log (start_date, end_date, status) VALUES (%s,"0000-00-00 00:00:00", "RUNNING")""",[start_date])
    db.commit()

    for i in range(0, t2m.values.__len__()):
        for j in range(0, t2m.values[i].__len__()):
            try:
                cursor.execute("""UPDATE t2m SET value = %s WHERE latitude = %s AND longitude = %s""",(str(t2m.values[i][j]), str(lats[i][j]), str(lons[i][j])))
                db.commit()
                print "t2m OK"
            except:     
                db.rollback()
                print "t2m FAIL"
                exit()
            try:
                cursor.execute("""UPDATE sp SET value = %s WHERE latitude = %s AND longitude = %s""",(str(sp.values[i][j]), str(lats[i][j]), str(lons[i][j])))
                db.commit()
                print "sp OK"
            except:     
                db.rollback()
                print "sp FAIL"
                exit()
            try:
                cursor.execute("""UPDATE uv SET value = %s WHERE latitude = %s AND longitude = %s""",(str(uv.values[i][j]), str(lats[i][j]), str(lons[i][j])))
                db.commit()
                print "uv OK"
            except:     
                db.rollback()
                print "uv FAIL"
                exit()
            try:
                cursor.execute("""UPDATE tcwv SET value = %s WHERE latitude = %s AND longitude = %s""",(str(tcwv.values[i][j]), str(lats[i][j]), str(lons[i][j])))
                db.commit()
                print "tcwv OK"
            except:     
                db.rollback()
                print "tcwv FAIL"
                exit()

    cursor.execute("""UPDATE cron_log SET end_date = %s, status = \"DONE\" WHERE start_date = %s""", (str(datetime.datetime.today()),start_date))
    db.commit()

    db.close()
    grbs.close()


def main():
    saveGrib()
 
if __name__ == "__main__":
    sys.exit(main())
