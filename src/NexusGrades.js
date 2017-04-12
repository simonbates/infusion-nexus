/*
Copyright 2017 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://raw.githubusercontent.com/GPII/nexus/master/LICENSE.txt
*/

/* eslint-env node */

"use strict";

var fluid = require("infusion");

fluid.defaults("gpii.selfDestroyingModel", {
    gradeNames: ["fluid.modelComponent"],
    listeners: {
        "onDestroy.deleteModel": {
            listener: "{that}.applier.change",
            args: ["", null, "DELETE"]
        }
    }
});
