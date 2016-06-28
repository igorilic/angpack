export interface IMeni {
    ZAD_ID: number;
    NADREDJENI_ZAD: number;
    NAZIV_ZAD: string;
    URL_FORME: string;
    Breadcrumb: number[];
    Depth: number;
    DecaZadaci?: IMeni[];

}
