! Copyright 2005-2016 ECMWF.
!
! This software is licensed under the terms of the Apache Licence Version 2.0
! which can be obtained at http://www.apache.org/licenses/LICENSE-2.0.
! 
! In applying this licence, ECMWF does not waive the privileges and immunities granted to it by
! virtue of its status as an intergovernmental organisation nor does it submit to any jurisdiction.
!
! Description: how to set key values.
!
!
program set
  use grib_api
  implicit none
  integer              :: err
  integer              :: len
  integer              :: size
  integer              :: infile,outfile
  integer              :: igrib,iret
  character(len = 256) :: error

  infile=5
  outfile=6

  call grib_open_file(infile, &
       '../../data/reduced_gaussian_pressure_level.grib2','r')

  call grib_open_file(outfile, &
       'out_surface_level.grib2','w')

  !     a new grib message is loaded from file
  !     igrib is the grib id to be used in subsequent calls
  call grib_new_from_file(infile,igrib)

  call grib_set(igrib,'typeOfFirstFixedSurface','sfc')
  call grib_set_missing(igrib,'scaleFactorOfFirstFixedSurface')
  call grib_set_missing(igrib,'scaledValueOfFirstFixedSurface')

  call grib_write(igrib,outfile)

  call grib_release(igrib)

  call grib_close_file(infile)

  call grib_close_file(outfile)

end program set
