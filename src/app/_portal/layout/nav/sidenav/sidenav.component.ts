import { Component, OnInit, Input } from '@angular/core';
// import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { IMeni } from '../../../../shared/modeli/meni.interface';
import { IRadnik } from '../../../../shared/modeli/radnik';
import { TestLoginService } from '../../../../shared/api/loginservice/test.login.service';

import { MenuComponent } from './menu.component';
@Component({
    moduleId: module.id,
    selector: 'sidenav',
    templateUrl: 'sidenav.component.html',
    directives: [ROUTER_DIRECTIVES, MenuComponent],
    providers: [TestLoginService],
    styles: [
        '.logo {border-bottom: 1px solid rgba(255,255,255,0.05); padding-left: 20px;}',
        '.sidebar-left-info { padding-top: 20px;}'
    ]
})
export class SidenavComponent implements OnInit {
    @Input() meni: IMeni[];
    @Input() toggle: boolean;
    private selectedId: number;

    constructor(private _router: Router) { }

    ngOnInit() { }

}