/*!
 * Needful things vnull
 * Copyright 2020 Florian Weber - ppm visuals & internet GmbH
 * Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rfg = _interopDefault(require('rfg-api'));
var pify = _interopDefault(require('pify'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var ora = _interopDefault(require('ora'));
var tinify = _interopDefault(require('tinify'));
var glob = _interopDefault(require('glob'));
var logSymbols = _interopDefault(require('log-symbols'));
var chalk = _interopDefault(require('chalk'));
var png = _interopDefault(require('png-metadata'));
var piexifjs = require('piexifjs');
var inquirer = require('inquirer');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var filePath = path.resolve(process.cwd(), './.ppmvi.js');
var userConfig;
if (fs.existsSync(filePath)) {
    var file = require(filePath).default;
    userConfig = file.favicons || {};
}
if (userConfig &&
    userConfig.master_picture &&
    userConfig.master_picture.type === 'inline') {
    var image = path.resolve(process.cwd(), userConfig.master_picture.content);
    if (fs.existsSync(image)) {
        userConfig.master_picture.content = fs
            .readFileSync(image)
            .toString('base64');
    }
}
var defaultConfig = {
    api_key: '',
    master_picture: {
        type: 'url',
        url: '',
    },
    files_location: {
        type: 'path',
        path: '/static/icons',
    },
    favicon_design: {
        desktop_browser: {},
        ios: {
            picture_aspect: 'background_and_margin',
            margin: '8',
            background_color: '#FFFFFF',
            assets: {
                ios6_and_prior_icons: false,
                ios7_and_later_icons: false,
                precomposed_icons: false,
                declare_only_default_icon: true,
            },
        },
        windows: {
            picture_aspect: 'white_silhouette',
            background_color: '#FFFFFF',
            assets: {
                windows_80_ie_10_tile: true,
                windows_10_ie_11_edge_tiles: {
                    small: false,
                    medium: true,
                    big: false,
                    rectangle: false,
                },
            },
        },
        android_chrome: {
            picture_aspect: 'background_and_margin',
            margin: '12',
            background_color: '#FFFFFF',
            theme_color: '#FFFFFF',
            manifest: {
                name: 'My sample app',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/',
            },
            assets: {
                legacy_icon: false,
                low_resolution_icons: false,
            },
        },
        safari_pinned_tab: {
            picture_aspect: 'black_and_white',
            threshold: 60,
            theme_color: '#FFFFFF',
        },
    },
    settings: {
        compression: '5',
        scaling_algorithm: 'Mitchell',
        error_on_image_too_small: true,
        readme_file: false,
        html_code_file: false,
        use_path_as_is: true,
    },
};
var config = __assign(__assign({}, defaultConfig), userConfig);

function generate(path) {
    if (path === void 0) { path = './static/icons'; }
    return __awaiter(this, void 0, void 0, function () {
        var watcherSpinner, generator, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    watcherSpinner = ora('Generating Favicons').start();
                    generator = rfg.init();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pify(generator.generateFavicon)(config, path)];
                case 2:
                    _a.sent();
                    watcherSpinner.succeed();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    watcherSpinner.fail(err_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}

var File = /** @class */ (function () {
    function File() {
    }
    Object.defineProperty(File, "EXIF_USER_COMMENT", {
        get: function () {
            return 'Compressed with TinyPNG by @ppmvi/needful-things';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File, "PNG_TEXT_CHUNKG_FLAG", {
        get: function () {
            return 'tEXt';
        },
        enumerable: true,
        configurable: true
    });
    File.prototype.readUserComment = function (filePath) {
        var userComment = '';
        var ext = path.extname(filePath);
        var file = fs.readFileSync(filePath).toString('binary');
        if (ext === '.png') {
            var list = png.splitChunk(file);
            var chunk = this.getUserCommentFromPngChunks(list);
            userComment = chunk ? chunk.data : '';
        }
        else {
            var exifData = ext !== '.png' ? piexifjs.load(file)['Exif'] : undefined;
            userComment =
                typeof exifData !== 'undefined' &&
                    exifData[piexifjs.TagValues.ExifIFD.UserComment]
                    ? exifData[piexifjs.TagValues.ExifIFD.UserComment]
                    : '';
        }
        return userComment;
    };
    File.prototype.addUserComment = function (fileBuffer, filePath) {
        var _a;
        var ext = path.extname(filePath);
        var newData = fileBuffer;
        if (ext === '.png') {
            var list = png.splitChunk(fileBuffer);
            if (!this.getUserCommentFromPngChunks(list)) {
                var end = list.pop();
                var newchunk = png.createChunk(File.PNG_TEXT_CHUNKG_FLAG, File.EXIF_USER_COMMENT);
                list.push(newchunk);
                list.push(end);
                newData = png.joinChunk(list);
            }
        }
        else {
            var exifData = {
                Exif: (_a = {},
                    _a[piexifjs.TagValues.ExifIFD.UserComment] = File.EXIF_USER_COMMENT,
                    _a),
            };
            var exifBytes = piexifjs.dump(exifData);
            newData = piexifjs.insert(exifBytes, fileBuffer);
        }
        return Buffer.from(newData, 'binary');
    };
    File.prototype.getUserCommentFromPngChunks = function (list) {
        var chunk;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.type === File.PNG_TEXT_CHUNKG_FLAG) {
                chunk = item;
                break;
            }
        }
        return chunk;
    };
    return File;
}());

var Tinify = /** @class */ (function (_super) {
    __extends(Tinify, _super);
    function Tinify() {
        var _this = _super.call(this) || this;
        _this.config = {};
        _this.getConfig();
        return _this;
    }
    Tinify.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var choices, count, selectedFiles, _a, compress, addCompressFlag, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.setCompressionCount()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getFiles()];
                    case 2:
                        choices = _b.sent();
                        count = choices.filter(function (file) { return !(file instanceof inquirer.Separator) && !file.disabled; }).length;
                        if (!(count > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: 'checkbox',
                                    message: 'Select the files which should be compressed.',
                                    name: 'selectedFiles',
                                    pageSize: choices.length,
                                    choices: choices,
                                    validate: function (answer) {
                                        if (answer.length < 1) {
                                            return 'You must at least choose one image.';
                                        }
                                        return true;
                                    },
                                },
                            ])];
                    case 3:
                        selectedFiles = (_b.sent()).selectedFiles;
                        return [4 /*yield*/, inquirer.prompt([
                                {
                                    type: 'confirm',
                                    message: "You are about to compress the selected images. Do you want to continue?",
                                    name: 'compress',
                                    default: true,
                                },
                                {
                                    type: 'confirm',
                                    message: "Do you want to add a compressed flag to the file name? eg. test_compressed.png",
                                    name: 'addCompressFlag',
                                    default: false,
                                    when: function (_a) {
                                        var compress = _a.compress;
                                        return compress;
                                    },
                                },
                            ])];
                    case 4:
                        _a = _b.sent(), compress = _a.compress, addCompressFlag = _a.addCompressFlag;
                        if (!compress) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.doCompression(selectedFiles, addCompressFlag)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.log(logSymbols.info, chalk.bold("You already compressed all images."));
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_1 = _b.sent();
                        console.log(err_1);
                        console.log(logSymbols.error, chalk.bold("Looks like your key is not valid."));
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Tinify.prototype.doCompression = function (selectedFiles, addCompressFlag) {
        if (selectedFiles === void 0) { selectedFiles = []; }
        if (addCompressFlag === void 0) { addCompressFlag = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, selectedFiles_1, file, state_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (file) {
                            var filePath, dir, ext, name_1, compressFlag, fileBuffer, spinner, result, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filePath = process.cwd() + file;
                                        dir = path.dirname(filePath);
                                        ext = path.extname(filePath);
                                        name_1 = path.basename(filePath).replace(ext, '');
                                        compressFlag = addCompressFlag ? '_compressed' : '';
                                        fileBuffer = fs.readFileSync(filePath);
                                        spinner = ora("Compressing " + name_1 + ext).start();
                                        result = void 0;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                tinify.fromBuffer(fileBuffer).toBuffer(function (err, result) {
                                                    if (err)
                                                        reject(err);
                                                    resolve(result);
                                                });
                                            })];
                                    case 2:
                                        result = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_2 = _a.sent();
                                        spinner.fail(err_2.message);
                                        return [2 /*return*/, "break"];
                                    case 4:
                                        fs.writeFileSync(dir + "/" + name_1 + compressFlag + ext, this_1.addUserComment(result.toString(), filePath));
                                        spinner.succeed();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, selectedFiles_1 = selectedFiles;
                        _a.label = 1;
                    case 1:
                        if (!(_i < selectedFiles_1.length)) return [3 /*break*/, 4];
                        file = selectedFiles_1[_i];
                        return [5 /*yield**/, _loop_1(file)];
                    case 2:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 4];
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Tinify.prototype.getFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, curPath;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pify(glob)(process.cwd() + '/src/**/*.{png,jpg,jpeg}', {})];
                    case 1:
                        files = (_a.sent());
                        curPath = '';
                        return [2 /*return*/, files.reduce(function (result, value, key) {
                                var name = value.replace(process.cwd(), '');
                                if (!curPath)
                                    curPath = path.dirname(name);
                                else if (curPath && curPath !== path.dirname(name)) {
                                    result.push(new inquirer.Separator('----------'));
                                    curPath = path.dirname(name);
                                }
                                result.push({
                                    name: name,
                                    checked: true,
                                    disabled: name.match(/compressed/) ||
                                        _this.readUserComment(value).includes(File.EXIF_USER_COMMENT)
                                        ? 'Already compressed'
                                        : false,
                                });
                                return result;
                            }, [])];
                }
            });
        });
    };
    Tinify.prototype.setCompressionCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                tinify.validate(function (err) {
                                    if (err)
                                        reject(err);
                                    resolve();
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.compressionsThisMonth = tinify.compressionCount;
                        if (typeof this.compressionsThisMonth === 'undefined') {
                            console.log(logSymbols.info, chalk.bold("Couldnt get the compressions count. You probably havent done any compressions."));
                        }
                        else {
                            console.log(logSymbols.info, chalk.bold("You already used " + this.compressionsThisMonth + "/500 free compressions this month."));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Tinify.prototype.getConfig = function () {
        var filePath = path.resolve(process.cwd(), './.ppmvi.js');
        var config = {
            tinify: { key: '' },
        };
        var userConfig = {};
        if (fs.existsSync(filePath))
            userConfig = require(filePath).default;
        this.config = __assign(__assign({}, config), userConfig);
    };
    return Tinify;
}(File));
function tinifyImages() {
    return __awaiter(this, void 0, void 0, function () {
        var tinifyClass;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tinifyClass = new Tinify();
                    return [4 /*yield*/, tinifyClass.run()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

exports.generateFavicons = generate;
exports.tinify = tinifyImages;
//# sourceMappingURL=index.js.map
