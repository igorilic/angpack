import { IPolje } from './polje';
import { ISadrzaj } from './sadrzaj';
export interface IZadatak {
    SadrzajiRefTabela?: ISadrzaj[];
    Polja?: IPolje[];
    Breadcrumb: string[];
    ZAD_ID: number;
    NADREDJENI_ZAD: number;
    NAZIV_ZAD: string;
    NAZIV_ZAD_KRATKO: string;
    IND_NAVIGACIJA: number;
    URL_FORME: string;
    STATE_FORME: string;
    CTRL_FORME: string;
    ID_AKTIVAN: number;
    DATUM_AZURNO: Date;
    RED_PRIKAZA: number;
    TOOLTIP: string;
    ZAD_ID_OLD: number;
    D_RBR_PRIKAZA: number;
    D_NAZIV_POGLAVLJA_NAD: string;
    D_OPIS_POGLAVLJA_NAD: string;
    D_NAZIV_POGLAVLJA: string;
    D_OPIS_POGLAVLJA: string;
    D_FUN_SPEC: number;
    D_STAMPA_SPEC: string;
    D_IZVESTAJ_SPEC: string;
    D_EKRANSKI_IZGLED1: string;
    D_EKRANSKI_IZGLED2: string;
    B_BLAGAJNA: number[];
    SIF_OBRAZAC: number[];
    SV_USLUGA_ZADATAK: number[];
    W_ULOGA_ZAD: number[];
    NADREDJENI_ZADNavigation: number;
    InverseNADREDJENI_ZADNavigation: number
}