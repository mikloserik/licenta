#!/bin/sh

. ./include.sh

REDIRECT=/dev/null
$PYTHON $examples_src/multi_write.py 2> $REDIRECT > $REDIRECT
rm -f out.mw.grib || true
