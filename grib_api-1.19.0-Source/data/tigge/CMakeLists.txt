# data/tigge/CMakeLists.txt
# Download all the TIGGE grib data from website

file(READ "tigge_data_files.txt" tigge_files_to_download)
string(REGEX REPLACE "\n" ";" tigge_files_to_download "${tigge_files_to_download}")

# Download all data files doing md5 check on each
ecbuild_get_test_multidata( TARGET grib_api_download_tigge_gribs
                            NAMES ${tigge_files_to_download} )

if( ENABLE_TESTS )
  set_property( TEST grib_api_download_tigge_gribs APPEND PROPERTY LABELS download_data )
endif()
