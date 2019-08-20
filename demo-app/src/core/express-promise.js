'use strict';

/**
 * Code from:
 * https://github.com/expressjs/express/pull/2809
 *
 * Target Express version: { "express": "^4.14.0 <5.0.0" }
 *
 * This monkey patch allows to return Promises from middleware and route handlers, rejections will be handled automaticaly.
 *
 * Please note:
 *  If you return something from `(...) -> void` callbacks - you shoot your own leg.
 *  This could lead to double error handling if your callback handles error and returns Promise same time.
 *  So, please check your middlewares and routes for abnormal `Promise` returns before applying patch.
 *
 */


const PACKAGE = require('express/package.json');
if (parseInt(PACKAGE.version.match(/^\d+/)[0]) !== 4) {
  throw new Error("This patch could be applied only for Express 4. " +
    "Express 5 will get it's own Promise handling.");
}

const Layer = require("express/lib/router/layer");
/*
    // https://github.com/expressjs/express/blob/9302acc5e449768b3ca2b03701d5379d86453af5/lib/router/layer.js
    // Target Function:

    Layer.prototype.handle_request = function handle(req, res, next) {
        const fn = this.handle;

        if (fn.length > 3) {
            // not a standard request handler
            return next();
        }

        try {
           fn(req, res, next);
        } catch (err) {
           next(err);
        }
    };
*/

if (!Layer.prototype.handle_request) {
  throw new Error("Something terribly wrong just happened, " +
    "there are no `Layer.prototype.handle_request` to apply patch to.");
}

Layer.prototype.handle_request = function handle(req, res, next) {
  const fn = this.handle;

  if (fn.length > 3) {
    // not a standard request handler
    return next();
  }

  try {
    const maybe_promise = fn(req, res, next);
    if (maybe_promise && maybe_promise.catch && typeof maybe_promise.catch === "function") {
      maybe_promise.catch(next);
    }
  } catch (err) {
    next(err);
  }
};