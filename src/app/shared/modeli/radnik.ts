// promenjen je API tako da daje niz zadataka
// import { IVrstaZadataka } from './vrsta-zadataka.interface'; 
import { IMeni } from './meni.interface';

export interface IRadnik {
    success?: string;




    ID_ULOGE?: number;
    NAZIV_ULOGE?: string;
    VRSTA_ZADATAKA?: IMeni[];

    CID?: string;
    NAZIV_POS?: string;
    ID_RAD_JED?: number;
    NAZIV_RAD_JED?: string;
    DATUM_RADA?: string;
    STANJE_RADNIKA?: number
    ID_RADNIKA?: number;
    AccessFailedCount?: number
    BROJ_POST_RADI?: number;
    DATUM_STATUSA?: string;
    DATUM_UPISA?: string;
    Email?: string;
    EmailConfirmed?: boolean;
    ID_AKTIVAN?: number;
    ID_POST_ODELJAK_DEF?: number;
    ID_RADNIKA_ERP?: number;
    IME_RADNIKA?: string;
    LockoutEnabled?: boolean;
    LockoutEndDateUtc?: string;
    PhoneNumber?: string;
    PhoneNumberConfirmed?: boolean;
    PREZIME_RADNIKA?: string;
    SecurityStamp?: string;
    SIF_TIP_RADNIKA?: number;
    SIFRA_RADNIKA: string;
    STATUS?: number;
    TAJNA_SIFRA?: string;
    TwoFactorEnabled?: boolean;
    TRANSAKCIJA?: string[];
    TRANSAKCIJANavigation?: string[];
    W_GLOB_PODES?: string[];
    W_GLOB_PODESNavigation?: string[];
    W_OBAV_ISPORUCENO?: string[];
    W_OBAV_ZAG?: string[];
    W_POST_IPOPSEG?: string[];
    W_POST_ODELJAK?: string[];
    W_RADNIK_PODELJAK?: string[];
    W_RADNIK_ULOGA?: string[];
    W_RADNIK_ULOGANavigation?: string[];
    W_ULOGA?: string[];
    ID_AKTIVANNavigation?: number;
    ID_POST_ODELJAK_DEFNavigation?: string;
    SIF_TIP_RADNIKANavigation?: number;


}