import { Injectable, EventEmitter } from '@angular/core';
import { SignalRClient } from './signalr-client.service';

// import {Dispatcher} from 'tkhyn/aurelia-flux';
// Flux bi trebalo da se zameni sa rxjs
// import {CardEventStore} from './cardEventStore';
//
//import {Router} from 'aurelia-router';
// router iz angulara


@Injectable()
export class SmartCardAuth {
    hubName: string;
    hubCardInsertedFunc: string;
    hubCardRemovedFunc: string;
    cardInserted: boolean;
    cardConnected: boolean;
    cardRemoved: boolean;
    cardError: boolean;
    hub: any;
    userName: string;
    cardNumber: string;
    pinCode: string;
    proxy: any;
    hubStarted: boolean;

    cardInsertedEmit: boolean = false;
    cardRemovedEmit: boolean = false;

    cardstatuschange: EventEmitter<any> = new EventEmitter();

    // constructor(auth,signalr,dispatcher,ces)
    constructor(private signalrClient: SignalRClient) {
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

    emitCardStatusChangeEvent(status: number) {
        this.cardstatuschange.emit(status);
    }

    getCardStatusChangeEmitter() {
        return this.cardstatuschange;
    }

    start() {

        this.hub.createHub(this.hubName);
        this.hub.setCallback(this.hubName, this.hubCardRemovedFunc, this.handleCardRemoved);
        this.hub.setCallback(this.hubName, this.hubCardInsertedFunc, this.handleCardInserted);
        return this.hub.start().then(() => {
            //alert('konektovao se!');
            console.log('Successfully CONNECTED on hub.');
            this.hubStarted = true;
            this.proxy = this.hub.getHubProxy('GemCardHub');
            this.proxy.invoke('InitCard').done((data: any) => {
                console.log('Invocation of InitCard succeeded');
                this.cardError = false;
                if (data === true)
                    return true;
            }).fail(function (error: any) {
                this.cardError = true;
                console.log('Invocation of InitCard failed. Error: ' + error);
            });

        });
        //this.proxy = this.hub.getHubProxy('GemCardHub');
    }

    SelectCard() {
        try {
            return this.proxy.invoke('SelectCard');
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of SelectCard failed. Error: ' + err);
        } finally {

        }
        return false;
    }

    CardConnected() {
        try {
            this.proxy.invoke('CardConnected')
                .done((data: any) => {
                    console.log('Invocation of CardConnected succeeded');
                    this.cardError = false;
                    if (data === true)
                        return true;
                }).fail(function (error: any) {
                    this.cardError = true;
                    console.log('Invocation of CardConnected failed. Error: ' + error);
                });
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of CardConnected failed. Error: ' + err);
        } finally {

        }
        return false;
    }

    CardInserted() {
        try {
            return this.proxy.invoke('CardInserted');
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of CardInserted failed. Error: ' + err);
        } finally {

        }
    }

    InitCard() {
        this.proxy.invoke('InitCard').done((data: any) => {
            console.log('Invocation of InitCard succeeded');
            this.cardError = false;
            if (data === true)
                return true;
        }).fail(function (error: any) {
            this.cardError = true;
            console.log('Invocation of InitCard failed. Error: ' + error);
        });
        return false;
    }

    GetCardData() {
        try {
            return this.proxy.invoke('GetCardData');
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of GetCardData failed. Error: ' + err);
        } finally {

        }
        return;
    }

    CardConnect() {
        try {
            return this.proxy.invoke('CardConnect');

        } catch (err) {
            this.cardError = true;
            console.log('Invocation of CardConnect failed. Error: ' + err);
        } finally {

        }
    }

    CardDisconnect() {
        try {
            return this.proxy.invoke('CardDisconnect');
            // .done(() => {
            //         console.log ('Invocation of CardDisconnect succeeded');
            //         this.cardError = false;
            //     }).fail(function (error) {
            //       this.cardError = true;
            //       console.log('Invocation of CardDisconnect failed. Error: ' + error);
            //     });
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of CardDisconnect failed. Error: ' + err);
        } finally {

        }
    }

    GetName() {
        try {
            return this.proxy.invoke('GetName');
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of GetName failed. Error: ' + err);
        } finally {

        }
        return;
    }

    GetCardNumber() {
        try {
            return this.proxy.invoke('GetCardNumber');
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of GetCardNumber failed. Error: ' + err);
        } finally {

        }
        return;
    }

    GetPIN() {
        try {
            return this.proxy.invoke('GetPIN');
        } catch (err) {
            this.cardError = true;
            console.log('Invocation of GetPIN failed. Error: ' + err);
        } finally {

        }
        return null;
    }


    handleCardRemoved = () => {
        this.cardRemoved = true;
        this.cardInserted = false;
        this.cardConnected = false;
        this.userName = null;
        this.cardNumber = null;
        this.pinCode = null;
        if (!this.cardRemovedEmit) {
            this.emitCardStatusChangeEvent(0);
            this.cardRemovedEmit = true;
            this.cardInsertedEmit = false;
        }
        // this.dispatcher.dispatch('CardRemoved');
        //this.myrouter.navigate("#/login");
    }
    ///  };

    handleCardInserted = () => {
        this.cardRemoved = false;
        this.cardInserted = true;
        this.cardConnected = false;
        this.userName = null;
        this.cardNumber = null;
        this.pinCode = null;
        if (!this.cardInsertedEmit) {
            this.emitCardStatusChangeEvent(1);
            this.cardInsertedEmit = true;
            this.cardRemovedEmit = false;
        }
        // this.dispatcher.dispatch('CardInserted');
        //this.myrouter.navigate("#/login");
    }
    //  };
    //
    // stop() {
    //   this.hub.stop(this.hubName, this.hubFunc, this.handleNotifications);
    // }

}
