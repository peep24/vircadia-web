/* eslint-disable */
/*
//  Copyright 2021 Vircadia contributors.
//  James Baird - Testing area
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

import { Store, Actions as StoreActions } from "@Store/index";
import { VScene } from "@Modules/scene/vscene";

export class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = "Hello " + message;
    }
}

export class Test {
 constructor() { 
 }
 runTest() {
    void Store.dispatch(StoreActions.TEST_ACTION);
 }
}
