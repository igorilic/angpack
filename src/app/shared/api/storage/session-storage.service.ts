import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionStorageService {
    item: any;
    constructor() { }

    setToSessionStorage(item: any): void {
        var itemJson = JSON.stringify(item);
        if (!sessionStorage.getItem(item)) {
            sessionStorage.setItem(item, itemJson);
        } else {
            console.log('item vec postoji');
        }
    }
}