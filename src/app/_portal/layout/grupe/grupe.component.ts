import { Component, OnInit, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { PlocicaComponent } from '../portal/plocica.component';
import { IMeni} from '../../../shared/modeli/meni.interface';

@Component({
    moduleId: module.id,
    selector: 'grupe',
    templateUrl: 'grupe.component.html',
    directives: [ROUTER_DIRECTIVES, PlocicaComponent]
})
export class GrupeComponent implements OnInit {
    @Input() meni: IMeni[];
    @Input() hleb: string[];
    @Input() tooltip: string;

    constructor() { }

    ngOnInit() { }

}