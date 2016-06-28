// angular
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { RouteParams, Router } from '@angular/router-deprecated';
// modeli
import { IZadatak } from '../../shared/modeli/zadatak';
import { IPolje } from '../../shared/modeli/polje';
import { ISadrzaj } from '../../shared/modeli/sadrzaj';
// servisi
import { ZadaciService } from '../../shared/api/zadaci/zadaci.service';
// komponente
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';


@Component({
    moduleId: module.id,
    selector: 'sifarnik',
    templateUrl: 'sifarnik.component.html',
    directives: [BreadcrumbComponent, FORM_DIRECTIVES],
    providers: [ZadaciService]
})
export class SifarnikComponent implements OnInit {
    zadaci: IZadatak[];
    zadatak: IZadatak;
    tooltip: string;
    polja: IPolje[];
    sadrzajRefTabela: any[];
    sadrzaj: any[] = [];
    redIzSadrzaja: any;
    hleb: string[];
    title: string;
    edit: number;
    test: string = 'test';
    constructor(private zadaciService: ZadaciService,
        private routeParams: RouteParams,
        private router: Router) {
    }

    ngOnInit() {
        //this.edit = false;
        let id = +this.routeParams.get('id');
        this.zadaciService
            .getZadatak(id)
            .subscribe(
            zadatak => this.zadatak = zadatak,
            error => console.log(error),
            () => {
                this.polja = this.zadatak.Polja;
                this.zadatak.SadrzajiRefTabela[0].Sadrzaj.forEach((red: any) => {
                    let redNiz = Object.keys(red).map(x => red[x]);
                    // za potrebe testiranja    
                    // console.log(redNiz);
                    this.sadrzaj.push(redNiz);

                });
                this.title = this.zadatak.NAZIV_ZAD;
                this.tooltip = this.zadatak.TOOLTIP;
                this.hleb = this.zadatak.Breadcrumb;
                console.log(this.sadrzaj);
            }
            );


    }

    gotoNaslovna() {
        this.router.navigate(['Naslovna']);
    }

    onSubmit(form: any): void {
        // TODO POST

        console.log(form);

        let formniz = Object.keys(form).map(x => form[x]);
        this.sadrzaj.push(formniz);
    }
    Izmeni(index: number): void {
        this.edit = index;
        this.redIzSadrzaja = Object.assign({}, this.sadrzaj[index]);
    }
    Odustani(index: number): void {
        this.sadrzaj[index] = Object.assign(this.sadrzaj[index], this.redIzSadrzaja);
        this.edit = -1;
    }
    Obrisi(index: number): void {
        this.sadrzaj.splice(index, 1);
    }

}