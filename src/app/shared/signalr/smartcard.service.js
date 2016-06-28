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
var core_1 = require('@angular/core');
var signalr_client_service_1 = require('./signalr-client.service');
// import {Dispatcher} from 'tkhyn/aurelia-flux';
// Flux bi trebalo da se zameni sa rxjs
// import {CardEventStore} from './cardEventStore';
//
//import {Router} from 'aurelia-router';
// router iz angulara
var SmartCardAuth = (function () {
    // constructor(auth,signalr,dispatcher,ces)
    function SmartCardAuth(signalrClient) {
        var _this = this;
        this.signalrClient = signalrClient;
        this.cardInsertedEmit = false;
        this.cardRemovedEmit = false;
        this.cardstatuschange = new core_1.EventEmitter();
        this.handleCardRemoved = function () {
            _this.cardRemoved = true;
            _this.cardInserted = false;
            _this.cardConnected = false;
            _this.userName = null;
            _this.cardNumber = null;
            _this.pinCode = null;
            if (!_this.cardRemovedEmit) {
                _this.emitCardStatusChangeEvent(0);
                _this.cardRemovedEmit = true;
                _this.cardInsertedEmit = false;
            }
            // this.dispatcher.dispatch('CardRemoved');
            //this.myrouter.navigate("#/login");
        };
        ///  };
        this.handleCardInserted = function () {
            _this.cardRemoved = false;
            _this.cardInserted = true;
            _this.cardConnected = false;
            _this.userName = null;
            _this.cardNumber = null;
            _this.pinCode = null;
            if (!_this.cardInsertedEmit) {
                _this.emitCardStatusChangeEvent(1);
                _this.cardInsertedEmit = true;
                _this.cardRemovedEmit = false;
            }
            // this.dispatcher.dispatch('CardInserted');
            //this.myrouter.navigate("#/login");
        };
        this.hubName = 'GemCardHub';
        this.hubCardInsertedFunc = 'cardInserted';
        this.hubCardRemovedFunc = 'cardRemoved';
        this.cardInserted = false;
        this.cardConnected = false;
        this.cardRemoved = true;
        this.cardError = false;
        this.hub = this.signalrClient;
        // this.auth = auth;
        // this.myrouter = null;
        this.userName = null;
        this.cardNumber = null;
        this.pinCode = null;
        this.proxy = null;
        this.hubStarted = false;
        // this.dispatcher = dispatcher;
    }
    SmartCardAuth.prototype.emitCardStatusChangeEvent = function (status) {
        this.cardstatuschange.emit(status);
    };
    SmartCardAuth.prototype.getCardStatusChangeEmitter = function () {
        return this.cardstatuschange;
    };
    SmartCardAuth.prototype.start = function () {
        var _this = this;
        this.hub.createHub(this.hubName);
        this.hub.setCallback(this.hubName, this.hubCardRemovedFunc, this.handleCardRemoved);
        this.hub.setCallback(this.hubName, this.hubCardInsertedFunc, this.handleCardInserted);
        return this.hub.start().then(function () {
            //alert('konektovao se!');
            console.log('Successfully CONNECTED on hub.');
            _this.hubStarted = true;
            _this.proxy = _this.hub.getHubProxy('GemCardHub');
            _this.proxy.invoke('InitCard').done(function (data) {
                console.log('Invocation of InitCard succeeded');
                _this.cardError = false;
                if (data === true)
                    return true;
            }).fail(function (error) {
                this.cardError = true;
                console.log('Invocation of InitCard failed. Error: ' + error);
            });
        });
        //this.proxy = this.hub.getHubProxy('GemCardHub');
    };
    SmartCardAuth.prototype.SelectCard = function () {
        try {
            return this.proxy.invoke('SelectCard');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of SelectCard failed. Error: ' + err);
        }
        finally {
        }
        return false;
    };
    SmartCardAuth.prototype.CardConnected = function () {
        var _this = this;
        try {
            this.proxy.invoke('CardConnected')
                .done(function (data) {
                console.log('Invocation of CardConnected succeeded');
                _this.cardError = false;
                if (data === true)
                    return true;
            }).fail(function (error) {
                this.cardError = true;
                console.log('Invocation of CardConnected failed. Error: ' + error);
            });
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of CardConnected failed. Error: ' + err);
        }
        finally {
        }
        return false;
    };
    SmartCardAuth.prototype.CardInserted = function () {
        try {
            return this.proxy.invoke('CardInserted');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of CardInserted failed. Error: ' + err);
        }
        finally {
        }
    };
    SmartCardAuth.prototype.InitCard = function () {
        var _this = this;
        this.proxy.invoke('InitCard').done(function (data) {
            console.log('Invocation of InitCard succeeded');
            _this.cardError = false;
            if (data === true)
                return true;
        }).fail(function (error) {
            this.cardError = true;
            console.log('Invocation of InitCard failed. Error: ' + error);
        });
        return false;
    };
    SmartCardAuth.prototype.GetCardData = function () {
        try {
            return this.proxy.invoke('GetCardData');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of GetCardData failed. Error: ' + err);
        }
        finally {
        }
        return;
    };
    SmartCardAuth.prototype.CardConnect = function () {
        try {
            return this.proxy.invoke('CardConnect');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of CardConnect failed. Error: ' + err);
        }
        finally {
        }
    };
    SmartCardAuth.prototype.CardDisconnect = function () {
        try {
            return this.proxy.invoke('CardDisconnect');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of CardDisconnect failed. Error: ' + err);
        }
        finally {
        }
    };
    SmartCardAuth.prototype.GetName = function () {
        try {
            return this.proxy.invoke('GetName');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of GetName failed. Error: ' + err);
        }
        finally {
        }
        return;
    };
    SmartCardAuth.prototype.GetCardNumber = function () {
        try {
            return this.proxy.invoke('GetCardNumber');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of GetCardNumber failed. Error: ' + err);
        }
        finally {
        }
        return;
    };
    SmartCardAuth.prototype.GetPIN = function () {
        try {
            return this.proxy.invoke('GetPIN');
        }
        catch (err) {
            this.cardError = true;
            console.log('Invocation of GetPIN failed. Error: ' + err);
        }
        finally {
        }
        return null;
    };
    SmartCardAuth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [signalr_client_service_1.SignalRClient])
    ], SmartCardAuth);
    return SmartCardAuth;
}());
exports.SmartCardAuth = SmartCardAuth;
//# sourceMappingURL=smartcard.service.js.map