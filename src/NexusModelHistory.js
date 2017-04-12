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

gpii.nexus.timeStamp = function (value, valueKey) {
    var timeStamped = {
        date: (new Date()).toISOString()
    };
    timeStamped[valueKey] = value;
    return timeStamped;
};

gpii.nexus.appendToArray = function (sourceArray, element, maxLength) {
    if (maxLength <= 0) {
        return [];
    }

    var result = fluid.makeArray(sourceArray);

    // TODO: Or use Array.prototype.slice() to limit length?

    while (result.length >= maxLength) {
        result.shift();
    }

    result.push(element);

    return result;
};

gpii.nexus.recordValueHistory = function (value, valueKey, targetComponent, modelPath, maxLength) {
    // If this function is called by a model listener and the model
    // being listened to is DELETEd, we will get an update with a value
    // of undefined. Ignore these.
    if (value !== undefined) {
        var timeStamped = gpii.nexus.timeStamp(value, valueKey);
        var currentHistory = fluid.get(targetComponent.model, modelPath);
        var newHistory = gpii.nexus.appendToArray(currentHistory, timeStamped, maxLength);
        targetComponent.applier.change(modelPath, newHistory);
    }
};
