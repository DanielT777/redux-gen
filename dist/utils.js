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
exports.getFiles = exports.getDirectories = void 0;
const { promises: Fs } = require('fs');
const Path = require('path');
const promises_1 = require("fs/promises");
const getDirectories = (src, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, promises_1.readdir)(src);
    for (const file of files) {
        const dir = Path.join(src, file);
        const stat = yield Fs.stat(dir);
        if (stat.isDirectory() && file !== 'node_modules' && file !== 'ios' && file !== 'android' && file !== '.git') {
            callback(dir);
            yield (0, exports.getDirectories)(dir, callback);
        }
    }
});
exports.getDirectories = getDirectories;
const getFiles = (dir) => {
    return new Promise((resolve, reject) => {
        (0, promises_1.readdir)(dir, { withFileTypes: true })
            .then(dirents => {
            let filesList = [];
            dirents.map(dirent => {
                filesList.push(dirent.name);
            });
            resolve(filesList);
        })
            .catch(err => {
            reject(err);
        });
    });
};
exports.getFiles = getFiles;
//# sourceMappingURL=utils.js.map