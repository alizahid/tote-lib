'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var joi = require('@hapi/joi');
var get = _interopDefault(require('lodash.get'));
var path = require('path');

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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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

var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(message, status) {
        if (message === void 0) { message = 'unknown_error'; }
        if (status === void 0) { status = 500; }
        var _this = _super.call(this, message) || this;
        _this.name = 'Exception';
        _this.message = message;
        _this.status = status;
        return _this;
    }
    return Exception;
}(Error));

var NODE_ENV = process.env.NODE_ENV;
var Func = /** @class */ (function () {
    function Func(context, request) {
        this.context = context;
        this.request = {
            body: get(request, 'body', {}),
            headers: get(request, 'headers', {}),
            query: get(request, 'query', {})
        };
    }
    Func.prototype.status = function (status) {
        this.context.res.status = status;
        return this;
    };
    Func.prototype.send = function (body) {
        this.context.res.body = body;
        this.context.res.headers = {
            'content-type': 'application/json'
        };
        if (!this.context.res.status) {
            this.status(200);
        }
        return this;
    };
    Func.prototype.invoke = function () { };
    Func.prototype._validate = function () {
        var _a = this, schema = _a.schema, _b = _a.request, body = _b.body, query = _b.query;
        var request = {};
        if (schema.body) {
            request.body = body;
        }
        if (schema.query) {
            request.query = query;
        }
        var error = joi.validate(request, schema).error;
        if (error) {
            throw error;
        }
    };
    Func.bootstrap = function (Func) {
        var _this = this;
        return function (context, request) { return __awaiter(_this, void 0, void 0, function () {
            var func, body, error_1, details, message, name, _a, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // workaround for Azure Function host bug
                        if (NODE_ENV === 'development') {
                            console.log = context.log;
                        }
                        func = new Func(context, request);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (func.schema) {
                            func._validate();
                        }
                        return [4 /*yield*/, func.invoke()];
                    case 2:
                        body = _b.sent();
                        if (body) {
                            func.send(body);
                        }
                        else {
                            func.status(204);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        details = error_1.details, message = error_1.message, name = error_1.name, _a = error_1.status, status = _a === void 0 ? 500 : _a;
                        if (name === 'ValidationError') {
                            func.status(400).send({
                                data: details.map(function (_a) {
                                    var message = _a.message;
                                    return message;
                                }),
                                error: 'validation_error'
                            });
                            return [2 /*return*/];
                        }
                        func.status(status).send({
                            error: message
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    };
    return Func;
}());

var _this = undefined;
var invoke = (function (name, request) {
    if (request === void 0) { request = {}; }
    return __awaiter(_this, void 0, void 0, function () {
        var path$1, func, context, _a, body, status;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    path$1 = path.resolve('src', name);
                    return [4 /*yield*/, require(path$1).default
                        // @ts-ignore
                    ];
                case 1:
                    func = _b.sent();
                    context = {
                        res: {}
                    };
                    return [4 /*yield*/, func(context, request)];
                case 2:
                    _b.sent();
                    _a = context.res, body = _a.body, status = _a.status;
                    return [2 /*return*/, {
                            body: body,
                            status: status
                        }];
            }
        });
    });
});

exports.joi = joi;
exports.Exception = Exception;
exports.Func = Func;
exports.invoke = invoke;
