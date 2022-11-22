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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicReduxGenerator = void 0;
const logger_1 = require("../logger/logger");
const format_1 = require("../basicRedux/format");
const utils_1 = require("../utils");
const actions_1 = __importDefault(require("./actions"));
const reducers_1 = __importDefault(require("./reducers"));
const colors = require('colors');
const { promises: Fs } = require('fs');
const basicReduxGenerator = (state) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.logInfo)('Looking for files in the current directory... in ' + process.cwd());
    let actionTypesArray = (0, format_1.formatTypes)(state.prefix, state.action_name, state.types);
    const actionLine = actionTypesArray.join('\n');
    (0, logger_1.successInfo)('Action types generated: \n' + actionLine);
    let actionFunctionsArray = (0, format_1.formatFunctions)(state.prefix, state.action_name, state.types);
    const actionFunctionsLine = actionFunctionsArray.join('\n\n');
    let allActionTypesArray = (0, format_1.allActionTypes)(state.prefix, state.action_name, state.types);
    const directories = [];
    yield (0, utils_1.getDirectories)(process.cwd(), (dir) => {
        directories.push(dir);
    });
    const reducersDir = directories.find((dir) => dir.endsWith('/reducers') || dir.endsWith('/reducer'));
    const actionsDir = directories.find((dir) => dir.endsWith('/actions') || dir.endsWith('/action'));
    if (reducersDir && actionsDir) {
        (0, logger_1.logInfo)('Reducers and actions directories found! :)');
    }
    else {
        (0, logger_1.errorInfo)('Reducers and actions directories not found! :(');
        process.exit(1);
    }
    const depthReducers = (reducersDir.match(/\//g) || []).length;
    const depthActions = (actionsDir.match(/\//g) || []).length;
    if (depthReducers !== depthActions) {
        (0, logger_1.errorInfo)('Reducers and actions directory depth are not the same, please do better next time :)');
    }
    else {
        (0, logger_1.logInfo)('Reducers and actions directory depth are the same! :)');
    }
    if (depthReducers - depthActions < 0) {
        (0, logger_1.errorInfo)('Reducers directory depth is lower than actions directory depth, or two directory are named "actions" or "reducers"');
        process.exit(1);
    }
    let reducerImportString = (0, format_1.generationImportTypes)(allActionTypesArray, depthReducers, depthActions, state.filesname);
    let reducerSwitchArray = (0, format_1.reducerSwitch)(state.prefix, state.action_name, state.types);
    (0, actions_1.default)(actionsDir, state, actionLine, actionFunctionsLine);
    (0, reducers_1.default)(reducersDir, state, reducerImportString, reducerSwitchArray);
});
exports.basicReduxGenerator = basicReduxGenerator;
//# sourceMappingURL=generator.js.map