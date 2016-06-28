import { Injectable } from '@angular/core';
import { Http,
    Response,
    Headers,
    RequestOptions,
    URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IRadnik } from '../../modeli/radnik';
import { IRadnikKartica } from '../../modeli/radnik-kartica';
import { IMeni } from '../../modeli/meni.interface';
import { SessionStorageService } from '../storage/session-storage.service';

@Injectable()
export class LoginService {
    private BASE_API_URL: string = 'http://localhost:5000/api/';
    private RADNIK_API_URL: string = 'login';
    private KARTICA_API_URL: string = 'LoginKartica';
    public cardAuthenticate: boolean = false;

    constructor(private _http: Http) {

    }

    /**
     * Metod koji salje pristupne podatke radnika i vraca objekat
     * radnika, sa dozvoljenim spiskom zadataka
     */
    postLogin(radnik: IRadnik): Observable<IRadnik> {
        let body = JSON.stringify(radnik);
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.cardAuthenticate = false;
        let options = new RequestOptions({ headers: headers });
        let url = this.BASE_API_URL + this.RADNIK_API_URL;
        return this._http.post(url, body, options)
            .map(this.extractData)
            //    .do((data: JSON) => this.setRadnikToSessionStorage(data))
            .catch(this.handleError);

    }

    /**
     * Metod koji salje pristupne podatke ID kartice i vraca objekat
     * radnika, sa dozvoljenim spiskom zadataka
     */
    postCardId(karticaId: IRadnikKartica): Observable<IRadnik> {
        this.cardAuthenticate = true;

        let body = JSON.stringify(karticaId);

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers });
        let url = this.BASE_API_URL + this.KARTICA_API_URL;
        return this._http.post(url, body, options)
            .map(this.extractData)
            //    .do((data: JSON) => this.setRadnikToSessionStorage(data))
            .catch(this.handleError);

    }

    public setCardAuthenticate(state: boolean) {
        this.cardAuthenticate = state;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        let errMsg = error.message || error.statusText || 'Server Error';
        console.log(errMsg);
        return Observable.throw(errMsg);
    }
    // private setRadnikToSessionStorage(body: JSON) {
    //     this._sessionStorage
    //         .setToSessionStorage(body);
    // }

}