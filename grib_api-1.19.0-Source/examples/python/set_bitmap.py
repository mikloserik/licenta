# Copyright 2005-2016 ECMWF.
#
# This software is licensed under the terms of the Apache Licence Version 2.0
# which can be obtained at http://www.apache.org/licenses/LICENSE-2.0.
#
# In applying this licence, ECMWF does not waive the privileges and immunities granted to it by
# virtue of its status as an intergovernmental organisation nor does it submit to any jurisdiction.

import traceback
import sys
from gribapi import *

INPUT = '../../data/regular_latlon_surface.grib1'
OUTPUT = 'out.set_bitmap_p.grib'
MISSING = 9999
VERBOSE = 1  # verbose error reporting


def example():
    fin = open(INPUT)
    fout = open(OUTPUT, 'w')
    gid = grib_new_from_file(fin)

    # The missingValue is not coded in the message.
    # It is a value we define as a placeholder for a missing value
    # at a point in the grid.
    # It should be chosen so that it cannot be confused
    # with a valid field value
    grib_set(gid, 'missingValue', MISSING)

    values = grib_get_values(gid)

    # Enable bitmap
    grib_set(gid, 'bitmapPresent', 1)

    # Change some data values to be missing
    num_missing = 0
    for i in range(100):
        # Set every other value to a missing value
        if i % 2 == 0:
            values[i] = MISSING
            num_missing += 1
    grib_set_values(gid, values)

    # Check counts of missing and non-missing values
    num_data = grib_get(gid, 'numberOfDataPoints', int)
    assert(num_data == len(values))
    assert(grib_get(gid, 'numberOfCodedValues', int) == num_data - num_missing)
    assert(grib_get(gid, 'numberOfMissing', int) == num_missing)

    grib_write(gid, fout)
    grib_release(gid)
    fin.close()
    fout.close()


def main():
    try:
        example()
    except GribInternalError, err:
        if VERBOSE:
            traceback.print_exc(file=sys.stderr)
        else:
            print >> sys.stderr, err.msg

        return 1

if __name__ == "__main__":
    sys.exit(main())
