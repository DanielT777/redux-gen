"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const colors = require('colors');
const { promises: Fs } = require('fs');
const logger_1 = require("../logger/logger");
const generateAppendAction = (actionsDir, state, actionLine, actionFunctionsLine) => {
    (0, utils_1.getFiles)(actionsDir).then((files) => {
        const filesToSearch = files.filter((file) => file.includes(state.filesname));
        if (filesToSearch.length > 0) {
            (0, logger_1.logInfo)('Found files: /actions/' + colors.white.magenta(filesToSearch.join(', ')));
            Fs.appendFile(actionsDir + '/' + state.filesname, '\n' + actionLine + '\n\n' + actionFunctionsLine, { flag: 'a+' }, (err) => {
                if (err) {
                    (0, logger_1.errorInfo)('Error while appending to file: ' + err);
                }
                else {
                    (0, logger_1.successInfo)('Action types and functions appended to file: ' + colors.white.magenta(state.filesname));
                }
            });
        }
        else {
            (0, logger_1.errorInfo)('No files found in /actions/ directory');
            (0, logger_1.logInfo)('Creating file: ' + colors.white.magenta(state.filesname));
            Fs.writeFile(actionsDir + '/' + state.filesname, actionLine + '\n\n' + actionFunctionsLine, (err) => {
                if (err) {
                    (0, logger_1.errorInfo)('Error while creating file: ' + err);
                    process.exit(1);
                }
                (0, logger_1.successInfo)('File created: ' + colors.white.magenta(state.filesname));
            });
        }
    });
};
exports.default = generateAppendAction;
//# sourceMappingURL=actions.js.map