#!/usr/bin/env node
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
const actionReducersProcess_1 = __importDefault(require("./prompt/actionReducersProcess"));
const prompts = require('prompts');
const generator_1 = require("./basicRedux/generator");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const chooseWhatYouWant = yield prompts([
        {
            type: 'select',
            name: 'value',
            message: 'What do you want to do?',
            initial: 0,
            choices: [
                { title: 'Create/Append action and reducers', value: 'actionReducersProcess' },
            ]
        }
    ], { onCancel: () => process.exit(1) });
    switch (chooseWhatYouWant.value) {
        case 'actionReducersProcess':
            const state = yield (0, actionReducersProcess_1.default)();
            (0, generator_1.basicReduxGenerator)(state);
    }
}))();
//# sourceMappingURL=app.js.map