"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const colors = require('colors');
const { promises: Fs } = require('fs');
const logger_1 = require("../logger/logger");
const generateAppendReducer = (reducersDir, state, reducerImportString, reducerSwitchArray) => {
    (0, utils_1.getFiles)(reducersDir).then((files) => __awaiter(void 0, void 0, void 0, function* () {
        const filesToSearch = files.filter((file) => file.includes(state.filesname));
        if (filesToSearch.length > 0) {
            (0, logger_1.logInfo)('Found files: /reducers/' + colors.white.magenta(filesToSearch.join(', ')));
            const file = yield Fs.readFile(reducersDir + '/' + state.filesname, 'utf8');
            const index = file.indexOf('default:');
            const newFile = file.slice(0, index);
            const newFileWithReducer = reducerImportString + "\n" + newFile + reducerSwitchArray.join('\n') + '\n\t\tdefault:\n\t\t\treturn state\n\t}\n}';
            yield Fs.writeFile(reducersDir + '/' + state.filesname, newFileWithReducer, { encoding: 'utf8', flag: 'w' });
            (0, logger_1.successInfo)('Reducer appended to file: ' + colors.white.magenta(state.filesname));
        }
        else {
            (0, logger_1.errorInfo)('No files found in /reducers/ directory');
            (0, logger_1.logInfo)('Creating file: ' + colors.white.magenta(state.filesname));
            Fs.writeFile(reducersDir + '/' + state.filesname, reducerImportString + '\n\n' + `const initialState = {
    loading: false,
    payload: null,
    error: null
    }\n
    const ${state.prefix.toLowerCase()}${state.action_name.charAt(0) + state.action_name.substring(1).toLowerCase()} = (state = initialState, action) => {
    switch (action.type) {
    \t\t${reducerSwitchArray.join('\n')}
        default:
            return state
    }
    }`, (err) => {
                if (err) {
                    (0, logger_1.errorInfo)('Error while creating file: ' + err);
                    process.exit(1);
                }
            });
        }
    }));
};
exports.default = generateAppendReducer;
//# sourceMappingURL=reducers.js.map