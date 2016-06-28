import { Component, OnInit, Input } from '@angular/core';
import { PlocicaComponent } from './plocica.component';
import { IMeni } from '../../../shared/modeli/meni.interface';
import { IRadnik } from '../../../shared/modeli/radnik';
import { TestLoginService } from '../../../shared/api/loginservice/test.login.service';
import { ToggleMenuService } from '../nav/topnav/toggle.service';

@Component({
    moduleId: module.id,
    selector: 'naslovna',
    templateUrl: 'naslovna.component.html',
    directives: [PlocicaComponent],
    styles: ['.state-overview {padding-left: 20px;}'],
    providers: [TestLoginService, ToggleMenuService]
})
export class NaslovnaComponent implements OnInit {
    title: string = 'Naslovna';
    poruka: string = 'Dobrodošli na Portal Pošte Srpske';
    $meni: IMeni[];
    @Input() meni: IMeni[];
    errorMsg: string;
    constructor(private _testLogin: TestLoginService,
        private _toggleSer: ToggleMenuService) {

    }

    ngOnInit() {
        this._testLogin.testPostLogin({ SIFRA_RADNIKA: '685', TAJNA_SIFRA: '685' })
            .subscribe(
            radnik => this.$meni = radnik.VRSTA_ZADATAKA[0].DecaZadaci,
            error => this.errorMsg = error
            );
    }

}