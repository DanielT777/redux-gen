"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = exports.debugInfo = exports.warningInfo = exports.errorInfo = exports.successInfo = void 0;
const colors = require('colors');
const successInfo = (message) => {
    console.log(colors.green(message));
};
exports.successInfo = successInfo;
const errorInfo = (message) => {
    console.log(colors.red(message));
};
exports.errorInfo = errorInfo;
const warningInfo = (message) => {
    console.log(colors.yellow(message));
};
exports.warningInfo = warningInfo;
const debugInfo = (message) => {
    console.log(colors.magenta(message));
};
exports.debugInfo = debugInfo;
const logInfo = (message) => {
    console.log(colors.white(message));
};
exports.logInfo = logInfo;
//# sourceMappingURL=logger.js.map