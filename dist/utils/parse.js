"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFileToCsv = void 0;
const csv_parse_1 = require("csv-parse");
const stream_1 = require("stream");
function parseFileToCsv(req, res, next) {
    var _a;
    let rows = [];
    const readStream = new stream_1.Readable();
    readStream.push((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
    readStream.push(null);
    readStream.pipe((0, csv_parse_1.parse)({ delimiter: "," })).on("data", function (row) {
        rows.push(row);
    }).on("end", function () {
        req.body = rows;
        next();
    }).on("error", function (error) {
        return res.status(400).json("Error parsing file");
    });
    return;
}
exports.parseFileToCsv = parseFileToCsv;
