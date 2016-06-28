// angular
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';

// servisi
import { SmartCardAuth } from './shared/signalr/smartcard.service';
import { ToggleMenuService } from './_portal/layout/nav/topnav/toggle.service';
import { Subscription } from 'rxjs/Subscription';
// redux
// import { NgRedux, select } from 'ng2-redux';
// import { RootState, enhancers } from './shared/store/index';
// import { Counter } from './shared/redux/Counter'; // TODO
// import { CounterInfo } from './shared/redux/CounterInfo'; // TODO
// import reducer from './shared/reducers/index'; 
// const createLogger = require('redux-logger'); 
// komponente
import { PortalComponent } from './_portal/layout/portal/portal.component';
import { LoginComponent } from './_portal/layout/login/login.component';
// modeli
@Component({
    moduleId: module.id,
    selector: 'body',
    templateUrl: 'app.component.html',
    // template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    styleUrls: ['app.component.css'],
    providers: [SmartCardAuth, ToggleMenuService]
})
@RouteConfig([
    { path: '/login', component: LoginComponent, name: 'Login', useAsDefault: true },
    // {path:'/...', component: AppComponent, name: 'App', useAsDefault: true},
    { path: '/dashboard/...', component: PortalComponent, name: 'Dashboard' }
])
export class AppComponent implements OnInit {
    subscription: Subscription;
    cardsubscription: any;
    cardStatus: number;

    @HostBinding('class.sidebar-collapsed') toggMeni: boolean = false;
    constructor(private smartCardAuth: SmartCardAuth,
        private _toggleMenuService: ToggleMenuService,
        private router: Router
    ) {



        this.subscription = _toggleMenuService
            .toggleAnnounced$
            .subscribe(
            toggle => this.toggMeni = toggle,
            () => console.log(this.toggMeni)
            );

    }

    //  ngOnDestroy() {
    //     this.cardsubscription.unsubscribe();
    // }

    ngOnInit() {
        this.cardsubscription = this.smartCardAuth.getCardStatusChangeEmitter()
            .subscribe(item => this.cardStatusChange(item));
        //    this.smartCardAuth.start()
        //    .then( () =>  this.smartCardAuth.SelectCard()
        //    .done((data: any) => {
        //             console.log('Uspesna realizacija SelectCarda');
        //             if (data === false) {
        //                 this.smartCardAuth.cardInserted = false;
        //                 this.smartCardAuth.cardRemoved = true;
        //                 this.smartCardAuth.cardError = false;
        //                 return;
        //             }

        //             this.smartCardAuth.cardInserted = true;
        //             this.smartCardAuth.cardRemoved = false;
        //             this.smartCardAuth.cardError = true;

        //             //this.cardAuthenticate = true;

        //             this.smartCardAuth.GetCardData()
        //                 .done((cardData: any) => {
        //                     if (cardData !== null) {
        //                         //this.pinCode = cardData.PIN;
        //                         //this.cardNumber = cardData.CardNumber;
        //                         //this.userName = cardData.Name;
        //                         console.log('Card No.:' + cardData.CardNumber);
        //                         console.log('PIN: ' + cardData.PIN);
        //                         console.log('Name: ' + cardData.Name);

        //                     } else {
        //                         //this.cardAuthenticate = false;
        //                         console.log('Neuspesno citanje podataka sa kartice');
        //                         return;
        //                     }
        //                 })
        //                 .fail((err: any) => {
        //                     //this.cardAuthenticate = false;
        //                     console.log('Neuspesno ucitavanje podataka sa kartice');
        //                     return;
        //                 })
        //         })
        //         .fail((err: any) => {
        //             //this.cardError = true;
        //             console.log('Neuspesno uvodjenje selectCarda. Greska: ' + err);

        //         })
        //     );

    }

    cardStatusChange(status: number) {
        this.cardStatus = status;
        if (status == 0) {
            // odjava korisnika
            // odlazak na login screen
            console.log('*** Kartica je izvucena !');
            this.router.navigate(['Login'])
        } else {
            // odjava korisnika
            // odlazak na login screen
            console.log('*** Kartica je ubacena !');
            this.router.navigate(['Login'])
        }
    }



}
