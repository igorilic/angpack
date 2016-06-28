import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { TestLoginService } from '../../../shared/api/loginservice/test.login.service';
import { IRadnik } from '../../../shared/modeli/radnik';
// servisi
import { SmartCardAuth } from '../../../shared/signalr/smartcard.service';
import { LoginService } from '../../../shared/api/loginservice/login.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    //styleUrls: ['login.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [TestLoginService, SmartCardAuth, LoginService]
})
export class LoginComponent implements OnInit {
    sifra: string = '';
    password: string = '';
    ispravanUnos: boolean;

    cardAuthenticate: boolean = false;
    cardError: boolean = true;

    pinCodeIn: string = '';
    pinCode: string = '';
    cardNumber: string = '';
    userName: string = '';
    badPin = false;
    cardData: boolean = false;
    cardsubscription: any;
    cardStatus: number;

    constructor(private _router: Router,
        private _loginService: LoginService,
        private _smartCardAuth: SmartCardAuth) {

        this.cardsubscription = this._smartCardAuth.getCardStatusChangeEmitter()
            .subscribe(item => this.cardStatusChange(item));
        if (this._smartCardAuth.hubStarted)
            return;
        this._smartCardAuth.start()
            .then(() => this._smartCardAuth.SelectCard()
                .done((data: any) => {
                    console.log('Uspesna realizacija SelectCarda');
                    if (data === false) {
                        this._smartCardAuth.cardInserted = false;
                        this._smartCardAuth.cardRemoved = true;
                        this._smartCardAuth.cardError = false;
                        return;
                    }

                    this._smartCardAuth.cardInserted = true;
                    this._smartCardAuth.cardRemoved = false;
                    this._smartCardAuth.cardError = true;

                    this.cardAuthenticate = true;

                    this._smartCardAuth.GetCardData()
                        .done((cardData: any) => {
                            if (cardData !== null) {
                                this.pinCode = cardData.PIN;
                                this.cardNumber = cardData.CardNumber;
                                this.userName = cardData.Name;
                                console.log('Card No.:' + cardData.CardNumber);
                                console.log('PIN: ' + cardData.PIN);
                                console.log('Name: ' + cardData.Name);
                                this.cardData = true;
                            } else {
                                //this.cardAuthenticate = false;
                                console.log('Neuspesno citanje podataka sa kartice');
                                return;
                            }
                        })
                        .fail((err: any) => {
                            //this.cardAuthenticate = false;
                            console.log('Neuspesno ucitavanje podataka sa kartice');
                            return;
                        })
                })
                .fail((err: any) => {
                    //this.cardError = true;
                    console.log('Neuspesno uvodjenje selectCarda. Greska: ' + err);

                })
            );

    }

    // 
    login(event: Event, sifra: string, password: string) {

        event.preventDefault();

        if (this.cardAuthenticate) {

            //this.pinCodeIn = sifra;
            //let pinIn = pin;

            if (this.pinCode !== this.pinCodeIn) {
                this.badPin = true;
                alert('Netačan PIN! Pokušajte ponovo. ');
                this.pinCodeIn = '';
                return;
            }

            this.badPin = false;
            let cid = parseInt(this.cardNumber);
            this._loginService
                .postCardId({ CID: cid })
                .subscribe(
                (radnik: IRadnik) => {
                    if (radnik.success == "True") {
                        localStorage.setItem('card', "1");
                        localStorage.setItem('cid', this.cardNumber);
                        return this._router.navigate(['Dashboard']);
                    } else {
                        alert('Neuspeh u proveri kartice! Nije nadjen radnik sa datom karticom.');
                    }
                },
                error => alert(error)
                );
            return;
        }
        this._loginService
            .postLogin({ SIFRA_RADNIKA: this.sifra, TAJNA_SIFRA: this.password })
            .subscribe(
            (radnik: IRadnik) => {
                if (radnik.success == "True") {
                    localStorage.setItem('card', "0");
                    localStorage.setItem('id', this.sifra);
                    this._router.navigate(['Dashboard']);
                } else {
                    alert('Pogrešan unos podataka šifre ili tajne šifre');
                }
            },
            error => alert(error)

            );
    }

    ngOnDestroy() {
        this.cardsubscription.unsubscribe();
    }

    ngOnInit() {
        this.cardsubscription = this._smartCardAuth.getCardStatusChangeEmitter()
            .subscribe(item => this.cardStatusChange(item));

    }

    setFirst() {
        if (this.cardAuthenticate) {
            document.getElementById('pin').focus();
        } else {
            document.getElementById('sifra').focus();
        }

    }

    cardStatusChange(status: number) {

        this.cardStatus = status;
        if (status == 0) {
            this._smartCardAuth.cardInserted = false;
            this._smartCardAuth.cardRemoved = true;
            this._smartCardAuth.cardError = false;
            this.cardAuthenticate = false;
            this.cardData = false;

            this._router.navigate(['Login']);
            console.log('*** LOGIN: Kartica je izvucena - LOGIN FORMA!');
            // odlazak na login screen sa user password
        } else {
            // odlazak na login screen sa PIN-om
            console.log('***LOGIN: Kartica je ubacena  - LOGIN FORMA !');
            this.cardError = this._smartCardAuth.cardError;

            if (this.cardError === true) {
                console.log('Postoji problem sa citacem kartice');
                return;
            }
            // if(this._smartCardAuth.cardInserted)
            //     return;

            if (this.cardData)
                return;
            this._router.navigate(['Login']);
            this._smartCardAuth.SelectCard()
                .then((data: any) => {
                    console.log('Uspesna realizacija SelectCarda - LOGIN FORMA');
                    if (data === false) {
                        this._smartCardAuth.cardInserted = false;
                        this._smartCardAuth.cardRemoved = true;
                        this._smartCardAuth.cardError = false;
                        return;
                    }

                    this._smartCardAuth.cardInserted = true;
                    this._smartCardAuth.cardRemoved = false;
                    this._smartCardAuth.cardError = true;

                    this.cardAuthenticate = true;

                    this._smartCardAuth.GetCardData()
                        .done((cardData: any) => {
                            if (cardData !== null) {
                                this.pinCode = cardData.PIN;
                                this.cardNumber = cardData.CardNumber;
                                this.userName = cardData.Name;
                                console.log('LOGIN Card No.:' + this.cardNumber);
                                console.log('LOGIN PIN: ' + this.pinCode);
                                console.log('LOGIN Name: ' + this.userName);

                            } else {
                                this.cardAuthenticate = false;
                                console.log('Neuspesno citanje podataka sa kartice');
                                return;
                            }
                        })
                        .fail((err: any) => {
                            this.cardAuthenticate = false;
                            console.log('Neuspesno ucitavanje podataka sa kartice');
                            return;
                        })
                })
                .fail((err: any) => {
                    this.cardError = true;
                    console.log('Neuspesno uvodjenje selectCarda. Greska: ' + err);

                });
        }
    }

}