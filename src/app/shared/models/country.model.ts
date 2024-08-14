export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}

export interface RegionalBloc {
    acronym: string;
    name: string;
    otherAcronyms: string[];
    otherNames: string[];
}

// export interface Country {
//     name: string;
//     topLevelDomain: string[];
//     alpha2code: string;
//     alpha3code: string;
//     callingCodes: string[];
//     capital: string;
//     altSpellings: string[];
//     region: string;
//     subregion: string;
//     population: number;
//     latlng: number[];
//     demonym: string;
//     area?: number;
//     gini?: number;
//     timezones: string[];
//     borders: string[];
//     nativeName: string;
//     numericCode: string;
//     currencies: Currency[];
//     languages: Language[];
//     translation: Translations;
//     flag: string;
//     regionalBlocs: RegionalBloc[];
//     cioc: string;
// }

export interface Country {
    name: {
        common: string;
    }
    capital: string[];
    region: string;
    flag: string;
}

export interface countryName {
    name: {
        common: string;
    }
}

export interface subRegion {
    subregion: string;
}

export interface capitalCity {
    capital: string[];
}