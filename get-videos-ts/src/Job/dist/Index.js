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
var Index_1 = require("../DetailPage/Index");
var Index_2 = require("../LoadPage/Index");
var DetailDB_1 = require("../Database/DetailDB");
var Console_1 = require("./Console");
var Log_1 = require("./Log");
var Job = /** @class */ (function () {
    function Job() {
    }
    Job.filterMovies = function (movies) {
        return __awaiter(this, void 0, Promise, function () {
            var urlsToIgnore, filtered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DetailDB_1["default"].getUrlsToIgnore()];
                    case 1:
                        urlsToIgnore = _a.sent();
                        filtered = movies.filter(function (el) {
                            return urlsToIgnore.indexOf(el.url_detail) == -1;
                        });
                        return [2 /*return*/, filtered];
                }
            });
        });
    };
    Job.getMovieDetail = function (loadPage, movie) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var attemps, detailsMovie;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    Console_1["default"].neutral("=> Buscando detalhes do filme/seriado: " + movie.url_detail);
                                    attemps = 1;
                                    _a.label = 1;
                                case 1:
                                    if (!(attemps <= Job.MAX_ATTEMPS)) return [3 /*break*/, 3];
                                    Console_1["default"].warning("Realizando a " + attemps + "\u00B0 tentativa para buscar detalhes do filme/seriado: " + movie.url_detail, 'Tentativa');
                                    return [4 /*yield*/, Index_1["default"].fetchDetails(loadPage, movie.url_detail)["catch"](function (response) {
                                            Console_1["default"].error(response, "Erro ao tentar buscar detalhes do filme/seriado: " + movie.url_detail);
                                            return false;
                                        })];
                                case 2:
                                    detailsMovie = _a.sent();
                                    if (detailsMovie === false) {
                                        attemps++;
                                    }
                                    else {
                                        resolve({
                                            urlDetail: movie.url_detail,
                                            detail: detailsMovie
                                        });
                                        return [3 /*break*/, 3];
                                    }
                                    return [3 /*break*/, 1];
                                case 3:
                                    if (!(attemps > Job.MAX_ATTEMPS)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, DetailDB_1["default"].storeErrorMovie(movie.url_detail, "Tentativas m\u00E1xima de " + Job.MAX_ATTEMPS + " atingidas ao tentar buscar os detalhes do filme/seriado: " + movie.url_detail)];
                                case 4:
                                    _a.sent();
                                    resolve(null);
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Job.fetchAndSaveDetailsFilm = function (loadPage, movies, pageNumber) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var detailsMovieList, index, movieDetail, attemps, success, fullDetailsSaved;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    detailsMovieList = [];
                                    index = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(index < movies.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, Job.getMovieDetail(loadPage, movies[index])];
                                case 2:
                                    movieDetail = _a.sent();
                                    if (movieDetail) {
                                        detailsMovieList.push(movieDetail);
                                    }
                                    _a.label = 3;
                                case 3:
                                    index++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    if (!(detailsMovieList.length == 0)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, DetailDB_1["default"].storeErrorMovie('<LISTA VAZIA COM DETALHES DOS FILMES/SERIADOS>', "Lista vazia com os detalhes dos filmes/seriados da p\u00E1gina: " + pageNumber)];
                                case 5:
                                    _a.sent();
                                    resolve(false);
                                    return [3 /*break*/, 13];
                                case 6:
                                    Console_1["default"].neutral("=> Salvando os detalhes dos filmes/seriados da p\u00E1gina: " + pageNumber);
                                    attemps = 1;
                                    _a.label = 7;
                                case 7:
                                    if (!(attemps <= Job.MAX_ATTEMPS)) return [3 /*break*/, 9];
                                    Console_1["default"].warning("Realizando a " + attemps + "\u00B0 tentativa para salvar detalhes de filmes/seriados na base de dados", 'Tentativa');
                                    return [4 /*yield*/, DetailDB_1["default"].syncMoviesDetails(detailsMovieList).then(function () {
                                            return true;
                                        })["catch"](function (response) {
                                            Console_1["default"].error(response, "Erro ao tentar salvar os detalhes dos filmes/seriados na base de dados");
                                            return false;
                                        })];
                                case 8:
                                    success = _a.sent();
                                    if (!success) {
                                        attemps++;
                                    }
                                    else {
                                        return [3 /*break*/, 9];
                                    }
                                    return [3 /*break*/, 7];
                                case 9:
                                    if (!(attemps > Job.MAX_ATTEMPS)) return [3 /*break*/, 12];
                                    return [4 /*yield*/, DetailDB_1["default"].storeErrorMovie('<LISTA COM DETALHES DO FILMES/SERIADOS>', "Tentativas m\u00E1xima de " + Job.MAX_ATTEMPS + " atingidas para salvar a lista com os detalhes dos filmes/seriados da p\u00E1gina: " + pageNumber)];
                                case 10:
                                    _a.sent();
                                    return [4 /*yield*/, Log_1["default"].append('log_errors.txt', "\n\n P\u00E1gina (Details): " + pageNumber + " \n " + JSON.stringify(detailsMovieList))];
                                case 11:
                                    _a.sent();
                                    _a.label = 12;
                                case 12:
                                    fullDetailsSaved = movies.length === detailsMovieList.length;
                                    resolve(fullDetailsSaved);
                                    _a.label = 13;
                                case 13: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Job.fetchDetailsFromPage = function (loadPage, pageNumber) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var quantityPage, success;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    Console_1["default"].neutral("=> Buscando todos os filmes e seriados da p\u00E1gina: " + pageNumber);
                                    quantityPage = pageNumber;
                                    return [4 /*yield*/, Index_1["default"].fetchMovies(loadPage, pageNumber).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var movies;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        quantityPage = response.quantityPage;
                                                        return [4 /*yield*/, Job.filterMovies(response.movies)];
                                                    case 1:
                                                        movies = _a.sent();
                                                        if (!movies.length) return [3 /*break*/, 3];
                                                        Console_1["default"].neutral("=> Salvando todos os filmes e seriados da p\u00E1gina: " + pageNumber);
                                                        return [4 /*yield*/, DetailDB_1["default"].syncMovies(movies).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            Console_1["default"].success("Filmes da p\u00E1gina: " + pageNumber + " salvos com sucesso na base de dados");
                                                                            return [4 /*yield*/, Job.fetchAndSaveDetailsFilm(loadPage, movies, pageNumber)];
                                                                        case 1: return [2 /*return*/, _a.sent()];
                                                                    }
                                                                });
                                                            }); })["catch"](function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            Console_1["default"].error(response, "Erro ao tentar salvar filmes e seriados da p\u00E1gina: " + pageNumber + " na base de dados");
                                                                            return [4 /*yield*/, Log_1["default"].append('log_errors.txt', "\n\n P\u00E1gina (Movies): " + pageNumber + " \n " + JSON.stringify(movies))];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2 /*return*/, false];
                                                                    }
                                                                });
                                                            }); })];
                                                    case 2: return [2 /*return*/, _a.sent()];
                                                    case 3:
                                                        Console_1["default"].warning("Nenhum filme/serie para ser an\u00E1lisado na p\u00E1gina: " + pageNumber);
                                                        _a.label = 4;
                                                    case 4: return [2 /*return*/, true];
                                                }
                                            });
                                        }); })["catch"](function (response) {
                                            Console_1["default"].error(response, "Erro ao tentar buscar filmes e seriados da p\u00E1gina: " + pageNumber);
                                            return false;
                                        })];
                                case 1:
                                    success = (_a.sent());
                                    resolve({
                                        quantityPage: quantityPage,
                                        success: success
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Job.execute = function () {
        return __awaiter(this, void 0, Promise, function () {
            var loadPage, pageNumber, quantityPage, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadPage = new Index_2["default"](true);
                        pageNumber = 1;
                        quantityPage = 0;
                        _a.label = 1;
                    case 1:
                        if (!(pageNumber <= quantityPage || quantityPage == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Job.fetchDetailsFromPage(loadPage, pageNumber)];
                    case 2:
                        result = _a.sent();
                        if (result.success) {
                            quantityPage = result.quantityPage;
                        }
                        pageNumber++;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Job.MAX_ATTEMPS = 5;
    return Job;
}());
exports["default"] = Job;
