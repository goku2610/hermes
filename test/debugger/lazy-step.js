// Copyright (c) Facebook, Inc. and its affiliates.
//
// This source code is licensed under the MIT license found in the LICENSE
// file in the root directory of this source tree.
//
// RUN: %hdb --lazy %s < %s.debug | %FileCheck --match-full-lines %s
// REQUIRES: debugger

function foo() {
  print('hello');
}

debugger;
foo();

// CHECK: Break on 'debugger' statement in global: {{.*}}:13:1
// CHECK-NEXT: Stepped to global: {{.*}}:14:1
// CHECK-NEXT: Stepped to foo: {{.*}}:10:3
// CHECK-NEXT: hello
// CHECK-NEXT: Stepped to global: {{.*}}:14:4
