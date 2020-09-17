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
var moment_1 = require("moment");
var HelperDB_1 = require("./HelperDB");
var Index_1 = require("../Helper/Index");
var DetailDB = /** @class */ (function () {
    function DetailDB() {
    }
    DetailDB.removeMovies = function (urlDetailList, db) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var urlsQuoted, stmt_1;
                        return __generator(this, function (_a) {
                            try {
                                urlsQuoted = urlDetailList.map(function (detail) { return "'" + detail + "'"; }).join(',');
                                stmt_1 = db.prepare("delete from movie where url_detail in (" + urlsQuoted + ")");
                                stmt_1.run(function (error) {
                                    if (error) {
                                        reject(Index_1.merror(['# Error run command to delete list of movies']));
                                    }
                                    else {
                                        stmt_1.finalize(function (error) {
                                            if (!error) {
                                                resolve();
                                            }
                                            else {
                                                reject(Index_1.merror(['# Error ending command to delete the list of movies']));
                                            }
                                        });
                                    }
                                });
                            }
                            catch (error) {
                                reject(Index_1.merror(['# Unknown error when trying to delete the movie list']));
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.resetDetailMovies = function (urlDetailList, db) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var urlsQuoted = urlDetailList.map(function (detail) { return "'" + detail + "'"; }).join(',');
                            var query = "\n                    delete from serie_season where id_movie in (select id from movie where url_detail in (" + urlsQuoted + "));\n                    delete from error_movie where url_detail in (" + urlsQuoted + ");\n                    delete from genres where id_movie in (select id from movie where url_detail in (" + urlsQuoted + "));\n                    update movie set date = null, country = null, duration = null, content_rating = null, url_film = null where url_detail in (" + urlsQuoted + ");\n                ";
                            db.exec(query, function (error) {
                                if (!error) {
                                    resolve();
                                }
                                else {
                                    reject(Index_1.merror(['# Error run command to reset details of movies']));
                                }
                            });
                        }
                        catch (error) {
                            reject(Index_1.merror(['# Unknown error when trying to reset the movies details']));
                        }
                    })];
            });
        });
    };
    DetailDB.saveMovies = function (movies, db) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            try {
                                movies.forEach(function (movie, index) {
                                    var stmt = db.prepare("insert into movie (name, sinopse, rating, url_image, url_detail, group_film) values (?, ?, ?, ?, ?, ?)");
                                    stmt.run(Index_1.format_column(movie.name), Index_1.format_column(movie.sinopse), Index_1.format_column(movie.rating), Index_1.format_column(movie.url_image), Index_1.format_column(movie.url_detail), Index_1.format_column(movie.group_film));
                                    stmt.finalize(function (error) {
                                        if (!error) {
                                            resolve();
                                        }
                                        else if (index == movies.length - 1) {
                                            reject(Index_1.merror(['# Error trying to insert the movie']));
                                        }
                                    });
                                });
                            }
                            catch (error) {
                                reject(Index_1.merror(['# Unknown error when trying to save movies']));
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.syncMovies = function (movies) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            HelperDB_1["default"].scope(function (db) { return __awaiter(_this, void 0, void 0, function () {
                                var urlDetailList;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            urlDetailList = movies.map(function (item) { return item.url_detail; });
                                            return [4 /*yield*/, DetailDB.removeMovies(urlDetailList, db)["catch"](function (error) {
                                                    reject(error);
                                                    throw error;
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, DetailDB.saveMovies(movies, db)["catch"](function (error) {
                                                    reject(error);
                                                    throw error;
                                                })];
                                        case 2:
                                            _a.sent();
                                            resolve();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.getKeysMoviesByUrlsDetail = function (urlDetailList, db) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var urlsQuoted, query;
                        return __generator(this, function (_a) {
                            urlsQuoted = urlDetailList.map(function (detail) { return "'" + detail + "'"; }).join(',');
                            query = "select id, url_detail from movie where url_detail in (" + urlsQuoted + ")";
                            db.all(query, function (error, rows) {
                                if (!error) {
                                    var mapping = {};
                                    for (var index = 0; index < rows.length; index++) {
                                        var movie = rows[index];
                                        mapping[movie.url_detail] = movie.id;
                                    }
                                    resolve(mapping);
                                }
                                else {
                                    reject(Index_1.merror(['# Error trying to get movie keys']));
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.insertSeasonSerie = function (keyMovie, season, db) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var stmt;
                        return __generator(this, function (_a) {
                            try {
                                stmt = db.prepare('insert into serie_season (sequence, name, id_movie) values (?, ?, ?)');
                                stmt.run(Index_1.format_column(season.sequence), Index_1.format_column(season.name), Index_1.format_column(keyMovie), function (error) {
                                    if (!error) {
                                        resolve(this.lastID);
                                    }
                                    else {
                                        reject(Index_1.merror(['# Error trying to insert season']));
                                    }
                                });
                            }
                            catch (error) {
                                reject(Index_1.merror(['# Unknown error when trying to insert season']));
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.insertEpisodesSeason = function (keySeason, episodes, db) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var episodesToInsert, query;
                        return __generator(this, function (_a) {
                            try {
                                episodesToInsert = episodes.map(function (episode) {
                                    return "(\n                        '" + Index_1.format_column(episode.name) + "',\n                         " + Index_1.format_column(keySeason) + ",\n                        '" + Index_1.format_column(episode.url_image) + "',\n                        '" + Index_1.format_column(episode.url_video) + "',\n                         " + Index_1.format_column(episode.sequence) + "\n                    )";
                                }).join(',');
                                query = "insert into season_episode (name, id_serie_season, url_image, url_video, sequence) values " + episodesToInsert + " ";
                                db.exec(query, function (error) {
                                    if (!error) {
                                        resolve();
                                    }
                                    else {
                                        reject(Index_1.merror(['# Error run command to insert Episodes']));
                                    }
                                });
                            }
                            catch (error) {
                                reject(Index_1.merror(['# Unknown error when trying to insert episodes']));
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.syncDetailSerie = function (detail, db, keyMovie) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var seasons, index, season, keySeason, error_1;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 6, , 7]);
                                    seasons = (_a = detail.seasons) !== null && _a !== void 0 ? _a : [];
                                    index = 0;
                                    _b.label = 1;
                                case 1:
                                    if (!(index < seasons.length)) return [3 /*break*/, 5];
                                    season = seasons[index];
                                    return [4 /*yield*/, DetailDB.insertSeasonSerie(keyMovie, season, db)["catch"](function (response) {
                                            throw response;
                                        })];
                                case 2:
                                    keySeason = _b.sent();
                                    if (season.episodes.length == 0) {
                                        return [3 /*break*/, 4];
                                    }
                                    return [4 /*yield*/, DetailDB.insertEpisodesSeason(keySeason, season.episodes, db)["catch"](function (response) {
                                            throw response;
                                        })];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4:
                                    index++;
                                    return [3 /*break*/, 1];
                                case 5:
                                    resolve();
                                    return [3 /*break*/, 7];
                                case 6:
                                    error_1 = _b.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailDB.syncDetailFilm = function (detail, db, keyMovie) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var stmt;
                        var _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            try {
                                try {
                                    stmt = db.prepare('update movie set date = ?, country = ?, duration = ?, content_rating = ?, url_film = ? where id = ?');
                                    stmt.run(Index_1.format_column((_a = detail.extra) === null || _a === void 0 ? void 0 : _a.date), Index_1.format_column((_b = detail.extra) === null || _b === void 0 ? void 0 : _b.country), Index_1.format_column((_c = detail.extra) === null || _c === void 0 ? void 0 : _c.duration), Index_1.format_column((_d = detail.extra) === null || _d === void 0 ? void 0 : _d.content_rating), Index_1.format_column((_e = detail.extra) === null || _e === void 0 ? void 0 : _e.url_film), Index_1.format_column(keyMovie), function (error) {
                                        if (!error) {
                                            resolve(this.lastID);
                                        }
                                        else {
                                            reject(Index_1.merror(['# Error trying to update detail movie']));
                                        }
                                    });
                                }
                                catch (error) {
                                    reject(Index_1.merror(['# Unknown error when trying to update movie']));
                                }
                            }
                            catch (error) {
                                reject(error);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.syncUrlDetailsJobToday = function (urlDetailList, db) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var dateToday_1, urlsToInsert, query;
                        return __generator(this, function (_a) {
                            try {
                                dateToday_1 = moment_1["default"]().format('YYYY-MM-DD H:mm:ss');
                                urlsToInsert = urlDetailList.map(function (url) {
                                    return "('" + url + "', '" + dateToday_1 + "')";
                                }).join(',');
                                query = "insert into job_control (url_detail, date) values " + urlsToInsert + " ";
                                db.exec(query, function (error) {
                                    if (!error) {
                                        resolve();
                                    }
                                    else {
                                        reject(Index_1.merror(['# Error run command to insert Urls Job Featch Details']));
                                    }
                                });
                            }
                            catch (error) {
                                reject(Index_1.merror(['# Unknown error when trying to insert Urls Job Featch Details']));
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.getUrlsToIgnore = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, HelperDB_1["default"].promise(function (db, resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var today, query;
                        return __generator(this, function (_a) {
                            today = moment_1["default"]().format('YYYY-MM-DD');
                            query = "select url_detail from job_control where date(date) = '" + today + "' and (ignore is null or ignore = 0)";
                            db.all(query, function (error, rows) {
                                if (!error) {
                                    var urls = rows.map(function (row) {
                                        return row.url_detail;
                                    });
                                    resolve(urls);
                                }
                                else {
                                    reject(Index_1.merror(['# Error trying to get Urls To Ignore']));
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DetailDB.syncMoviesDetails = function (detailMovies) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, HelperDB_1["default"].promise(function (db, resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var urlDetailList, keysMovie, index, data, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 9, , 10]);
                                    urlDetailList = detailMovies.map(function (item) { return item.urlDetail; });
                                    return [4 /*yield*/, DetailDB.resetDetailMovies(urlDetailList, db)["catch"](function (reponse) {
                                            throw reponse;
                                        })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, DetailDB.getKeysMoviesByUrlsDetail(urlDetailList, db)];
                                case 2:
                                    keysMovie = _a.sent();
                                    index = 0;
                                    _a.label = 3;
                                case 3:
                                    if (!(index < detailMovies.length)) return [3 /*break*/, 8];
                                    data = detailMovies[index];
                                    if (!data.detail.is_serie) return [3 /*break*/, 5];
                                    return [4 /*yield*/, DetailDB.syncDetailSerie(data.detail, db, keysMovie[data.urlDetail])["catch"](function (response) {
                                            throw response;
                                        })];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5: return [4 /*yield*/, DetailDB.syncDetailFilm(data.detail, db, keysMovie[data.urlDetail])["catch"](function (response) {
                                        throw response;
                                    })];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7:
                                    index++;
                                    return [3 /*break*/, 3];
                                case 8:
                                    DetailDB.syncUrlDetailsJobToday(urlDetailList, db)["catch"](function (reponse) {
                                        throw reponse;
                                    });
                                    console.log('# Resolvido');
                                    resolve();
                                    return [3 /*break*/, 10];
                                case 9:
                                    error_2 = _a.sent();
                                    console.log('# Rejeitado');
                                    reject(error_2);
                                    return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DetailDB.storeErrorMovie = function (urlDetail, text) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, HelperDB_1["default"].promise(function (db, resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var stmt;
                        return __generator(this, function (_a) {
                            try {
                                try {
                                    stmt = db.prepare('insert into error_movie (url_detail, error_text) values (?, ?)');
                                    stmt.run(urlDetail, Index_1.format_column(text), function (error) {
                                        if (!error) {
                                            resolve(this.lastID);
                                        }
                                        else {
                                            reject(Index_1.merror(['# Error trying to insert error movie']));
                                        }
                                    });
                                }
                                catch (error) {
                                    reject(Index_1.merror(['# Unknown error when trying to insert error movie']));
                                }
                            }
                            catch (error) {
                                reject(error);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    return DetailDB;
}());
exports["default"] = DetailDB;
