import { Component, OnInit, Input, OpaqueToken } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'breadcrumb',
    templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
    @Input() hleb: string[];
    constructor() { }
    ngOnInit() { }
}