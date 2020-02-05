"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var startReg = /^\@start/;
var nameReg = /^\@name/;
var prefixReg = /^\@prefix/;
var contentReg = /^\@content/;
var endReg = /^\@end/;
var descriptionReg = /^\@description/;
var fileRecursive = function (filePath) {
    var files = fs_1.default.readdirSync(filePath);
    return Promise.all(files.map(function (filename) {
        var filedir = path_1.default.join(filePath, filename);
        return new Promise(function (resolve, reject) {
            fs_1.default.stat(filedir, function (eror, stats) {
                if (eror) {
                    console.warn('获取文件stats失败');
                }
                else {
                    var isFile = stats.isFile(); //是文件
                    var isDir = stats.isDirectory(); //是文件夹
                    if (isDir) {
                        resolve(fileRecursive(filedir)); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                    }
                    if (isFile) {
                        resolve(filedir);
                    }
                }
            });
        });
    }));
};
var templates = {};
var flatten = function (arr) { return arr.reduce(function (pre, val) { return pre.concat(Array.isArray(val) ? flatten(val) : val); }, []); };
var types = fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../src/templates'));
types.forEach(function (type) {
    console.log('.....types', type);
    fileRecursive(path_1.default.resolve(__dirname, "../src/templates/" + type)).then(function (result) {
        var flattenResult = flatten(result);
        result = flattenResult.filter(function (item) { return item; });
        Promise.all(flattenResult.map(function (fileDir) {
            return new Promise(function (resolve, reject) {
                fs_1.default.readFile(fileDir, 'utf8', function (err, data) {
                    if (err)
                        throw err;
                    resolve(data);
                });
            });
        })).then(function (files) {
            files.map(function (file) {
                var lines = file.toString().split(/\n/);
                var temp = {};
                var iscontent = false;
                lines.map(function (line) {
                    if (line.match(startReg)) {
                        temp = {};
                    }
                    else if (line.match(nameReg)) {
                        temp.name = line.slice(5).trim();
                    }
                    else if (line.match(prefixReg)) {
                        temp.prefix = line.slice(7).trim();
                    }
                    else if (line.match(contentReg)) {
                        temp.content = [];
                        iscontent = true;
                    }
                    else if (line.match(descriptionReg)) {
                        temp.description = line.slice(12).trim();
                    }
                    else if (line.match(endReg)) {
                        templates[temp.name] = {
                            prefix: "@" + (temp.prefix || temp.name),
                            body: temp.content,
                            description: temp.description,
                        };
                        iscontent = false;
                    }
                    else {
                        iscontent && temp.content.push(line);
                    }
                });
            });
            fs_1.default.writeFile(path_1.default.resolve(__dirname, "../snippets/" + type + ".json"), JSON.stringify(templates, null, 2), function (err) {
                console.log(err ? err.message : '');
            });
        });
    });
});
