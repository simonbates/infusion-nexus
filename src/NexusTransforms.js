/*
Copyright 2017 OCAD University

Licensed under the New BSD license. You may not use this file except in
compliance with this License.

You may obtain a copy of the License at
https://raw.githubusercontent.com/GPII/nexus/master/LICENSE.txt
*/

/* eslint-env node */

"use strict";

var fluid = require("infusion"),
    gpii = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.nexus.transforms");

// TODO: Automated tests for these transforms
// TODO: Does it make sense to do the timestamping at model relay run?
//       Or would it be better to require sensors to timestamp the
//       reading at source?

fluid.defaults("gpii.nexus.transforms.appendToArray", {
    gradeNames: [
        "fluid.standardTransformFunction",
        "fluid.multiInputTransformFunction"
    ],
    inputVariables: {
        sourceArray: [],
        maxLength: 10
    }
});

gpii.nexus.transforms.appendToArray = function (input, extraInputs) {
    var sourceArray = extraInputs.sourceArray();
    var maxLength = extraInputs.maxLength();

    if (maxLength <= 0) {
        return [];
    }

    var result = fluid.makeArray(sourceArray);

    // TODO: Or use Array.prototype.slice() to limit length?

    while (result.length >= maxLength) {
        result.shift();
    }

    result.push(input);

    return result;
};

fluid.defaults("gpii.nexus.transforms.timeStamp", {
    gradeNames: [
        "fluid.standardTransformFunction",
        "fluid.multiInputTransformFunction"
    ],
    inputVariables: {
        valueKey: "value"
    }
});

gpii.nexus.transforms.timeStamp = function (input, extraInputs) {
    var valueKey = extraInputs.valueKey();
    var result = {
        date: (new Date()).toISOString()
    };
    result[valueKey] = input;
    return result;
};
