import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ToggleMenuService } from '../../../shared/toggle-menu/toggle-menu.service';
@Component({
    moduleId: module.id,
    selector: 'toggle-menu',
    templateUrl: 'toggle.component.html',
    providers: [ToggleMenuService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleMenuComponent implements OnInit {
    // @Output() kliknuto: boolean = false;
    kliknuto: boolean = false;
    constructor(private _toggleMenuService: ToggleMenuService) { }


    @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
    private klik: boolean = false;


    ngOnInit() {

    }
    toggle(): void {
        this.klik = !this.klik;
        this.toggleMenu.emit(this.klik);
    }

}