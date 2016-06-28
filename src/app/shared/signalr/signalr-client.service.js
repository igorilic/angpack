"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import $ from 'jquery';
//make sure to run jspm install npm:ms-signalr-client
var $ = require('jquery');
require('ms-signalr-client');
var core_1 = require('@angular/core');
var SignalRClient = (function () {
    function SignalRClient() {
        this.connection = null;
        this.proxy = {};
        this.debug = true;
        this.running = false;
    }
    //   connection = null;
    SignalRClient.prototype.createHub = function (hubName) {
        if (!this.connection) {
            this.connection = $.hubConnection('http://localhost:8898/'); //{hubBaseUrl}
        }
        var hubName = hubName.toLocaleLowerCase();
        if (!this.connection.proxies[hubName]) {
            this.proxy = this.connection.createHubProxy(hubName);
            this.connection.proxies[hubName].funcs = {};
        }
    };
    SignalRClient.prototype.getHubProxy = function (hubName) {
        var hubName = hubName.toLocaleLowerCase();
        return this.connection.proxies[hubName];
    };
    SignalRClient.prototype.setCallback = function (hubName, funcName, callBack, cbNameOverride) {
        if (cbNameOverride === void 0) { cbNameOverride = null; }
        var hubName = hubName.toLocaleLowerCase();
        if (!this.connection.proxies[hubName].funcs[funcName]) {
            this.connection.proxies[hubName].funcs[funcName] = {};
            this.connection.proxies[hubName].on(funcName, function (data) {
                for (var _i = 0, _a = Object.keys(this.connection.proxies[hubName].funcs[funcName]); _i < _a.length; _i++) {
                    var func = _a[_i];
                    this.connection.proxies[hubName].funcs[funcName][func](data);
                }
            });
        }
        this.connection.proxies[hubName].funcs[funcName][cbNameOverride || callBack.name] = function (data) {
            callBack(data);
        };
    };
    SignalRClient.prototype.start = function () {
        if (!this.running) {
            //this.connection.start({ jsonp: true })
            return this.connection.start({ jsonp: false })
                .done(function () {
                this.running = true;
                if (this.debug)
                    // logger.debug('Konektovao se, connection Id=' + this.connection.id);
                    console.log('Konektovao se, connection Id=' + this.connection.id.toString());
                return true;
            })
                .fail(function () {
                if (this.debug)
                    console.log('Ne može da se konektuje');
                // logger.debug('Ne može da se konektuje');
                return false;
            });
        }
    };
    SignalRClient.prototype.stop = function (hubName, funcName, callBack, cbNameOverride) {
        if (cbNameOverride === void 0) { cbNameOverride = null; }
        if (this.running) {
            //   logger.debug('Hub zaustavljen.');
            console.log('Hub zaustavljen');
            if (this.connection.proxies[hubName]) {
                if (this.connection.proxies[hubName].funcs[funcName]) {
                    delete this.connection.proxies[hubName].funcs[funcName][cbNameOverride || callBack.name];
                }
                if (Object.keys(this.connection.proxies[hubName].funcs[funcName]).length === 0)
                    delete this.connection.proxies[hubName].funcs[funcName];
                if (Object.keys(this.connection.proxies[hubName].funcs).length === 0)
                    delete this.connection.proxies[hubName];
            }
            if (Object.keys(this.connection.proxies).length === 0) {
                this.connection.stop();
                this.running = false;
            }
        }
    };
    SignalRClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SignalRClient);
    return SignalRClient;
}());
exports.SignalRClient = SignalRClient;
//Example usage
// import {inject} from 'aurelia-framework';
// import {SignalRClient} from 'shared/signalr-client';
//
// @inject(SignalRClient)
// export class Test {
//   constructor(signalR) {
//     this.hubName = 'notificationHub';
//     this.hubFunc = 'getNotificaions';
//
//     this.hub = signalR;
//   }
//
//   activate() {
//     this.hub.createHub(this.hubName);
//     this.hub.setCallback(this.hubName, this.hubFunc, this.handleNotifications);
//     this.hub.start();
//   }
//
//   handleNotifications = (data) => {
//     data = $.parseJSON(data);
//     //handle notifications
//   };
//
//   deactivate() {
//     this.hub.stop(this.hubName, this.hubFunc, this.handleNotifications);
//   }
// } 
//# sourceMappingURL=signalr-client.service.js.map