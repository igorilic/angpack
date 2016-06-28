import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToggleMenuService {

    /**
     * Observable boolean sources
     */
    private toggleAnnounceSource = new Subject<boolean>();

    /**
     * Observable boolean streams
     */
    toggleAnnounced$ = this.toggleAnnounceSource.asObservable();

    /**
     * Service message commands
     */
    announceToggle(toggle: boolean) {
        this.toggleAnnounceSource.next(toggle);
        // console.log();
    }
}