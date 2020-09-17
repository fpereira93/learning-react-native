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
var sqlite3_1 = require("sqlite3");
var Console_1 = require("../Job/Console");
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.get = function () {
        if (DB.countInstance == 0) {
            var pathbase = process.cwd() + "/src/sqlite.db";
            var verbose = sqlite3_1["default"].verbose();
            DB.instance = new verbose.Database(pathbase);
            DB.instance.run('PRAGMA foreign_keys=ON');
        }
        DB.countInstance++;
        return DB.instance;
    };
    DB.executeCommandTransaction = function (command) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        DB.get().run(command, function (error) {
                            if (!error) {
                                resolve();
                            }
                            else {
                                reject(error);
                            }
                        });
                    })];
            });
        });
    };
    DB.beginTrans = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (DB.countTransaction == 0) {
                    DB.countTransaction++;
                    return [2 /*return*/, DB.executeCommandTransaction('BEGIN TRANSACTION')];
                }
                DB.countTransaction++;
                return [2 /*return*/];
            });
        });
    };
    DB.commitTrans = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (DB.countTransaction) {
                    DB.countTransaction--;
                }
                if (!DB.countTransaction) {
                    return [2 /*return*/, DB.executeCommandTransaction('COMMIT')];
                }
                return [2 /*return*/];
            });
        });
    };
    DB.rollbackTrans = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (DB.countTransaction) {
                    DB.countTransaction--;
                }
                if (!DB.countTransaction) {
                    Console_1["default"].error('Transaction canceled');
                    return [2 /*return*/, DB.executeCommandTransaction('ROLLBACK')];
                }
                return [2 /*return*/];
            });
        });
    };
    DB.transOpened = function () {
        return DB.countTransaction > 0;
    };
    DB.close = function () {
        if (DB.countInstance > 0) {
            DB.countInstance--;
        }
        if (DB.countInstance == 0) {
            DB.instance.close();
        }
    };
    DB.countTransaction = 0;
    DB.countInstance = 0;
    return DB;
}());
exports["default"] = DB;
