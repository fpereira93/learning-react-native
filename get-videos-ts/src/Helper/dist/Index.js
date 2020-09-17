"use strict";
exports.__esModule = true;
exports.format_column = exports.escapeStr = exports.merror = void 0;
function merror(errors) {
    return { errors: errors };
}
exports.merror = merror;
function escapeStr(text) {
    return text.replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/'/g, "\''").replace(/"/g, "\\\"");
}
exports.escapeStr = escapeStr;
function format_column(value) {
    var _value = value === null || value === undefined ? null : value;
    if (typeof _value === 'string') {
        return escapeStr(_value);
    }
    return _value;
}
exports.format_column = format_column;
