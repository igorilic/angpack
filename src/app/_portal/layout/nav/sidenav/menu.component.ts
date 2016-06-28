import { Component, OnInit, Input } from '@angular/core';
import { IMeni } from '../../../../shared/modeli/meni.interface';
import { IZadatak } from '../../../../shared/modeli/zadatak';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams, Router } from '@angular/router-deprecated';
import { NgClass } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'meni-view',
    templateUrl: 'menu.component.html',
    directives: [MenuComponent, NgClass, ROUTER_DIRECTIVES]
})
@RouteConfig([

])
export class MenuComponent implements OnInit {
    selectedIdx: number = -1;
    selectedIdxDrugi: number = -1;
    selectedIdxTreci: number = -1;
    private selectedId: number;
    @Input() meni: IMeni[];

    constructor(routeParams: RouteParams, private _router: Router) {
        this.selectedId = +routeParams.get('id');
    }

    ngOnInit() { }

    /////////////

    isSelected(zadatak: IZadatak) {
        return zadatak.ZAD_ID === this.selectedId;
    }
    onSelect(zadatak: IZadatak) {
        this._router.navigate(['Sifarnik', { id: zadatak.ZAD_ID }]);
    }
    selectItem(index: number): void {
        if (this.selectedIdx != index) {
            this.selectedIdx = index;
        } else {
            this.selectedIdx = -1;
        }

    }
    selectItemDrugi(index: number): void {
        if (this.selectedIdxDrugi != index) {
            this.selectedIdxDrugi = index;
        } else {
            this.selectedIdxDrugi = -1;
        }
    }

    selectItemTreci(index: number): void {
        if (this.selectedIdxTreci != index) {
            this.selectedIdxTreci = index;
        } else {
            this.selectedIdxTreci = -1;
        }
    }


}