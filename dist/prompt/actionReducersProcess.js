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
const prompts = require('prompts');
const actionReducersProcess = () => __awaiter(void 0, void 0, void 0, function* () {
    const onCancel = (prompt) => {
        process.exit(1);
    };
    const getFilesName = yield prompts([
        {
            type: 'text',
            name: 'filesname',
            message: 'Name of the files (with extension)',
            validate: (value) => value.length > 0 ? true : 'Name of the files'
        },
    ], { onCancel });
    const getActionPrefix = yield prompts([
        {
            type: 'select',
            name: 'prefix',
            message: 'Select an action prefix',
            choices: [
                { title: 'GET', value: 'GET' },
                { title: 'DELETE', value: 'DELETE' },
                { title: 'POST', value: 'POST' },
                { title: 'UPDATE', value: 'UPDATE' },
            ],
            initial: 0
        }
    ], { onCancel });
    const getActionTypes = yield prompts([
        {
            type: 'multiselect',
            name: 'types',
            message: 'Pick action types do you want',
            choices: [
                { title: 'SUCCESS', value: 'SUCCESS' },
                { title: 'FAILURE', value: 'FAILURE' },
                { title: 'LOADING', value: 'LOADING' },
            ],
            hint: '- Space to select. Return to submit',
            instructions: false,
            min: 1
        },
    ], { onCancel });
    const getActionName = yield prompts([
        {
            type: 'text',
            name: 'action_name',
            message: `Type the action name (${getActionPrefix.prefix} + ACTION NAME + ${getActionTypes.types})`,
            validate: (value) => value.length > 0 ? true : 'Type the action name'
        },
    ], { onCancel });
    const state = {
        filesname: getFilesName.filesname,
        prefix: getActionPrefix.prefix,
        types: getActionTypes.types,
        action_name: getActionName.action_name
    };
    return state;
});
exports.default = actionReducersProcess;
//# sourceMappingURL=actionReducersProcess.js.map