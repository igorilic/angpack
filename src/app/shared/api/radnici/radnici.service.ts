import { Injectable } from '@angular/core';
import { Http,
    Response,
    Headers,
    RequestOptions,
    URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IRadnik } from '../../modeli/radnik';
import { IMeni } from '../../modeli/meni.interface';
import { SessionStorageService } from '../storage/session-storage.service';
@Injectable()
export class RadniciService {
    private apiUrl: string = 'http://localhost:5000/api/radnici/'
    constructor(private _http: Http) { }

    getRadnici(): Observable<IRadnik[]> {
        return this._http
            .get(this.apiUrl)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    getRadnik(id: number): Observable<IRadnik> {
        let _id: string = id.toString();
        let url = this.apiUrl + _id;
        return this._http
            .get(url)
            .map((res: Response) => res.json())
            .do(data => console.log(JSON.stringify(data)))
            .catch(this.handleError);

    }


    private handleError(error: any) {
        let errMsg = error.message || error.statusText || 'Server Error';
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

}