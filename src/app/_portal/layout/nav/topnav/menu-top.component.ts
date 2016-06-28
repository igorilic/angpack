import { Component, OnInit, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { IMeni } from '../../../../shared/modeli/meni.interface';
import { IZadatak } from '../../../../shared/modeli/zadatak';

@Component({
    moduleId: module.id,
    selector: 'menu-top',
    templateUrl: 'menu-top.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class MenuTopComponent implements OnInit {

    @Input() meni: IMeni[];
    private selectedId: number;
    selectedIdxTreci: number = -1;

    constructor(private _router: Router,
        routeParams: RouteParams) {
        this.selectedId = +routeParams.get('id');
    }

    ngOnInit() { }
    //////////////////////
    onSelect(zadatak: IZadatak) {
        this._router.navigate(['Sifarnik', { id: zadatak.ZAD_ID }]);
    }

    isSelected(zadatak: IZadatak) {
        return zadatak.ZAD_ID === this.selectedId;
    }

    selectItemTreci(index: number): void {
        if (this.selectedIdxTreci != index) {
            this.selectedIdxTreci = index;
        } else {
            this.selectedIdxTreci = -1;
        }
    }

}