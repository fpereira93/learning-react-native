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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Index_1 = require("../Helper/Index");
var Index_2 = require("../UsefulPage/Index");
var DetailPage = /** @class */ (function () {
    function DetailPage() {
    }
    DetailPage.getMaxPage = function (page) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var querySelector, elementWithMaxPage, text, maxPage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    querySelector = '.pagination span:first-child';
                                    return [4 /*yield*/, page.$(querySelector)];
                                case 1:
                                    elementWithMaxPage = _a.sent();
                                    if (!elementWithMaxPage) return [3 /*break*/, 3];
                                    return [4 /*yield*/, elementWithMaxPage.evaluate(function (node) { return node.innerText; })];
                                case 2:
                                    text = _a.sent();
                                    maxPage = parseInt(text.split('of')[1].trim());
                                    resolve(maxPage);
                                    return [3 /*break*/, 4];
                                case 3:
                                    reject(Index_1.merror(['# Error trying to get the page number']));
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.mappingMovies = function (elements) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var movies;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Index_2["default"].toArray(elements, function (element) { return __awaiter(_this, void 0, void 0, function () {
                                        var name, url_detail, url_image, groupFilmes, groupSeries, group_film, sinopse, yearResult, year, ratingResult, rating, movieData;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, Index_2["default"].getTextElement(element, '.details .title')];
                                                case 1:
                                                    name = _a.sent();
                                                    return [4 /*yield*/, Index_2["default"].getPropertyElement(element, 'href', '.details .title a')];
                                                case 2:
                                                    url_detail = _a.sent();
                                                    return [4 /*yield*/, Index_2["default"].getPropertyElement(element, 'src', 'article .image img')];
                                                case 3:
                                                    url_image = _a.sent();
                                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, 'article .image span.movies')];
                                                case 4:
                                                    groupFilmes = _a.sent();
                                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, 'article .image span.tvshows')];
                                                case 5:
                                                    groupSeries = _a.sent();
                                                    group_film = groupFilmes ? groupFilmes : groupSeries;
                                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, '.details .contenido')];
                                                case 6:
                                                    sinopse = _a.sent();
                                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, '.details .meta .year')];
                                                case 7:
                                                    yearResult = _a.sent();
                                                    year = yearResult ? parseInt(yearResult) : null;
                                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, '.details .meta .rating')];
                                                case 8:
                                                    ratingResult = _a.sent();
                                                    rating = ratingResult ? parseFloat(ratingResult.replace(/[^0-9,.]/gi, '')) : null;
                                                    movieData = {
                                                        name: name,
                                                        sinopse: sinopse,
                                                        year: year,
                                                        rating: rating,
                                                        url_image: url_image,
                                                        url_detail: url_detail,
                                                        group_film: group_film
                                                    };
                                                    return [2 /*return*/, movieData];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    movies = (_a.sent());
                                    resolve(movies);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.fetchMovies = function (browser, pageNumber) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url, browserInfo, quantityPage;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    url = "http://filmesonlinehls.com/page/" + pageNumber + "/?s";
                                    return [4 /*yield*/, browser.load(url).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        browserInfo = response;
                                                        return [4 /*yield*/, DetailPage.getMaxPage(response.page)["catch"](function (response) {
                                                                throw response;
                                                            })];
                                                    case 1:
                                                        quantityPage = _a.sent();
                                                        return [4 /*yield*/, Index_2["default"].waitQuerySelector({
                                                                page: response.page,
                                                                selector: '.search-page .result-item'
                                                            }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                                                var movies;
                                                                var _a;
                                                                return __generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0: return [4 /*yield*/, DetailPage.mappingMovies((_a = response.elements) !== null && _a !== void 0 ? _a : [])["catch"](function (response) {
                                                                                throw response;
                                                                            })];
                                                                        case 1:
                                                                            movies = _b.sent();
                                                                            resolve({
                                                                                quantityPage: quantityPage,
                                                                                movies: movies
                                                                            });
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); })["catch"](function (response) {
                                                                reject(response);
                                                            })];
                                                    case 2:
                                                        _a.sent();
                                                        return [4 /*yield*/, response.loadpage.closePage(response.page, false)];
                                                    case 3:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })["catch"](function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        reject(response);
                                                        if (!browserInfo) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, browserInfo.loadpage.closePage(browserInfo.page, false)];
                                                    case 1:
                                                        _a.sent();
                                                        return [3 /*break*/, 4];
                                                    case 2:
                                                        if (!response.page) return [3 /*break*/, 4];
                                                        return [4 /*yield*/, response.loadpage.closePage(response.page, false)];
                                                    case 3:
                                                        _a.sent();
                                                        _a.label = 4;
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.isSeriePage = function (page) {
        return __awaiter(this, void 0, Promise, function () {
            var request, isSerie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            page: page,
                            selector: '#serie_contenido'
                        };
                        return [4 /*yield*/, Index_2["default"].waitQuerySelector(request).then(function (response) {
                                if (response.elements && response.elements.length > 0) {
                                    return true;
                                }
                                return false;
                            })["catch"](function () { return false; })];
                    case 1:
                        isSerie = _a.sent();
                        return [2 /*return*/, isSerie];
                }
            });
        });
    };
    DetailPage.getUrlEpisode = function (browser, urlToSearchUrlVideo) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var maxAttemps, attemps, isSuccess, title, url, errors, onInterceptRequest, responseLoad, result;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    maxAttemps = 5;
                                    attemps = 1;
                                    isSuccess = false;
                                    title = '';
                                    url = '';
                                    errors = [];
                                    onInterceptRequest = function (request) {
                                        if (request.url().endsWith('.mp4') && !url) {
                                            url = request.url();
                                        }
                                        request["continue"]();
                                    };
                                    _a.label = 1;
                                case 1:
                                    if (!(attemps <= maxAttemps)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, browser.load(urlToSearchUrlVideo, onInterceptRequest).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var title;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, Index_2["default"].getTextElement(response.page, '.wp-content .epih3')];
                                                    case 1:
                                                        title = _a.sent();
                                                        return [4 /*yield*/, response.loadpage.closePage(response.page, false)];
                                                    case 2:
                                                        _a.sent();
                                                        return [2 /*return*/, title];
                                                }
                                            });
                                        }); })["catch"](function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, response.loadpage.closePage(response.page, false)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/, response];
                                                }
                                            });
                                        }); })];
                                case 2:
                                    responseLoad = (_a.sent());
                                    if (typeof responseLoad === 'string') {
                                        isSuccess = true;
                                        title = responseLoad;
                                        return [3 /*break*/, 3];
                                    }
                                    else {
                                        isSuccess = false;
                                        errors.push("# Error on try Fetch title Episode, attemp: " + attemps);
                                    }
                                    attemps++;
                                    return [3 /*break*/, 1];
                                case 3:
                                    result = { title: title, url: url };
                                    if (isSuccess === true) {
                                        resolve(result);
                                    }
                                    else {
                                        reject(Index_1.merror(errors));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.getListEpisodes = function (browser, element) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var name, sequence, _a, params, episodes, season, error_1;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 4, , 5]);
                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, '.se-q span.title')];
                                case 1:
                                    name = (_b.sent()).replace('▾', '').trim();
                                    _a = parseInt;
                                    return [4 /*yield*/, Index_2["default"].getTextElement(element, '.se-q span.se-t')];
                                case 2:
                                    sequence = _a.apply(void 0, [_b.sent()]);
                                    params = {
                                        page: element,
                                        selector: 'ul.episodios li'
                                    };
                                    return [4 /*yield*/, Index_2["default"].waitQuerySelector(params).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var converted;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, Index_2["default"].toArray(response.elements, function (element) { return __awaiter(_this, void 0, void 0, function () {
                                                            var sequence, _a, url_image, urlToSearchVideo, video, episode;
                                                            return __generator(this, function (_b) {
                                                                switch (_b.label) {
                                                                    case 0:
                                                                        _a = parseInt;
                                                                        return [4 /*yield*/, Index_2["default"].getTextElement(element, '.numerando')];
                                                                    case 1:
                                                                        sequence = _a.apply(void 0, [(_b.sent()).replace(/[^0-9]/gi, '')]);
                                                                        return [4 /*yield*/, Index_2["default"].getPropertyElement(element, 'src', '.imagen img')];
                                                                    case 2:
                                                                        url_image = _b.sent();
                                                                        return [4 /*yield*/, Index_2["default"].getPropertyElement(element, 'href', '.episodiotitle a')];
                                                                    case 3:
                                                                        urlToSearchVideo = _b.sent();
                                                                        return [4 /*yield*/, DetailPage.getUrlEpisode(browser, urlToSearchVideo)["catch"](function (response) {
                                                                                throw response;
                                                                            })];
                                                                    case 4:
                                                                        video = _b.sent();
                                                                        episode = {
                                                                            name: video.title,
                                                                            url_image: url_image,
                                                                            sequence: sequence,
                                                                            url_video: video.url
                                                                        };
                                                                        return [2 /*return*/, episode];
                                                                }
                                                            });
                                                        }); })];
                                                    case 1:
                                                        converted = _a.sent();
                                                        return [2 /*return*/, converted];
                                                }
                                            });
                                        }); })["catch"](function (response) {
                                            throw response;
                                        })];
                                case 3:
                                    episodes = _b.sent();
                                    season = {
                                        name: name,
                                        sequence: sequence,
                                        episodes: episodes
                                    };
                                    resolve(season);
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.getInformationSeasons = function (browser, page) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var maxAttemps, errors, isSuccess, attemps, seasons;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    maxAttemps = 5;
                                    errors = [];
                                    isSuccess = false;
                                    attemps = 1;
                                    seasons = [];
                                    _a.label = 1;
                                case 1:
                                    if (!(attemps <= maxAttemps)) return [3 /*break*/, 3];
                                    isSuccess = false;
                                    return [4 /*yield*/, Index_2["default"].waitQuerySelector({
                                            page: page,
                                            selector: '#serie_contenido #seasons .se-c'
                                        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var _this = this;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, Index_2["default"].toArray((_a = response.elements) !== null && _a !== void 0 ? _a : [], function (element) { return __awaiter(_this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, DetailPage.getListEpisodes(browser, element)];
                                                                    case 1: return [2 /*return*/, _a.sent()];
                                                                }
                                                            });
                                                        }); })["catch"](function (response) {
                                                            throw response;
                                                        })];
                                                    case 1:
                                                        seasons = _b.sent();
                                                        isSuccess = seasons.length > 0;
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })["catch"](function (response) {
                                            errors = __spreadArrays(errors, response.errors);
                                        })];
                                case 2:
                                    _a.sent();
                                    if (isSuccess) {
                                        return [3 /*break*/, 3];
                                    }
                                    else {
                                        errors = __spreadArrays(errors, ["# Error on try Fetch title Seasons, attemp: " + attemps]);
                                    }
                                    attemps++;
                                    return [3 /*break*/, 1];
                                case 3:
                                    if (isSuccess) {
                                        resolve(seasons);
                                    }
                                    else {
                                        reject(Index_1.merror(errors));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.getGenres = function (page, selector) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var errors, genres, selectorPromise;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    errors = [];
                                    genres = [];
                                    return [4 /*yield*/, Index_2["default"].waitQuerySelector({
                                            page: page,
                                            selector: selector
                                        })["catch"](function (response) {
                                            errors.push('# Error trying to catch series genres');
                                        })];
                                case 1:
                                    selectorPromise = _a.sent();
                                    if (!selectorPromise) return [3 /*break*/, 3];
                                    return [4 /*yield*/, Index_2["default"].toArray(selectorPromise.elements, function (element) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, Index_2["default"].getTextElement(element)];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        }); })];
                                case 2:
                                    genres = _a.sent();
                                    _a.label = 3;
                                case 3:
                                    if (!genres.length) {
                                        errors.push('# No genres found');
                                    }
                                    if (!errors.length) {
                                        resolve(genres);
                                    }
                                    else {
                                        reject(Index_1.merror(errors));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.getInfoExtraFilme = function (page) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var date, country, duration, content_rating, errors, contentRating1, contentRating2, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    date = '';
                                    country = '';
                                    duration = '';
                                    content_rating = '';
                                    errors = [];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 7, , 8]);
                                    return [4 /*yield*/, Index_2["default"].getTextElement(page, '.extra span.date')];
                                case 2:
                                    date = _a.sent();
                                    return [4 /*yield*/, Index_2["default"].getTextElement(page, '.extra span.country')];
                                case 3:
                                    country = _a.sent();
                                    return [4 /*yield*/, Index_2["default"].getTextElement(page, '.extra span.runtime')];
                                case 4:
                                    duration = _a.sent();
                                    return [4 /*yield*/, Index_2["default"].getTextElement(page, '.extra span.contentRating')];
                                case 5:
                                    contentRating1 = _a.sent();
                                    return [4 /*yield*/, Index_2["default"].getTextElement(page, '.extra span.rated')];
                                case 6:
                                    contentRating2 = _a.sent();
                                    content_rating = contentRating1 !== null && contentRating1 !== void 0 ? contentRating1 : contentRating2;
                                    return [3 /*break*/, 8];
                                case 7:
                                    error_2 = _a.sent();
                                    errors.push('# Error trying to catch series genres');
                                    return [3 /*break*/, 8];
                                case 8:
                                    if (!errors.length) {
                                        resolve({
                                            date: date,
                                            country: country,
                                            duration: duration,
                                            content_rating: content_rating,
                                            url_film: ''
                                        });
                                    }
                                    else {
                                        reject(Index_1.merror(errors));
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailPage.fetchDetails = function (browser, urlDetail) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var urlFilm, onInterceptRequest;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    urlFilm = '';
                                    onInterceptRequest = function (request) {
                                        if (request.url().endsWith('.mp4') && !urlFilm) {
                                            urlFilm = request.url();
                                        }
                                        request["continue"]();
                                    };
                                    return [4 /*yield*/, browser.load(urlDetail, onInterceptRequest).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            var isSerie, seasons, genres, seasonData, genres, extra, seasonData, error_3;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 8, 9, 11]);
                                                        return [4 /*yield*/, DetailPage.isSeriePage(response.page)];
                                                    case 1:
                                                        isSerie = _a.sent();
                                                        if (!isSerie) return [3 /*break*/, 4];
                                                        return [4 /*yield*/, DetailPage.getInformationSeasons(browser, response.page)["catch"](function (response) {
                                                                throw response;
                                                            })];
                                                    case 2:
                                                        seasons = _a.sent();
                                                        return [4 /*yield*/, DetailPage.getGenres(response.page, '.seriesGenre a li')["catch"](function (response) {
                                                                throw response;
                                                            })];
                                                    case 3:
                                                        genres = _a.sent();
                                                        seasonData = {
                                                            is_serie: true,
                                                            seasons: seasons,
                                                            genres: genres
                                                        };
                                                        resolve(seasonData);
                                                        return [3 /*break*/, 7];
                                                    case 4: return [4 /*yield*/, DetailPage.getGenres(response.page, '.sgeneros a')["catch"](function (response) {
                                                            throw response;
                                                        })];
                                                    case 5:
                                                        genres = _a.sent();
                                                        return [4 /*yield*/, DetailPage.getInfoExtraFilme(response.page)["catch"](function (response) {
                                                                throw response;
                                                            })];
                                                    case 6:
                                                        extra = _a.sent();
                                                        extra.url_film = urlFilm;
                                                        seasonData = {
                                                            is_serie: false,
                                                            extra: extra,
                                                            genres: genres
                                                        };
                                                        resolve(seasonData);
                                                        _a.label = 7;
                                                    case 7: return [3 /*break*/, 11];
                                                    case 8:
                                                        error_3 = _a.sent();
                                                        reject(error_3);
                                                        return [3 /*break*/, 11];
                                                    case 9: return [4 /*yield*/, response.loadpage.closePage(response.page)];
                                                    case 10:
                                                        _a.sent();
                                                        return [7 /*endfinally*/];
                                                    case 11: return [2 /*return*/];
                                                }
                                            });
                                        }); })["catch"](function (response) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        reject(response);
                                                        return [4 /*yield*/, response.loadpage.closePage(response.page, false)];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return DetailPage;
}());
exports["default"] = DetailPage;
