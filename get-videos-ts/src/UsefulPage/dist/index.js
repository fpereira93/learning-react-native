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
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
var Index_1 = require("../Helper/Index");
var UsefulPage = /** @class */ (function () {
    function UsefulPage() {
    }
    UsefulPage.existsSelector = function (page, selector, timeout) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.waitForSelector(selector, { timeout: timeout }).then(function () {
                            return true;
                        })["catch"](function () {
                            return false;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsefulPage.waitQuerySelector = function (info) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var attempts, exists, result;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    attempts = (_a = info.attempts) !== null && _a !== void 0 ? _a : 1;
                                    _c.label = 1;
                                case 1:
                                    if (!attempts) return [3 /*break*/, 6];
                                    exists = true;
                                    if (!(info.page.constructor.name === 'Page')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, UsefulPage.existsSelector(info.page, info.selector, (_b = info.timeout) !== null && _b !== void 0 ? _b : 5000)];
                                case 2:
                                    exists = _c.sent();
                                    _c.label = 3;
                                case 3:
                                    if (!exists) return [3 /*break*/, 5];
                                    return [4 /*yield*/, info.page.$$(info.selector)];
                                case 4:
                                    result = _c.sent();
                                    resolve({ elements: result });
                                    return [3 /*break*/, 6];
                                case 5:
                                    attempts--;
                                    return [3 /*break*/, 1];
                                case 6:
                                    if (attempts == 0) {
                                        reject(Index_1.merror(['# Exhausted attempts']));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    UsefulPage.toArray = function (listElements, next) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var formateds, index, element, formated, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    formateds = [];
                                    index = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(index < listElements.length)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, listElements[index]];
                                case 2:
                                    element = _a.sent();
                                    return [4 /*yield*/, next(element)];
                                case 3:
                                    formated = _a.sent();
                                    if (formated === false) {
                                        return [3 /*break*/, 5];
                                    }
                                    formateds.push(formated);
                                    _a.label = 4;
                                case 4:
                                    index++;
                                    return [3 /*break*/, 1];
                                case 5:
                                    resolve(formateds);
                                    return [3 /*break*/, 7];
                                case 6:
                                    error_1 = _a.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    UsefulPage.getTextElement = function (element, querySelector) {
        if (querySelector === void 0) { querySelector = ''; }
        return __awaiter(this, void 0, Promise, function () {
            var elementWithText, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!querySelector) return [3 /*break*/, 2];
                        return [4 /*yield*/, element.$(querySelector)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = element;
                        _b.label = 3;
                    case 3:
                        elementWithText = _a;
                        if (!elementWithText) return [3 /*break*/, 5];
                        return [4 /*yield*/, elementWithText.evaluate(function (node) { return node.innerText; })];
                    case 4: return [2 /*return*/, (_b.sent()).trim()];
                    case 5: return [2 /*return*/, ''];
                }
            });
        });
    };
    UsefulPage.getPropertyElement = function (element, name, querySelector) {
        if (querySelector === void 0) { querySelector = ''; }
        return __awaiter(this, void 0, Promise, function () {
            var elementWithProperty, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!querySelector) return [3 /*break*/, 2];
                        return [4 /*yield*/, element.$(querySelector)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = element;
                        _b.label = 3;
                    case 3:
                        elementWithProperty = _a;
                        if (!elementWithProperty) return [3 /*break*/, 6];
                        return [4 /*yield*/, elementWithProperty.getProperty(name)];
                    case 4: return [4 /*yield*/, (_b.sent()).jsonValue()];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/, ''];
                }
            });
        });
    };
    return UsefulPage;
}());
exports["default"] = UsefulPage;
