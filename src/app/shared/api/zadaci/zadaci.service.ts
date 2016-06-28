import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IZadatak } from '../../modeli/zadatak';
import { IPolje } from '../../modeli/polje';

@Injectable()
export class ZadaciService {
    private baseUrl = 'http://localhost:5000/api/zadaci/';

    constructor(private _http: Http) { }

    /**
     * GET zadaci
     * daje niz svih zadataka
     */
    getZadaci(): Observable<IZadatak[]> {
        return this._http
            .get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**
     * GET zadatak/:id
     * daje jedan zadatak na osnovu ZAD_ID
     */
    getZadatak(id: number): Observable<IZadatak> {
        return this._http
            .get(this.baseUrl + id.toString())
            .map(this.extractData)
            .catch(this.handleError);
    }


    /**
     * Pomocne funkcije
     */
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        let errMsg = error.message || error.statusText || 'Server Error';
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

}