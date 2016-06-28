import { Component, OnInit, Input } from '@angular/core';
import { IMeni } from '../../../shared/modeli/meni.interface';
import { IZadatak } from '../../../shared/modeli/zadatak';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams, Router } from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    selector: 'plocica',
    templateUrl: 'plocica.component.html',
    styles: ['.elipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}'],
    directives: [ROUTER_DIRECTIVES]
})
export class PlocicaComponent implements OnInit {
    @Input() meni: IMeni[];

    private selectedId: number;

    constructor(routeParams: RouteParams,
        private router: Router) {
        this.selectedId = +routeParams.get('id');
    }

    ngOnInit() { }

    //////////////

    onSelect(zadatak: IZadatak) {
        this.router.navigate(['Grupe', { id: zadatak.ZAD_ID }]);
    }

}