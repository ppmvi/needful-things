/*!
 * Needful things v1.5.1
 * Copyright 2019 Florian Weber - ppm visuals & internet GmbH
 * Released under the MIT License.
*/
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import rfg from 'rfg-api';
import pify from 'pify';
import _objectSpread from '@babel/runtime/helpers/objectSpread';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import tinify from 'tinify';
import inquirer from 'inquirer';
import glob from 'glob';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import png from 'png-metadata';
import { load, TagValues, dump, insert } from 'piexifjs';

var filePath = path.resolve(process.cwd(), './.ppmvi.js');
var userConfig;

if (fs.existsSync(filePath)) {
  var file = require(filePath)["default"];

  userConfig = file.favicons || {};
}

if (userConfig && userConfig.master_picture && userConfig.master_picture.type === 'inline') {
  var image = path.resolve(process.cwd(), userConfig.master_picture.content);

  if (fs.existsSync(image)) {
    userConfig.master_picture.content = fs.readFileSync(image).toString('base64');
  }
}

var defaultConfig = {
  'api_key': '',
  'master_picture': {
    'type': 'url',
    'url': ''
  },
  'files_location': {
    'type': 'path',
    'path': '/static/icons'
  },
  'favicon_design': {
    'desktop_browser': {},
    'ios': {
      'picture_aspect': 'background_and_margin',
      'margin': '8',
      'background_color': '#FFFFFF',
      'assets': {
        'ios6_and_prior_icons': false,
        'ios7_and_later_icons': false,
        'precomposed_icons': false,
        'declare_only_default_icon': true
      }
    },
    'windows': {
      'picture_aspect': 'white_silhouette',
      'background_color': '#FFFFFF',
      'assets': {
        'windows_80_ie_10_tile': true,
        'windows_10_ie_11_edge_tiles': {
          'small': false,
          'medium': true,
          'big': false,
          'rectangle': false
        }
      }
    },
    'android_chrome': {
      'picture_aspect': 'background_and_margin',
      'margin': '12',
      'background_color': '#FFFFFF',
      'theme_color': '#FFFFFF',
      'manifest': {
        'name': 'My sample app',
        'display': 'standalone',
        'orientation': 'portrait',
        'start_url': '/'
      },
      'assets': {
        'legacy_icon': false,
        'low_resolution_icons': false
      }
    },
    'safari_pinned_tab': {
      'picture_aspect': 'black_and_white',
      'threshold': 60,
      'theme_color': '#FFFFFF'
    }
  },
  'settings': {
    'compression': '5',
    'scaling_algorithm': 'Mitchell',
    'error_on_image_too_small': true,
    'readme_file': false,
    'html_code_file': false,
    'use_path_as_is': true
  }
};
const config = _objectSpread({}, defaultConfig, userConfig);

function generate() {
  return _generate.apply(this, arguments);
}

function _generate() {
  _generate = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var path,
        watcherSpinner,
        generator,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            path = _args.length > 0 && _args[0] !== undefined ? _args[0] : './static/icons';
            watcherSpinner = ora('Generating Favicons').start();
            generator = rfg.init();
            _context.prev = 3;
            _context.next = 6;
            return pify(generator.generateFavicon)(config, path);

          case 6:
            watcherSpinner.succeed();
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            watcherSpinner.fail(_context.t0.message);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));
  return _generate.apply(this, arguments);
}

var File =
/*#__PURE__*/
function () {
  function File() {
    _classCallCheck(this, File);
  }

  _createClass(File, [{
    key: "readUserComment",
    value: function readUserComment(filePath) {
      var userComment = '';
      var ext = path.extname(filePath);
      var file = fs.readFileSync(filePath).toString('binary');

      if (ext === '.png') {
        var list = png.splitChunk(file);
        var chunk = this.getUserCommentFromPngChunks(list);
        userComment = chunk ? chunk.data : '';
      } else {
        var exifData = ext !== '.png' ? load(file)['Exif'] : undefined;
        userComment = typeof exifData !== 'undefined' && exifData[TagValues.ExifIFD.UserComment] ? exifData[TagValues.ExifIFD.UserComment] : '';
      }

      return userComment;
    }
  }, {
    key: "addUserComment",
    value: function addUserComment(fileBuffer, filePath) {
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
      } else {
        var exifData = {
          'Exif': _defineProperty({}, TagValues.ExifIFD.UserComment, File.EXIF_USER_COMMENT)
        };
        var exifBytes = dump(exifData);
        newData = insert(exifBytes, fileBuffer);
      }

      return Buffer.from(newData, 'binary');
    }
  }, {
    key: "getUserCommentFromPngChunks",
    value: function getUserCommentFromPngChunks(list) {
      var chunk;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.type === File.PNG_TEXT_CHUNKG_FLAG) {
            chunk = item;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return chunk;
    }
  }], [{
    key: "EXIF_USER_COMMENT",
    get: function get() {
      return 'Compressed with TinyPNG by @ppmvi/needful-things';
    }
  }, {
    key: "PNG_TEXT_CHUNKG_FLAG",
    get: function get() {
      return 'tEXt';
    }
  }]);

  return File;
}();

var Tinify =
/*#__PURE__*/
function (_File) {
  _inherits(Tinify, _File);

  function Tinify() {
    var _this;

    _classCallCheck(this, Tinify);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tinify).call(this));

    _this.getConfig();

    tinify.key = _this.config.tinify.key;
    return _this;
  }

  _createClass(Tinify, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        var choices, count, _ref, selectedFiles, _ref2, compress, addCompressFlag;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.setCompressionCount();

              case 3:
                _context.next = 5;
                return this.getFiles();

              case 5:
                choices = _context.sent;
                count = choices.filter(function (file) {
                  return !file.disabled && !(file instanceof inquirer.Separator);
                }).length;

                if (!(count > 0)) {
                  _context.next = 22;
                  break;
                }

                _context.next = 10;
                return inquirer.prompt([{
                  type: 'checkbox',
                  message: 'Select the files which should be compressed.',
                  name: 'selectedFiles',
                  pageSize: choices.length,
                  choices: choices,
                  validate: function validate(answer) {
                    if (answer.length < 1) {
                      return 'You must at least choose one image.';
                    }

                    return true;
                  }
                }]);

              case 10:
                _ref = _context.sent;
                selectedFiles = _ref.selectedFiles;
                _context.next = 14;
                return inquirer.prompt([{
                  type: 'confirm',
                  message: "You are about to compress the selected images. Do you want to continue?",
                  name: 'compress',
                  "default": true
                }, {
                  type: 'confirm',
                  message: "Do you want to add a compressed flag to the file name? eg. test_compressed.png",
                  name: 'addCompressFlag',
                  "default": false,
                  when: function when(_ref3) {
                    var compress = _ref3.compress;
                    return compress;
                  }
                }]);

              case 14:
                _ref2 = _context.sent;
                compress = _ref2.compress;
                addCompressFlag = _ref2.addCompressFlag;

                if (!compress) {
                  _context.next = 20;
                  break;
                }

                _context.next = 20;
                return this.doCompression(selectedFiles, addCompressFlag);

              case 20:
                _context.next = 23;
                break;

              case 22:
                console.log(logSymbols.info, chalk.bold("You already compressed all images."));

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                console.log(logSymbols.error, chalk.bold("Looks like your key is not valid."));

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 25]]);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: "doCompression",
    value: function () {
      var _doCompression = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var selectedFiles,
            addCompressFlag,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _loop,
            _iterator,
            _step,
            _ret,
            _args3 = arguments;

        return _regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                selectedFiles = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : [];
                addCompressFlag = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 5;
                _loop =
                /*#__PURE__*/
                _regeneratorRuntime.mark(function _loop() {
                  var file, filePath, dir, ext, name, compressFlag, fileBuffer, spinner, result;
                  return _regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          file = _step.value;
                          filePath = process.cwd() + file;
                          dir = path.dirname(filePath);
                          ext = path.extname(filePath);
                          name = path.basename(filePath).replace(ext, '');
                          compressFlag = addCompressFlag ? '_compressed' : '';
                          fileBuffer = fs.readFileSync(filePath);
                          spinner = ora("Compressing ".concat(name).concat(ext)).start();
                          result = void 0;
                          _context2.prev = 9;
                          _context2.next = 12;
                          return new Promise(function (resolve, reject) {
                            tinify.fromBuffer(fileBuffer).toBuffer(function (err, result) {
                              if (err) reject(err);
                              resolve(result);
                            });
                          });

                        case 12:
                          result = _context2.sent;
                          _context2.next = 19;
                          break;

                        case 15:
                          _context2.prev = 15;
                          _context2.t0 = _context2["catch"](9);
                          spinner.fail(_context2.t0.message);
                          return _context2.abrupt("return", "break");

                        case 19:
                          fs.writeFileSync("".concat(dir, "/").concat(name).concat(compressFlag).concat(ext), _this2.addUserComment(result.toString('binary'), filePath));
                          spinner.succeed();

                        case 21:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _loop, null, [[9, 15]]);
                });
                _iterator = selectedFiles[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 16;
                  break;
                }

                return _context3.delegateYield(_loop(), "t0", 10);

              case 10:
                _ret = _context3.t0;

                if (!(_ret === "break")) {
                  _context3.next = 13;
                  break;
                }

                return _context3.abrupt("break", 16);

              case 13:
                _iteratorNormalCompletion = true;
                _context3.next = 8;
                break;

              case 16:
                _context3.next = 22;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t1 = _context3["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context3.t1;

              case 22:
                _context3.prev = 22;
                _context3.prev = 23;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 25:
                _context3.prev = 25;

                if (!_didIteratorError) {
                  _context3.next = 28;
                  break;
                }

                throw _iteratorError;

              case 28:
                return _context3.finish(25);

              case 29:
                return _context3.finish(22);

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, null, [[5, 18, 22, 30], [23,, 25, 29]]);
      }));

      function doCompression() {
        return _doCompression.apply(this, arguments);
      }

      return doCompression;
    }()
  }, {
    key: "getFiles",
    value: function () {
      var _getFiles = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var _this3 = this;

        var files, curPath;
        return _regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return pify(glob)(process.cwd() + '/src/**/*.{png,jpg,jpeg}', {});

              case 2:
                files = _context4.sent;
                curPath = '';
                return _context4.abrupt("return", files.reduce(function (result, value, key) {
                  var name = value.replace(process.cwd(), '');
                  if (!curPath) curPath = path.dirname(name);else if (curPath && curPath !== path.dirname(name)) {
                    result.push(new inquirer.Separator('----------'));
                    curPath = path.dirname(name);
                  }
                  result.push({
                    name: name,
                    checked: true,
                    disabled: name.match(/compressed/) || _this3.readUserComment(value).includes(File.EXIF_USER_COMMENT) ? 'Already compressed' : false
                  });
                  return result;
                }, []));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3);
      }));

      function getFiles() {
        return _getFiles.apply(this, arguments);
      }

      return getFiles;
    }()
  }, {
    key: "setCompressionCount",
    value: function () {
      var _setCompressionCount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4() {
        return _regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return new Promise(function (resolve, reject) {
                  tinify.validate(function (err) {
                    if (err) reject(err);
                    resolve();
                  });
                });

              case 3:
                this.compressionsThisMonth = tinify.compressionCount;

                if (typeof this.compressionsThisMonth === 'undefined') {
                  console.log(logSymbols.info, chalk.bold("Couldnt get the compressions count. You probably havent done any compressions."));
                } else {
                  console.log(logSymbols.info, chalk.bold("You already used ".concat(this.compressionsThisMonth, "/500 free compressions this month.")));
                }

                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function setCompressionCount() {
        return _setCompressionCount.apply(this, arguments);
      }

      return setCompressionCount;
    }()
  }, {
    key: "getConfig",
    value: function getConfig() {
      var filePath = path.resolve(process.cwd(), './.ppmvi.js');
      var config = {
        tinify: {
          key: ''
        }
      };
      var userConfig = {};
      if (fs.existsSync(filePath)) userConfig = require(filePath)["default"];
      this.config = _objectSpread({}, config, userConfig);
    }
  }]);

  return Tinify;
}(File);

function tinifyImages() {
  return _tinifyImages.apply(this, arguments);
}

function _tinifyImages() {
  _tinifyImages = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5() {
    var tinifyClass;
    return _regeneratorRuntime.wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            tinifyClass = new Tinify();
            _context6.next = 3;
            return tinifyClass.run();

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5);
  }));
  return _tinifyImages.apply(this, arguments);
}

export { generate as generateFavicons, tinifyImages as tinify };
