# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the LICENSE file
# in the root directory of this source tree.

enable_testing()
include(GoogleTest)

set(TEST_COMPILE_OPTIONS
  "${FBJNI_COMPILE_OPTIONS}"
  -DFBJNI_DEBUG_REFS
  -UNDEBUG
)

add_library(inter_dso_exception_test_1 SHARED
  inter_dso_exception_test_1/Test.cpp
)
target_compile_options(inter_dso_exception_test_1 PRIVATE ${TEST_COMPILE_OPTIONS})
target_link_libraries(inter_dso_exception_test_1
  fbjni
)

add_library(inter_dso_exception_test_2 SHARED
  inter_dso_exception_test_2/Test.cpp
)
target_compile_options(inter_dso_exception_test_2 PRIVATE ${TEST_COMPILE_OPTIONS})
target_include_directories(inter_dso_exception_test_2 PUBLIC
  "${CMAKE_CURRENT_SOURCE_DIR}"
)
target_link_libraries(inter_dso_exception_test_2
  fbjni
  inter_dso_exception_test_1
)

add_library(no_rtti SHARED
  no_rtti.cpp
)
target_compile_options(no_rtti PRIVATE ${TEST_COMPILE_OPTIONS})
target_link_libraries(no_rtti
  fbjni
)

add_library(fbjni-tests SHARED
  byte_buffer_tests.cpp
  fbjni_onload.cpp
  fbjni_tests.cpp
  hybrid_tests.cpp
  iterator_tests.cpp
  primitive_array_tests.cpp
  readable_byte_channel_tests.cpp
)
target_compile_options(fbjni-tests PRIVATE ${TEST_COMPILE_OPTIONS})
target_link_libraries(fbjni-tests
  fbjni
  inter_dso_exception_test_1
  inter_dso_exception_test_2
  no_rtti
)

add_executable(modified_utf8_test
  modified_utf8_test.cpp
)
target_compile_options(modified_utf8_test PRIVATE ${TEST_COMPILE_OPTIONS})
target_link_libraries(modified_utf8_test
  fbjni
  gtest
  dl
)
gtest_add_tests(TARGET modified_utf8_test)

add_executable(utf16toUTF8_test
  utf16toUTF8_test.cpp
)
target_compile_options(utf16toUTF8_test PRIVATE ${TEST_COMPILE_OPTIONS})
target_link_libraries(utf16toUTF8_test
  fbjni
  gtest
  dl
)
gtest_add_tests(TARGET utf16toUTF8_test)
